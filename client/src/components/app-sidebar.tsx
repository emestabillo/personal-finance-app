import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

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
    url: "/",
    icon: Home,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: Inbox,
  },
  {
    title: "Budgets",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Pots",
    url: "/pots",
    icon: Search,
  },
  {
    title: "Recurring Bills",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="h-auto">
      <SidebarContent className="px-[5%] pt-2 md:w-auto">
        <SidebarGroup>
          <SidebarGroupLabel className="hidden md:block">
            Finance
          </SidebarGroupLabel>
          <SidebarGroupContent className="w-fit">
            <SidebarMenu className="justify-between md:justify-normal">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="hidden sm:block">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarTrigger className="hidden md:flex mt-auto" />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
