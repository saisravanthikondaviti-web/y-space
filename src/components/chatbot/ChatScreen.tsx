"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

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
    projectDetails: "",
  });

  const askQuestion = useCallback((index: number) => {
    setTyping(true);

    const timer = window.setTimeout(() => {
      const question = conversation[index];

      if (!question) return;

      setTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "bot",
          content: question.question,
          options: question.options,
        },
      ]);
    }, 900);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      askQuestion(0);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [askQuestion]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typing]);

  const handleAnswer = useCallback(
    (answer: string) => {
      const current = conversation[step];

      if (!current) return;

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "user",
          content: answer,
        },
      ]);

      const updatedLead = {
        ...lead,
        [current.key]: answer,
      };

      setLead(updatedLead);

      const nextStep = step + 1;

      if (nextStep >= conversation.length) {
        fetch("/api/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedLead),
        }).catch(console.error);

        window.setTimeout(() => {
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

      setStep(nextStep);
      setTyping(true);

      window.setTimeout(() => {
        const nextQuestion = conversation[nextStep];

        if (!nextQuestion) return;

        setTyping(false);

        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "bot",
            content: nextQuestion.question,
            options: nextQuestion.options,
          },
        ]);
      }, 900);
    },
    [lead, step]
  );

  const currentQuestion = conversation[step];

  return (
    <div
      className="
        flex
        h-full
        min-h-0
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#09090B]/90
        backdrop-blur-xl
        sm:rounded-3xl
      "
    >
      <ChatHeader onClose={onClose} />

      <div
        className="
          chat-scroll
          relative
          min-h-0
          flex-1
          overflow-y-auto
          px-4
          py-5
          sm:px-5
          sm:py-6
          lg:px-6
        "
      >
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[120px]" />

        <div className="relative space-y-4 sm:space-y-5">
          {messages.map((msg) => (
            <div key={msg.id}>
              <MessageBubble
                role={msg.role}
                content={msg.content}
              />

              {msg.options &&
                msg === messages[messages.length - 1] &&
                !typing &&
                step < conversation.length && (
                  <QuickReplies
                    options={msg.options}
                    onSelect={handleAnswer}
                  />
                )}
            </div>
          ))}

          {typing && <TypingIndicator />}

          <div ref={bottomRef} />
        </div>
      </div>

      {step < conversation.length &&
        !currentQuestion?.options && (
          <div
            className="
              shrink-0
              border-t
              border-white/10
              bg-black/20
              backdrop-blur-md
            "
          >
            <MessageInput
              disabled={typing}
              onSend={handleAnswer}
            />
          </div>
        )}
    </div>
  );
}