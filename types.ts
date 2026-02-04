export interface AddOn {
  name: string;
  company: string;
  description: string;
  price: 'Free' | 'Paid' | string;
  link: string;
  thumbnail: string;
  tags: string[];
}

export type ViewMode = 'grid' | 'list';
export type SortOrder = 'asc' | 'desc' | 'popular';
export type PageType = 'addons' | 'objects';

export interface ClickCounts {
  [key: string]: number;
}

export interface GDLObject {
  name: string;
  company: string;
  description: string;
  price: 'Free' | 'Paid' | string;
  link: string;
  thumbnail: string;
  tags: string[];
}