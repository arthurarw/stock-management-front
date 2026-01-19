import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { redirect } from "next/navigation";
import { getAccessToken } from "../../lib/auth";
import { AppSidebar } from "./_components/app-sidebar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getAccessToken();

  if (!token) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
        <Toaster position="bottom-center" richColors theme="light" />
      </main>
    </SidebarProvider>
  );
}
