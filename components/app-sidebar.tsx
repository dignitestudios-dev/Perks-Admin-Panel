"use client";

import * as React from "react";
import {
  LayoutPanelLeft,
  LayoutDashboard,
  Mail,
  CheckSquare,
  MessageCircle,
  Calendar,
  Shield,
  AlertTriangle,
  Settings,
  HelpCircle,
  CreditCard,
  LayoutTemplate,
  Users,
  BarChart3,
  Zap,
  Users2,
  FileText,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Next js",
    email: "admin@example.com",
    avatar: "",
  },
  navGroups: [
    {
      label: "Dashboards",
      items: [
        {
          title: "Overview",
          url: "/dashboard/overview",
          icon: LayoutDashboard,
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
          icon: BarChart3,
        },
      ],
    },
    {
      label: "App",
      items: [
        {
          title: "Users",
          url: "/dashboard/users",
          icon: Users2,
          items: [
            { title: "Users Management", url: "/dashboard/users" },
            { title: "Blocked Users", url: "/dashboard/users/blocked" },
          ],
        },
        {
          title: "Posts",
          url: "/dashboard/posts",
          icon: FileText,
          items: [
            { title: "Anonymous Posts", url: "/dashboard/posts/anonymous" },
            { title: "Donation Posts", url: "/dashboard/posts/donations" },
          ],
        },
      ],
    },
    {
      label: "Communications",
      items: [
        {
          title: "Notifications",
          url: "/dashboard/notifications",
          icon: Bell,
        },
      ],
    },
    {
      label: "Settings",
      items: [
        {
          title: "Profile",
          url: "/dashboard/settings/profile",
          icon: Settings,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useSelector((state: RootState) => state.auth.user);

  const userData = user
    ? {
        name: user.name,
        email: user.email,
        avatar: "",
      }
    : {
        name: "Guest",
        email: "",
        avatar: "",
      };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-transparent active:bg-transparent"
            >
              <Link href="/dashboard">
                <Logo size={200} className="text-current" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
