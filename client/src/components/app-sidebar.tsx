import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: Inbox,
  },
  {
    title: "Budgets",
    url: "/dashboard/budgets",
    icon: Calendar,
  },
  {
    title: "Pots",
    url: "/dashboard/pots",
    icon: Search,
  },
  {
    title: "Recurring Bills",
    url: "/dashboard/recurring-bills",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="h-auto">
      <SidebarContent className="px-[5%] pt-2 md:w-auto">
        <SidebarGroup className="lg:h-full">
          <SidebarGroupLabel className="hidden md:block">
            Finance
          </SidebarGroupLabel>
          <SidebarGroupContent className="w-fit lg:flex-1 lg:flex lg:flex-col lg:justify-between">
            <SidebarMenu className="justify-between md:justify-normal">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span className="hidden sm:block">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarTrigger className="hidden lg:flex mt-auto w-full" />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
