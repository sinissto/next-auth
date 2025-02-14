"use client";

import * as z from "zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/settings";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";

const SettingsPage = () => {
  const user = useCurrentUser();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            toast.error(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
            toast.success(data.success);
          }
        })
        .catch(() => setError("Something wentWrong"));
    });
  };
  return (
    <Card className={"w-[600px]"}>
      <CardHeader>
        <p className={"text-2xl font-semibold text-center"}>⚙ Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className={"space-y-6"} onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={"John Doe"}
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
                name={"name"}
              />
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type={"submit"}>Save</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
