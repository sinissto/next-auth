"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoginForm from "@/components/auth/LoginForm";

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
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className={"p-0 w-auto bg-transparent border-none"}>
          <DialogTitle className={"text-white"}>LOGIN FORMA</DialogTitle>
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span className={"cursor-pointer"} onClick={onClick}>
      {children}
    </span>
  );
}

export default LoginButton;
