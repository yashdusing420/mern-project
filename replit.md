# ServiceHub - Home Services Platform

## Overview

ServiceHub is a modern home services booking platform built for the Kharghar, Navi Mumbai area. The application connects users with verified professionals for various home services including cleaning, repair, beauty, and home care. It features a responsive React frontend with TypeScript, Express.js backend API, and PostgreSQL database with Drizzle ORM for data management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and data fetching
- **UI Components**: Radix UI primitives with shadcn/ui design system
- **Styling**: Tailwind CSS with custom design tokens and responsive design
- **Form Handling**: React Hook Form with Zod validation for type-safe forms

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Data Layer**: Drizzle ORM with PostgreSQL dialect
- **Storage**: In-memory storage implementation with interface for database abstraction
- **API Design**: RESTful endpoints with consistent error handling and request logging

### Database Schema
The application uses PostgreSQL with the following core entities:
- **Users**: Authentication and profile management
- **Service Categories**: Organizing services (cleaning, repair, beauty, home care)
- **Services**: Individual service offerings with pricing and duration
- **Professionals**: Service provider profiles with ratings and verification status
- **Bookings**: Customer appointments with status tracking

### Component Architecture
- **Shared Schema**: Common TypeScript types and Zod validation schemas
- **Modular Components**: Reusable UI components (ServiceCard, ProfessionalCard, BookingModal)
- **Page Components**: Route-specific components with data fetching
- **Layout Components**: Header and Footer for consistent navigation

### Development Workflow
- **Build System**: Vite for frontend bundling and esbuild for backend compilation
- **Type Safety**: Strict TypeScript configuration with path mapping
- **Database Management**: Drizzle Kit for schema migrations and database operations
- **Development Server**: Hot reload with Vite middleware integration

## External Dependencies

### Database & ORM
- **PostgreSQL**: Primary database using Neon Database serverless
- **Drizzle ORM**: Type-safe database operations with schema generation
- **Drizzle Kit**: Database migration and management tooling

### UI & Styling
- **Radix UI**: Accessible component primitives for complex UI patterns
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Inter font family for typography

### Data Fetching & Forms
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form state management with performance optimization
- **Zod**: Runtime type validation and schema definition

### Development Tools
- **Vite**: Fast build tool with HMR and plugin ecosystem
- **TypeScript**: Static typing for enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment plugins and error handling