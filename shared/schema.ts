import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  name: text("name"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Gallery table
export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  image_url: text("image_url").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Services table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  duration: text("duration"),
  details: jsonb("details"),
});

// Contact submissions table
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  service: text("service"),
  message: text("message").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Orders table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id),
  service_id: integer("service_id").references(() => services.id),
  session_date: timestamp("session_date"),
  status: text("status").notNull().default('pending'),
  payment_status: text("payment_status").notNull().default('unpaid'),
  amount: integer("amount"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  service: text("service"),
  quote: text("quote").notNull(),
  rating: integer("rating").notNull(),
  is_approved: boolean("is_approved").default(false),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  name: true,
});

export const insertGallerySchema = createInsertSchema(gallery).pick({
  image_url: true,
  category: true,
  description: true,
});

export const insertServiceSchema = createInsertSchema(services).pick({
  name: true,
  description: true,
  price: true,
  duration: true,
  details: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  phone: true,
  service: true,
  message: true,
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  user_id: true,
  service_id: true,
  session_date: true,
  status: true,
  payment_status: true,
  amount: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  service: true,
  quote: true,
  rating: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertGallery = z.infer<typeof insertGallerySchema>;
export type Gallery = typeof gallery.$inferSelect;

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
