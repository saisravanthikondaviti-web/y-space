"use client";

import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import MessageInput from "./MessageInput";
import QuickReplies from "./QuickReplies";

import { conversation } from "./Conversation";
import { LeadData, Message } from "./types";

interface Props {
  onClose: () => void;
}

export default function ChatScreen({ onClose }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState(0);

  const [typing, setTyping] = useState(false);

  const [lead, setLead] = useState<LeadData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    project: "",
    timeline: "",
  });

  // Auto Scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  // Initial Question
  useEffect(() => {
    askQuestion(0);
  }, []);

  const askQuestion = (index: number) => {
    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "bot",
          content: conversation[index].question,
          options: conversation[index].options,
        },
      ]);
    }, 900);
  };

  // Placeholder (Part 5B)
  const handleAnswer = (answer: string) => {
    const current = conversation[step];

    // Add user's message
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: answer,
      },
    ]);

    // Save the answer
    setLead((prev) => ({
      ...prev,
      [current.key]: answer,
    }));

    const nextStep = step + 1;

    // Conversation finished
    if (nextStep >= conversation.length) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "bot",
            content:
              "🎉 Thank you!\n\nWe've received your request.\n\nOur team will contact you shortly.",
          },
        ]);
      }, 800);

      return;
    }

    // Move to next question
    setStep(nextStep);

    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "bot",
          content: conversation[nextStep].question,
          options: conversation[nextStep].options,
        },
      ]);
    }, 900);
  };

  const currentQuestion = conversation[step];

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#09090B]/90 backdrop-blur-xl">
      {/* Header */}
      <ChatHeader onClose={onClose} />

      {/* Messages */}
      <div className="chat-scroll relative flex-1 overflow-y-auto px-5 py-6">
        {/* Background Glow */}
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[120px]" />

        <div className="relative space-y-5">
          {messages.map((msg) => (
            <div key={msg.id}>
              <MessageBubble role={msg.role} content={msg.content} />

              {msg.options &&
                msg === messages[messages.length - 1] &&
                !typing &&
                step < conversation.length && (
                  <QuickReplies options={msg.options} onSelect={handleAnswer} />
                )}
            </div>
          ))}

          {typing && <TypingIndicator />}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      {step < conversation.length && !currentQuestion?.options && (
        <MessageInput disabled={typing} onSend={handleAnswer} />
      )}
    </div>
  );
}
