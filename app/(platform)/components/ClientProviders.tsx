"use client";

import { DynamicProvider } from "./DynamicProvider";
import { ThemeProvider } from "@/providers/theme-providder";
import { ReactNode } from "react";

interface ClientProvidersProps {
  children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <DynamicProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </DynamicProvider>
  );
} 