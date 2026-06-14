"use client";

interface Props {
  onClick: () => void;
}

export default function FloatingButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
      fixed
      bottom-6
      right-6
      h-16
      w-16
      rounded-full
      bg-white/10
      backdrop-blur-xl
      border
      border-white/20
      shadow-xl
      z-50
    "
    >
      💬
    </button>
  );
}