"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

export function AuthButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async () => {
    setIsLoading(true);
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAuthenticated(!isAuthenticated);
    setIsLoading(false);
  };

  return (
    <Button
      variant={isAuthenticated ? "destructive" : "default"}
      onClick={handleAuth}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
      ) : null}
      {isAuthenticated ? "Disconnect" : "Connect to Spotify"}
    </Button>
  );
}