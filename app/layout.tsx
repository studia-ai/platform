
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ConvexClientProvider } from "@/app/(platform)/components/ConvexClientProvider";
import { ClientProviders } from "@/app/(platform)/components/ClientProviders";

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
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased", inter.className)} suppressHydrationWarning>
        <ConvexClientProvider>
          <ClientProviders>
            <main className="bg-slate-100">
              <div data-marketing="true" className="relative h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                {children}
              </div>
            </main>
          </ClientProviders>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
