export interface BlogPost {
  bpId: number;
  imageUrl: string;
  imageAlt: string;
  title: string;
  date?: string;
  published?: boolean;
  paragraphs: string[];
}

