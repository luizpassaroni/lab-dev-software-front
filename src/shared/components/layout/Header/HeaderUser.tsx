"use client";

import { Avatar, AvatarFallback } from "@shared/components/ui/Avatar";
import { Button } from "@shared/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/components/ui/DropdownMenu";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/modules/auth/actions/logout";
import type { TAuthUser } from "@/modules/auth/types/TAuthUser";

type Props = {
  user: TAuthUser | null;
};

const HeaderUser = ({ user }: Props) => {
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex shrink-0 items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/login">Entrar</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/cadastro">Cadastrar</Link>
        </Button>
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm leading-none">
              {user.name}
            </span>
            <span className="text-muted-foreground text-xs leading-none">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="gap-2 text-destructive focus:text-destructive"
        >
          <LogOutIcon className="size-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

HeaderUser.displayName = "HeaderUser";

export { HeaderUser };
