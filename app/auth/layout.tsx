import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        "flex items-center justify-center h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800"
      }
    >
      {children}
    </div>
  );
}

export default AuthLayout;
