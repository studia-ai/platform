import { Id } from "@/app/(platform)/convex/_generated/dataModel";

declare module "next" {
  export interface PageProps {
    params?: { [key: string]: string | Id<"chats"> };
    searchParams?: { [key: string]: string | string[] | undefined };
  }
} 