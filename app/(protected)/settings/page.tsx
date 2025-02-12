"use client";

import { useSession } from "next-auth/react";
import { logout } from "@/actions/logout";

const SettingsPage = () => {
  const session = useSession();
  console.log(session);

  const onClick = () => {
    logout();
  };

  return (
    <div>
      {JSON.stringify(session)}

      <button onClick={onClick} type={"submit"}>
        Sign out
      </button>
    </div>
  );
};

export default SettingsPage;
