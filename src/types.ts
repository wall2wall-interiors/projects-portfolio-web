export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  year: number;
  client: string;
  location: string;
  description: string;
  thumbnail: string;
  images: string[];
  youtubeUrl?: string;
  featured?: boolean;
  authorId?: string;
}

export interface Inquiry {
  name: string;
  email: string;
  projectType: string;
  message: string;
  isRead: boolean;
}

export interface Testimonial {
  clientName: string;
  clientTitle?: string;
  content: string;
  projectId?: string;
  rating?: number;
  imageUrl?: string;
  featured?: boolean;
  order?: number;
}

export interface Service {
  title: string;
  slug: string;
  description: string;
  icon?: string;
  order?: number;
  featured?: boolean;
}
