import { ServiceFlow } from "@/lib/chatbot/types";

export const serviceFlows: Record<string, ServiceFlow> = {
  webDevelopment: {
    title: "Web Development",

    questions: [
      {
        id: "websiteType",
        text: "What type of website do you need?",
        type: "select",
        options: [
          "Business Website",
          "Portfolio Website",
          "E-Commerce Store",
          "SaaS Platform",
          "Landing Page",
          "Other",
        ],
      },

      {
        id: "pages",
        text: "Approximately how many pages do you need?",
        type: "text",
      },

      {
        id: "branding",
        text: "Do you already have branding and content?",
        type: "text",
      },

      {
        id: "timeline",
        text: "What is your expected timeline?",
        type: "text",
      },

      {
        id: "budget",
        text: "What is your estimated budget range?",
        type: "text",
      },
    ],
  },

  digitalMarketing: {
    title: "Digital Marketing",

    questions: [
      {
        id: "marketingType",
        text: "Which marketing service are you interested in?",
        type: "select",
        options: [
          "SEO",
          "Social Media Marketing",
          "Google Ads",
          "Content Marketing",
          "Complete Package",
        ],
      },

      {
        id: "goal",
        text: "What is your primary goal?",
        type: "text",
      },

      {
        id: "budget",
        text: "What is your monthly marketing budget?",
        type: "text",
      },
    ],
  },
};