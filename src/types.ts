export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  location: string;
  description: string;
  thumbnail: string;
  images: string[];
  videos?: string[];
  youtubeUrl?: string;
  featured?: boolean;
}
