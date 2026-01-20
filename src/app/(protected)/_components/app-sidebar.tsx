"use client";

import {
  LayoutDashboard,
  List,
  LogOut,
  Package,
  ShoppingBasket,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUser } from "@/contexts/UserContext";
import api from "@/http/api";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Produtos",
    url: "/dashboard/products",
    icon: ShoppingBasket,
  },
  {
    title: "Categorias",
    url: "/dashboard/categories",
    icon: List,
  },
  {
    title: "Movimentações",
    url: "/dashboard/stock-movements",
    icon: Package,
  },
  {
    title: "Usuários",
    url: "/dashboard/users",
    icon: UsersRound,
  },
];

export function AppSidebar() {
  const user = useUser();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await api.post("/auth/logout");
    redirect("/");
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="border-b p-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-lg font-semibold">Painel</h1>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar>
                    <AvatarFallback>F</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">{user?.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {user?.email}
                    </p>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
