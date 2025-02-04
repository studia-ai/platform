import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-providder";
import { ConvexClientProvider } from "@/app/(platform)/components/ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Studia.ai | AI Agents for Solana",
  description:
    "Studia.ai offers cutting-edge AI agents for Solana Dapps, enhancing your blockchain experience with advanced AI capabilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn("antialiased", inter.className)}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            suppressHydrationWarning
          >
            <main className="bg-slate-100">
              <div data-marketing="true" className="relative h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                {children}
              </div>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ConvexClientProvider>
  );
}
