"use client";

import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../molecules/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import { Button } from "../atoms/button";

export interface UserMenuProps {
  name?: string | null;
  email: string;
  imageUrl?: string;
  onProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

export function UserMenu({
  name,
  email,
  imageUrl,
  onProfile,
  onSettings,
  onLogout,
}: UserMenuProps) {
  const initials = (name ?? email).slice(0, 2).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-control-md w-control-md rounded-full p-0">
          <Avatar className="h-control-md w-control-md">
            {imageUrl && <AvatarImage src={imageUrl} alt={name ?? email} />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-ui-sm font-medium">{name ?? "Account"}</p>
            <p className="text-ui-xs text-muted-foreground">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {onProfile && (
          <DropdownMenuItem onClick={onProfile}>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
        )}
        {onSettings && (
          <DropdownMenuItem onClick={onSettings}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
        )}
        {onLogout && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
