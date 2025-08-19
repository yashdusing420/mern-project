import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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
  app.get("/api/bookings", async (req, res) => {
    try {
      const { userId } = req.query;
      let bookings;
      
      if (userId && typeof userId === 'string') {
        bookings = await storage.getBookingsByUser(userId);
      } else {
        bookings = await storage.getBookings();
      }
      
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  app.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      if (!status || typeof status !== 'string') {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const booking = await storage.updateBookingStatus(req.params.id, status);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update booking status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
