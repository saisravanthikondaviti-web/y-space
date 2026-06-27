export interface Message {
  id: string;
  role: "bot" | "user";
  content: string;
  options?: string[];
}

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  service: string;
  project: string;
  timeline: string;
}