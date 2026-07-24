// src/components/what-we-do/types.ts

export type Service = {
  slug: string;
  title: string;
  image: string;
  description: string;
  items: string[];
  details: Record<string, string>;
};


export type Outcome = {
  title: string;
  description: string;
};