"use client";

import React from "react";
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/useCurrentRole";
import FormError from "@/components/FormError";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

function RoleGate({ children, allowedRole }: RoleGateProps) {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message={"You do not have permission to view this content"} />
    );
  }

  return <>{children}</>;
}

export default RoleGate;
