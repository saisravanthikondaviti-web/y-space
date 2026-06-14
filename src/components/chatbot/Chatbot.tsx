"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingButton from "./FloatingButton";

const services = [
  "🌐 Web Development",
  "📱 App Development",
  "🎨 UI/UX Design",
  "📈 Digital Marketing",
  "🤖 AI Solutions",
  "🛒 E-Commerce Solutions",
];

const questions = {
  "🌐 Web Development": [
    {
      id: "websiteType",
      question: "What type of website do you need?",
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
      question: "Approximately how many pages do you need?",
      options: ["1-5", "5-10", "10-20", "20+"],
    },
    {
      id: "branding",
      question: "Do you already have branding and content?",
      options: [
        "Yes, everything is ready",
        "Only branding",
        "Only content",
        "Need both",
      ],
    },
    {
      id: "timeline",
      question: "What is your expected timeline?",
      options: ["ASAP", "1 Month", "2-3 Months", "Flexible"],
    },
    {
      id: "budget",
      question: "What is your estimated budget range?",
      options: [
        "Below ₹25,000",
        "₹25,000 - ₹50,000",
        "₹50,000 - ₹1,00,000",
        "₹1,00,000+",
      ],
    },
    {
      id: "nextStep",
      question: "How would you like to continue?",
      options: [
        "📞 Schedule Live Consultation",
        "📝 Submit Requirements Directly",
      ],
    },
  ],
};

const extraQuestions = {
  direct: [
    {
      id: "reference",
      question: "Do you have any reference website?",
      options: ["Yes", "No"],
    },
    {
      id: "designStyle",
      question: "What style do you prefer?",
      options: ["Minimal", "Corporate", "Creative", "Luxury", "Bold & Modern"],
    },
    {
      id: "features",
      question: "What features do you need?",
      options: [
        "Contact Form",
        "Chatbot",
        "Payment Gateway",
        "Booking System",
        "Blog",
        "User Login",
      ],
    },
    {
      id: "contentReady",
      question: "Is your content ready?",
      options: ["Yes", "No, need help", "Partially ready"],
    },
  ],
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showLeadForm, setShowLeadForm] = useState(false);

  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [submissionMode, setSubmissionMode] = useState<
    "consultation" | "direct" | null
  >(null);

  const handleStart = () => setStarted(true);

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (answer: string) => {
    if (!selectedService) return;

    const flow = questions[selectedService as keyof typeof questions];
    const question = flow[currentQuestion];

    setAnswers((prev) => ({
      ...prev,
      [question.id]: answer,
    }));

    if (question.id === "nextStep") {
      if (answer === "📞 Schedule Live Consultation") {
        setSubmissionMode("consultation");
      } else {
        setSubmissionMode("direct");
      }

      setShowLeadForm(true);
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
  };

  const flow =
    selectedService && questions[selectedService as keyof typeof questions];

  const activeExtraFlow =
    submissionMode === "direct" ? extraQuestions.direct : null;

  const handleSubmit = () => {
    console.log("Service:", selectedService);
    console.log("Answers:", answers);
    console.log("Lead:", leadData);
    setSubmitted(true);
  };

  return (
    <>
      <FloatingButton onClick={() => setOpen(!open)} />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.6,
              x: 220,
              y: -220,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
              x: 200,
              y: -200,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="fixed bottom-24 right-6 w-[440px] h-[680px] rounded-3xl bg-gradient-to-br from-indigo-700/30 via-purple-700/20 to-fuchsia-600/30 border border-white/10 backdrop-blur-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* HEADER */}
            <div className="border-b border-white/10 p-5 bg-white/5">
              <h3 className="text-white font-semibold text-lg">
                Y SPACE Assistant ✨
              </h3>
              <p className="text-xs text-zinc-300 mt-1">
                Turning Ideas Into Digital Experiences
              </p>
            </div>

            {/* BODY */}
            <div className="p-5 text-sm text-white flex-1 overflow-y-auto">

              {/* INTRO SCREEN */}
              {!started && (
                <div className="h-full flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center px-4"
                  >
                    <h2 className="text-xl font-bold mb-3">
                      👋 Hi, I’m your Y SPACE Assistant
                    </h2>

                    <p className="text-sm text-zinc-300 mb-6 max-w-[280px] mx-auto">
                      I’ll help you plan, structure, and estimate your perfect digital product in minutes.
                    </p>

                    <button
                      onClick={handleStart}
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-medium hover:opacity-90 transition"
                    >
                      Let’s Start 🚀
                    </button>
                  </motion.div>
                </div>
              )}

              {/* SERVICE SELECTION */}
              {started && !selectedService && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-zinc-200 mb-4">
                    What service are you interested in?
                  </p>

                  <div className="flex flex-col gap-3">
                    {services.map((service) => (
                      <button
                        key={service}
                        onClick={() => handleServiceSelect(service)}
                        className="rounded-xl bg-white/5 border border-white/10 p-3 text-left hover:bg-indigo-500/20 transition"
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* MAIN QUESTIONS */}
              {started &&
                selectedService &&
                flow &&
                !showLeadForm &&
                (!activeExtraFlow ||
                  currentQuestion >= activeExtraFlow.length) && (
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <p className="text-base font-medium mb-4">
                      {flow[currentQuestion].question}
                    </p>

                    <div className="flex flex-col gap-3">
                      {flow[currentQuestion].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAnswer(option)}
                          className="rounded-xl bg-white/5 border border-white/10 p-3 text-left hover:bg-indigo-500/20 transition"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

              {/* EXTRA FLOW */}
              {started &&
                selectedService &&
                submissionMode === "direct" &&
                activeExtraFlow &&
                currentQuestion < activeExtraFlow.length &&
                !showLeadForm && (
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <p className="text-base font-medium mb-4">
                      {activeExtraFlow[currentQuestion].question}
                    </p>

                    <div className="flex flex-col gap-3">
                      {activeExtraFlow[currentQuestion].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setAnswers((prev) => ({
                              ...prev,
                              [activeExtraFlow[currentQuestion].id]: option,
                            }));
                            setCurrentQuestion((prev) => prev + 1);
                          }}
                          className="rounded-xl bg-white/5 border border-white/10 p-3 text-left hover:bg-fuchsia-500/20 transition"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

              {/* LEAD FORM */}
              {showLeadForm && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5"
                >
                  <h3 className="text-lg font-semibold mb-4">
                    Almost there ✨
                  </h3>

                  <div className="flex flex-col gap-3">
                    <input
                      placeholder="Your Name"
                      value={leadData.name}
                      onChange={(e) =>
                        setLeadData({ ...leadData, name: e.target.value })
                      }
                      className="rounded-xl bg-black/20 border border-white/10 p-3 text-sm"
                    />

                    <input
                      placeholder="Email Address"
                      value={leadData.email}
                      onChange={(e) =>
                        setLeadData({ ...leadData, email: e.target.value })
                      }
                      className="rounded-xl bg-black/20 border border-white/10 p-3 text-sm"
                    />

                    <input
                      placeholder="Phone Number"
                      value={leadData.phone}
                      onChange={(e) =>
                        setLeadData({ ...leadData, phone: e.target.value })
                      }
                      className="rounded-xl bg-black/20 border border-white/10 p-3 text-sm"
                    />

                    <button
                      onClick={handleSubmit}
                      className="mt-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 p-3 font-medium hover:opacity-90 transition"
                    >
                      {answers.nextStep ===
                      "📞 Schedule Live Consultation"
                        ? "Schedule Consultation"
                        : "Submit Project"}
                    </button>
                  </div>
                </motion.div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}