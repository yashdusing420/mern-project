import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";
import { insertBookingSchema, loginSchema, registerSchema } from "@shared/schema";
import { z } from "zod";

// Extend session types
declare module "express-session" {
  interface SessionData {
    user?: {
      id: string;
      email: string;
      username: string;
    };
  }
}

// Session configuration
function setupSession(app: Express) {
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: 7 * 24 * 60 * 60 * 1000, // 1 week
    tableName: "sessions",
  });

  app.use(session({
    secret: process.env.SESSION_SECRET || "dev-secret-key-change-in-production",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    },
  }));
}

// Authentication middleware
function requireAuth(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  if (!req.session.user) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  setupSession(app);

  // Authentication Routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const credentials = loginSchema.parse(req.body);
      const user = await storage.authenticateUser(credentials);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      req.session.user = { id: user.id, email: user.email, username: user.username };
      res.json({ message: "Login successful", user: { id: user.id, email: user.email, username: user.username } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(409).json({ message: "Email already registered" });
      }

      const user = await storage.registerUser(userData);
      req.session.user = { id: user.id, email: user.email, username: user.username };
      
      res.status(201).json({ 
        message: "Registration successful", 
        user: { id: user.id, email: user.email, username: user.username } 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Registration failed" });
    }
  });

  app.post("/api/auth/logout", requireAuth, (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logout successful" });
    });
  });

  app.get("/api/auth/user", (req, res) => {
    if (req.session.user) {
      res.json(req.session.user);
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  });

  // Service Categories
  app.get("/api/service-categories", async (req, res) => {
    try {
      const categories = await storage.getServiceCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service categories" });
    }
  });

  app.get("/api/service-categories/:id", async (req, res) => {
    try {
      const category = await storage.getServiceCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Service category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service category" });
    }
  });

  // Services
  app.get("/api/services", async (req, res) => {
    try {
      const { categoryId } = req.query;
      let services;
      
      if (categoryId && typeof categoryId === 'string') {
        services = await storage.getServicesByCategory(categoryId);
      } else {
        services = await storage.getServices();
      }
      
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getService(req.params.id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Professionals
  app.get("/api/professionals", async (req, res) => {
    try {
      const { specialization } = req.query;
      let professionals;
      
      if (specialization && typeof specialization === 'string') {
        professionals = await storage.getProfessionalsBySpecialization(specialization);
      } else {
        professionals = await storage.getProfessionals();
      }
      
      res.json(professionals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch professionals" });
    }
  });

  app.get("/api/professionals/:id", async (req, res) => {
    try {
      const professional = await storage.getProfessional(req.params.id);
      if (!professional) {
        return res.status(404).json({ message: "Professional not found" });
      }
      res.json(professional);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch professional" });
    }
  });

  // Bookings
  app.get("/api/bookings", requireAuth, async (req, res) => {
    try {
      // Users can only see their own bookings
      const userId = req.session.user.id;
      const bookings = await storage.getBookingsByUser(userId);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.post("/api/bookings", requireAuth, async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      // Derive userId from authenticated session, not from request body
      const bookingWithUserId = {
        ...bookingData,
        userId: req.session.user.id
      };
      const booking = await storage.createBooking(bookingWithUserId);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  app.patch("/api/bookings/:id/status", requireAuth, async (req, res) => {
    try {
      const { status } = req.body;
      if (!status || typeof status !== 'string') {
        return res.status(400).json({ message: "Status is required" });
      }
      
      // First check if booking exists and belongs to user
      const existingBooking = await storage.getBooking(req.params.id);
      if (!existingBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      if (existingBooking.userId !== req.session.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const booking = await storage.updateBookingStatus(req.params.id, status);
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update booking status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
