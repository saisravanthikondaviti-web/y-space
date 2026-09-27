"use client";

import dynamic from "next/dynamic";

const ChatLauncher = dynamic(
  () => import("./ChatLauncher"),
  {
    ssr: false,
  }
);

export default function ChatLauncherLoader() {
  return <ChatLauncher />;
}