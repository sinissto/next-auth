import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();

  if (session.data) return session.data.user;

  return null;
};
