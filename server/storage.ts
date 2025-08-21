import { type User, type InsertUser, type ServiceCategory, type InsertServiceCategory, type Service, type InsertService, type Professional, type InsertProfessional, type Booking, type InsertBooking } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Service Categories
  getServiceCategories(): Promise<ServiceCategory[]>;
  getServiceCategory(id: string): Promise<ServiceCategory | undefined>;
  createServiceCategory(category: InsertServiceCategory): Promise<ServiceCategory>;

  // Services
  getServices(): Promise<Service[]>;
  getServicesByCategory(categoryId: string): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;

  // Professionals
  getProfessionals(): Promise<Professional[]>;
  getProfessionalsBySpecialization(specialization: string): Promise<Professional[]>;
  getProfessional(id: string): Promise<Professional | undefined>;
  createProfessional(professional: InsertProfessional): Promise<Professional>;

  // Bookings
  getBookings(): Promise<Booking[]>;
  getBookingsByUser(userId: string): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private serviceCategories: Map<string, ServiceCategory> = new Map();
  private services: Map<string, Service> = new Map();
  private professionals: Map<string, Professional> = new Map();
  private bookings: Map<string, Booking> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize service categories
    const categories: InsertServiceCategory[] = [
      {
        name: "Cleaning",
        description: "Professional home cleaning, deep cleaning, bathroom & kitchen cleaning",
        icon: "broom",
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        startingPrice: "299",
        rating: "4.8",
        reviewCount: 2100
      },
      {
        name: "Repair",
        description: "AC repair, plumbing, electrical work, appliance repair",
        icon: "tools",
        image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        startingPrice: "199",
        rating: "4.7",
        reviewCount: 1800
      },
      {
        name: "Beauty",
        description: "Salon at home, facial, hair care, nail care, threading",
        icon: "cut",
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        startingPrice: "399",
        rating: "4.9",
        reviewCount: 3200
      },
      {
        name: "Home Care",
        description: "Painting, carpentry, pest control, home security installation",
        icon: "home",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
        startingPrice: "499",
        rating: "4.6",
        reviewCount: 1500
      }
    ];

    categories.forEach(category => {
      this.createServiceCategory(category);
    });

    // Initialize professionals
    const professionals: InsertProfessional[] = [
      {
        name: "Rahul Sharma",
        email: "rahul@servicehub.com",
        phone: "+91 9876543210",
        specialization: "Cleaning",
        experience: 5,
        rating: "4.9",
        reviewCount: 150,
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        isVerified: true,
        location: "Kharghar"
      },
      {
        name: "Amit Patel",
        email: "amit@servicehub.com",
        phone: "+91 9876543211",
        specialization: "Repair",
        experience: 8,
        rating: "4.8",
        reviewCount: 200,
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        isVerified: true,
        location: "Kharghar"
      },
      {
        name: "Priya Singh",
        email: "priya@servicehub.com",
        phone: "+91 9876543212",
        specialization: "Beauty",
        experience: 6,
        rating: "4.9",
        reviewCount: 180,
        profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        isVerified: true,
        location: "Kharghar"
      },
      {
        name: "Suresh Kumar",
        email: "suresh@servicehub.com",
        phone: "+91 9876543213",
        specialization: "Repair",
        experience: 10,
        rating: "4.7",
        reviewCount: 120,
        profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
        isVerified: true,
        location: "Kharghar"
      }
    ];

    professionals.forEach(professional => {
      this.createProfessional(professional);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      address: insertUser.address || null,
      phone: insertUser.phone || null
    };
    this.users.set(id, user);
    return user;
  }

  async getServiceCategories(): Promise<ServiceCategory[]> {
    return Array.from(this.serviceCategories.values());
  }

  async getServiceCategory(id: string): Promise<ServiceCategory | undefined> {
    return this.serviceCategories.get(id);
  }

  async createServiceCategory(insertCategory: InsertServiceCategory): Promise<ServiceCategory> {
    const id = randomUUID();
    const category: ServiceCategory = { 
      ...insertCategory, 
      id,
      description: insertCategory.description || null,
      rating: insertCategory.rating || null,
      reviewCount: insertCategory.reviewCount || null
    };
    this.serviceCategories.set(id, category);
    return category;
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getServicesByCategory(categoryId: string): Promise<Service[]> {
    return Array.from(this.services.values()).filter(service => service.categoryId === categoryId);
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { 
      ...insertService, 
      id,
      isActive: insertService.isActive ?? true
    };
    this.services.set(id, service);
    return service;
  }

  async getProfessionals(): Promise<Professional[]> {
    return Array.from(this.professionals.values()).filter(p => p.isActive);
  }

  async getProfessionalsBySpecialization(specialization: string): Promise<Professional[]> {
    return Array.from(this.professionals.values()).filter(
      p => p.specialization === specialization && p.isActive
    );
  }

  async getProfessional(id: string): Promise<Professional | undefined> {
    return this.professionals.get(id);
  }

  async createProfessional(insertProfessional: InsertProfessional): Promise<Professional> {
    const id = randomUUID();
    const professional: Professional = { 
      ...insertProfessional, 
      id,
      rating: insertProfessional.rating || null,
      reviewCount: insertProfessional.reviewCount || null,
      profileImage: insertProfessional.profileImage || null,
      isVerified: insertProfessional.isVerified ?? false,
      isActive: insertProfessional.isActive ?? true
    };
    this.professionals.set(id, professional);
    return professional;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => booking.userId === userId);
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      createdAt: new Date(),
      status: insertBooking.status || "pending",
      notes: insertBooking.notes || null
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
      return booking;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
