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
    <div className="border-t border-white/10 bg-black/30 p-4 backdrop-blur-xl">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
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
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-gradient-to-r
            from-violet-600
            to-fuchsia-500
            text-white
            transition
            hover:scale-110
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <SendHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}