"use client";

import { useState } from "react";
import { SendHorizontal } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function MessageInput({
  onSend,
  disabled = false,
}: Props) {
  const [message, setMessage] = useState("");

  const send = () => {
    const value = message.trim();

    if (!value) return;

    onSend(value);
    setMessage("");
  };

  return (
    <div
      className="
        border-t
        border-white/10
        bg-black/30
        backdrop-blur-xl

        p-3
        sm:p-4
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          sm:gap-3

          rounded-full
          border
          border-white/10

          bg-white/5

          px-3
          py-2

          sm:px-4
          sm:py-2.5

          transition-all
          duration-300

          focus-within:border-violet-500/50
          focus-within:bg-white/10
        "
      >
        <input
          value={message}
          disabled={disabled}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          placeholder="Type your message..."

          className="
            flex-1

            bg-transparent

            text-[14px]
            sm:text-[15px]

            text-white

            outline-none

            placeholder:text-zinc-500
          "
        />

        <button
          onClick={send}
          disabled={disabled}
          className="
            flex
            shrink-0

            h-11
            w-11

            sm:h-12
            sm:w-12

            items-center
            justify-center

            rounded-full

            bg-gradient-to-r
            from-violet-600
            to-fuchsia-500

            text-white

            transition-all
            duration-300

            hover:scale-105
            active:scale-95

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <SendHorizontal
            className="
              h-5
              w-5
            "
          />
        </button>
      </div>
    </div>
  );
}