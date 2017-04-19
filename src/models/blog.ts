
export interface BlogPostEntity {
  id: number;
  title: string;
  imageUrl: string;
  imageAlt: string;
  date?: number;
  content: string;
  author: string;
  published?: boolean;
  deleted: number;
}
