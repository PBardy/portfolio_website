export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  caption?: string;
  repoLink?: string;
  demoLink?: string;
  tags: string[];
}
