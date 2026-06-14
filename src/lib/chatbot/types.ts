export interface Question {
  id: string;
  text: string;
  type: "text" | "select";
  options?: string[];
}

export interface ServiceFlow {
  title: string;
  questions: Question[];
}

export interface ChatMessage {
  role: "bot" | "user";
  content: string;
}