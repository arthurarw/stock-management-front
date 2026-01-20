"use server";

import { getLoggedUser } from "@/actions/me";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/contexts/UserContext";
import { redirect } from "next/navigation";
import { AppSidebar } from "./_components/app-sidebar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getLoggedUser();
  if (user.error) {
    redirect("/");
  }

  return (
    <UserProvider user={user.data}>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          {children}
          <Toaster position="bottom-center" richColors theme="light" />
        </main>
      </SidebarProvider>
    </UserProvider>
  );
}
