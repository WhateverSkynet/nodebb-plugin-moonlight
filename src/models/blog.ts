export interface BlogPost {
  id: number;
  imageUrl: string;
  imageAlt: string;
  title: string;
  date?: string;
  published?: boolean;
  paragraphs: string[];
}

export interface BlogPostEntity {
  id: number;
  title: string;
  imageUrl: string;
  imageAlt: string;
  date?: number;
  content: string;
  deleted: number;
}
