import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

/**
 * 自定义侧边栏
 * @returns 自定义侧边栏
 */
function CustomSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>备份管理</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuItem>备份任务</SidebarMenuItem>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

/**
 * 面板页面组件，包含一个侧边栏和一个主内容区域
 */
export function PanelPage({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <CustomSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
