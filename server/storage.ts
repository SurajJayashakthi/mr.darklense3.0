import { 
  users, User, InsertUser,
  gallery, Gallery, InsertGallery,
  services, Service, InsertService,
  contactSubmissions, ContactSubmission, InsertContactSubmission,
  orders, Order, InsertOrder,
  testimonials, Testimonial, InsertTestimonial
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Gallery operations
  getGalleryImages(category?: string): Promise<Gallery[]>;
  getGalleryImage(id: number): Promise<Gallery | undefined>;
  createGalleryImage(image: InsertGallery): Promise<Gallery>;
  
  // Service operations
  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  
  // Contact operations
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  
  // Order operations
  getOrders(userId?: number): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order>;
  
  // Testimonial operations
  getApprovedTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private gallery: Map<number, Gallery>;
  private services: Map<number, Service>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private orders: Map<number, Order>;
  private testimonials: Map<number, Testimonial>;
  
  private currentIds: {
    users: number;
    gallery: number;
    services: number;
    contactSubmissions: number;
    orders: number;
    testimonials: number;
  };

  constructor() {
    this.users = new Map();
    this.gallery = new Map();
    this.services = new Map();
    this.contactSubmissions = new Map();
    this.orders = new Map();
    this.testimonials = new Map();
    
    this.currentIds = {
      users: 1,
      gallery: 1,
      services: 1,
      contactSubmissions: 1,
      orders: 1,
      testimonials: 1
    };
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Add sample services
    const photographyServices = [
      {
        name: "Birthday Photo Shoot - Package 1",
        description: "Basic birthday photography package",
        price: 14000,
        duration: "2 hours",
      },
      {
        name: "Birthday Photo Shoot - Package 2",
        description: "Premium birthday photography package with free photo frame",
        price: 17500,
        duration: "3 hours",
      },
      {
        name: "Couple Photo Shoot - Package 1",
        description: "Basic couple photography session",
        price: 15000,
        duration: "2 hours",
      },
      {
        name: "Couple Photo Shoot - Package 2",
        description: "Premium couple photography with two photo frames",
        price: 19500,
        duration: "3 hours",
      },
      {
        name: "Wedding Full Day",
        description: "Complete wedding day coverage",
        price: 30000,
        duration: "Full day",
      },
      {
        name: "Wedding Pre-Shoot",
        description: "Pre-wedding photoshoot",
        price: 15000,
        duration: "3 hours",
      },
      {
        name: "Wedding Pre + Full Day",
        description: "Pre-wedding shoot and complete wedding day coverage",
        price: 40000,
        duration: "Multiple days",
      },
      {
        name: "Event Photography - Package 1",
        description: "Basic event coverage",
        price: 20000,
        duration: "3 hours",
      },
      {
        name: "Event Photography - Package 2",
        description: "Standard event coverage",
        price: 25000,
        duration: "4 hours",
      },
      {
        name: "Event Photography - Package 3",
        description: "Premium event coverage",
        price: 30000,
        duration: "6 hours",
      }
    ];
    
    photographyServices.forEach(service => {
      this.createService(service);
    });
    
    // Add sample testimonials
    const testimonialData = [
      {
        name: "Priya & Arun",
        service: "Wedding Photography",
        quote: "Suraj captured our wedding day beautifully. The photos are stunning and we couldn't be happier with the results!",
        rating: 5,
        is_approved: true
      },
      {
        name: "Chamara & Dilini",
        service: "Couple Photoshoot",
        quote: "The pre-wedding photoshoot exceeded our expectations. Suraj made us feel comfortable and the photos look so natural!",
        rating: 5,
        is_approved: true
      },
      {
        name: "Malini Fernando",
        service: "Birthday Photography",
        quote: "My daughter's birthday photos are perfect! Mr. DarkLense has a special talent for capturing genuine emotions.",
        rating: 5,
        is_approved: true
      }
    ];
    
    testimonialData.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentIds.users++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      created_at: now 
    };
    this.users.set(id, user);
    return user;
  }
  
  // Gallery methods
  async getGalleryImages(category?: string): Promise<Gallery[]> {
    const images = Array.from(this.gallery.values());
    if (category) {
      return images.filter(image => image.category === category);
    }
    return images;
  }
  
  async getGalleryImage(id: number): Promise<Gallery | undefined> {
    return this.gallery.get(id);
  }
  
  async createGalleryImage(insertImage: InsertGallery): Promise<Gallery> {
    const id = this.currentIds.gallery++;
    const now = new Date();
    const image: Gallery = {
      ...insertImage,
      id,
      created_at: now
    };
    this.gallery.set(id, image);
    return image;
  }
  
  // Service methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }
  
  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }
  
  async createService(insertService: InsertService): Promise<Service> {
    const id = this.currentIds.services++;
    const service: Service = {
      ...insertService,
      id,
      details: insertService.details || null
    };
    this.services.set(id, service);
    return service;
  }
  
  // Contact methods
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentIds.contactSubmissions++;
    const now = new Date();
    const submission: ContactSubmission = {
      ...insertSubmission,
      id,
      created_at: now
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
  
  // Order methods
  async getOrders(userId?: number): Promise<Order[]> {
    const orders = Array.from(this.orders.values());
    if (userId) {
      return orders.filter(order => order.user_id === userId);
    }
    return orders;
  }
  
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentIds.orders++;
    const now = new Date();
    const order: Order = {
      ...insertOrder,
      id,
      created_at: now
    };
    this.orders.set(id, order);
    return order;
  }
  
  async updateOrderStatus(id: number, status: string): Promise<Order> {
    const order = this.orders.get(id);
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }
    
    const updatedOrder = {
      ...order,
      status
    };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
  
  // Testimonial methods
  async getApprovedTestimonials(): Promise<Testimonial[]> {
    const testimonials = Array.from(this.testimonials.values());
    return testimonials.filter(testimonial => testimonial.is_approved);
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentIds.testimonials++;
    const now = new Date();
    const testimonial: Testimonial = {
      ...insertTestimonial,
      id,
      is_approved: false,
      created_at: now
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
}

export const storage = new MemStorage();
