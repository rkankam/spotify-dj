"use client";

import { Music2Icon } from "lucide-react";
import { AuthButton } from "./auth-button";

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Music2Icon className="w-6 h-6 text-primary" />
          <span className="text-xl font-semibold">SpotifyDJ</span>
        </div>
        <AuthButton />
      </div>
    </header>
  );
}