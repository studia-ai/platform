"use client";

import Sidebar from "@/app/(platform)/components/Sidebar";
import Header from "@/app/(platform)/components/Header";
import { NavigationProvider } from "@/lib/context/navigation";
import { Authenticated } from "convex/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <div className="flex h-screen bg-white text-gray-900">
        <Authenticated>
          <Sidebar />
        </Authenticated>

        <div className="flex-1 flex flex-col min-w-0 bg-white">
          <Header />
          <main className="flex-1 overflow-y-auto bg-white text-gray-900">
            {children}
          </main>
        </div>
      </div>
      <ToastContainer />
    </NavigationProvider>
  );
}
