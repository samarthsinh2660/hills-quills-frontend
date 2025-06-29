"use client"

import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
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
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
  ChevronUp, 
  User, 
  LogOut, 
  Settings,
  UserCircle,
  FileText, 
  Video, 
  Users, 
  BarChart3, 
  Home 
} from "lucide-react"
import type { RootState } from "@/redux/store"
import type { AppDispatch } from "@/redux/store"
import { fetchAdminMe } from "@/redux/slices/adminSlice"
import { DashboardLayoutProps } from "@/types/admin"

const menuItems = [
  { title: "Dashboard", icon: Home, href: "/admin/dashboard" },
  { title: "Articles", icon: FileText, href: "/admin/articles" },
  { title: "Web Stories", icon: Video, href: "/admin/stories" },
  { title: "Authors", icon: Users, href: "/admin/authors" },
  { title: "Analytics", icon: BarChart3, href: "/admin/analytics" },
  { title: "Settings", icon: Settings, href: "/admin/settings" },
]

function AppSidebar() {
  const admin = useSelector((state: RootState) => state.admin.profile)

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BarChart3 className="h-4 w-4" />
          </div>
          <span className="font-semibold">Admin Panel</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
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
                <SidebarMenuButton className="w-full">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={"/placeholder.svg"} />
                    <AvatarFallback>
                      <UserCircle className="h-4 w-4" />
                      {admin?.username?.charAt(0).toUpperCase() || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate">{admin?.username || "Admin"}</span>
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem asChild>
                  <a href="/admin/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/admin/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-red-600">
                  <a href="/admin/logout">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { profile } = useSelector((state: RootState) => state.admin)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchAdminMe())
  }, [dispatch])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </div>
        </header>
        <main className="flex-1 space-y-4 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
