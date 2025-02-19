"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa6";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import LogoutButton from "@/components/auth/LogoutButton";
import { ExitIcon } from "@radix-ui/react-icons";

function UserButton() {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback className={"bg-sky-500"}>
            <FaUser className={"text-white"} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"w-40 "} align={"end"}>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className={"h-4 w-4 mr-2"} />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
