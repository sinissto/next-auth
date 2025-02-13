"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import RoleGate from "@/components/auth/RoleGate";
import FormSuccess from "@/components/FormSuccess";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { admin } from "@/actions/admin";

function AdminPage() {
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) return toast.error(data.error);
      if (data.success) return toast.success(data.success);
    });
  };

  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed API Route!");
      } else {
        toast.error("Forbidden API route");
      }
    });
  };

  return (
    <Card className={"w-[600px]"}>
      <CardHeader>
        <p className={"text-2xl font-semibold text-center"}>Admin</p>
      </CardHeader>
      <CardContent className={"space-y-4"}>
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message={"You are ALLOWED to see this content"} />
        </RoleGate>

        <div
          className={
            "flex flex-row items-center justify-between rounded-lg border p-3 shadow-md"
          }
        >
          <p className={"text-sm font-medium"}>Admin only API Routes</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div
          className={
            "flex flex-row items-center justify-between rounded-lg border p-3 shadow-md"
          }
        >
          <p className={"text-sm font-medium"}>Admin only Server Actions</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminPage;
