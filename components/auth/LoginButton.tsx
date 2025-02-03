"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) {
  const router = useRouter();

  function onClick() {
    router.push("/auth/login");
  }

  if (mode === "modal") {
    return (
      <span>
        {/* todo Implement modal*/}
        MODAL
      </span>
    );
  }

  return (
    <span className={"cursor-pointer"} onClick={onClick}>
      {children}
    </span>
  );
}

export default LoginButton;
