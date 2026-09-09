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
  const timersRef = useRef<number[]>([]);

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

  const createTimer = useCallback(
    (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => {
        timersRef.current = timersRef.current.filter(
          (id) => id !== timer
        );

        callback();
      }, delay);

      timersRef.current.push(timer);

      return timer;
    },
    []
  );

  /*
  |--------------------------------------------------------------------------
  | INITIAL QUESTION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    createTimer(() => {
      const question = conversation[0];

      if (!question) return;

      setTyping(false);

      setMessages([
        {
          id: crypto.randomUUID(),
          role: "bot",
          content: question.question,
          options: question.options,
        },
      ]);
    }, 500);

    return () => {
      timersRef.current.forEach((timer) => {
        window.clearTimeout(timer);
      });

      timersRef.current = [];
    };
  }, [createTimer]);

  /*
  |--------------------------------------------------------------------------
  | AUTO SCROLL
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 50);

    return () => window.clearTimeout(timer);
  }, [messages, typing]);

  /*
  |--------------------------------------------------------------------------
  | HANDLE ANSWER
  |--------------------------------------------------------------------------
  */

  const handleAnswer = useCallback(
    (answer: string) => {
      const current = conversation[step];

      if (!current || typing) return;

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "user",
          content: answer,
        },
      ]);

      const updatedLead: LeadData = {
        ...lead,
        [current.key]: answer,
      };

      setLead(updatedLead);

      const nextStep = step + 1;

      /*
      |--------------------------------------------------------------------------
      | CONVERSATION COMPLETE
      |--------------------------------------------------------------------------
      */

      if (nextStep >= conversation.length) {
        setTyping(true);

        fetch("/api/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedLead),
        }).catch((error) => {
          console.error("Chatbot submission failed:", error);
        });

        createTimer(() => {
          setTyping(false);

          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              role: "bot",
              content:
                "🎉 Thank you!\n\nWe've received your request.\n\nOur team will contact you shortly.",
            },
          ]);
        }, 700);

        return;
      }

      /*
      |--------------------------------------------------------------------------
      | NEXT QUESTION
      |--------------------------------------------------------------------------
      */

      setStep(nextStep);
      setTyping(true);

      createTimer(() => {
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
      }, 700);
    },
    [step, lead, typing, createTimer]
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
        bg-[#09090B]
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
        {/* Lightweight background effects */}

        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            h-48
            w-48
            rounded-full
            bg-violet-600/5
            blur-[80px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            right-0
            h-48
            w-48
            rounded-full
            bg-fuchsia-600/5
            blur-[80px]
          "
        />

        <div className="relative space-y-4 sm:space-y-5">
          {messages.map((msg, index) => (
            <div key={msg.id}>
              <MessageBubble
                role={msg.role}
                content={msg.content}
              />

              {msg.options &&
                index === messages.length - 1 &&
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
              bg-[#09090B]
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