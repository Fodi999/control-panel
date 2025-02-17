"use client";

import * as React from "react";
import { ThemeToggle as ClientThemeToggle } from "@/components/ThemeToggle";

export function ThemeToggleWrapper() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <ClientThemeToggle />;
}
