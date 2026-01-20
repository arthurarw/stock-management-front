"use server";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import api from "@/lib/api";
import { AppSidebar } from "./_components/app-sidebar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await api.get("/auth/me").then((res) => res.data);

  console.log(user);

  return (
    <SidebarProvider>
      <AppSidebar name={user.name} email={user.email} />
      <main className="w-full">
        <SidebarTrigger />
        {children}
        <Toaster position="bottom-center" richColors theme="light" />
      </main>
    </SidebarProvider>
  );
}
