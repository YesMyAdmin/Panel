import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarProvider,
    SidebarTrigger,
    SidebarGroupLabel,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenu
    , SidebarGroupContent
} from "@/components/ui/sidebar";
import {Collapsible, CollapsibleTrigger, CollapsibleContent} from "@/components/ui/collapsible";
import {
    AppWindow,
    BookUser,
    ChartPie,
    ChevronRight, LibraryBig, Search,
    Settings2
} from "lucide-react";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";

/**
 * 自定义侧边栏
 * @returns 自定义侧边栏
 */
function CustomSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <InputGroup>
                    <InputGroupInput placeholder='搜索功能'/>
                    <InputGroupAddon>
                        <Search/>
                    </InputGroupAddon>
                </InputGroup>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>运维面板</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <ChartPie/>
                                    概览
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <Collapsible defaultOpen className='group/collapsible'>
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            <AppWindow/>
                                            备份管理
                                            <ChevronRight
                                                className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90'/>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton>备份任务</SidebarMenuButton>
                                            </SidebarMenuItem>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton>备份文件</SidebarMenuButton>
                                            </SidebarMenuItem>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton>备份记录</SidebarMenuButton>
                                            </SidebarMenuItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>系统管理</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <BookUser/>
                                用户管理
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <Collapsible defaultOpen className='group/collapsible'>
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        <Settings2/>
                                        系统设置
                                        <ChevronRight
                                            className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90'/>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>Maid节点</SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>系统配置</SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>删库跑路</SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                        <Collapsible defaultOpen className='group/collapsible'>
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        <LibraryBig/>
                                        文档中心
                                        <ChevronRight
                                            className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90'/>
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>使用说明</SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>服务契约</SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>保密条款</SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>免责声明</SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>开源组件许可证</SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter/>
        </Sidebar>
    )
        ;
}

/**
 * 面板页面组件，包含一个侧边栏和一个主内容区域
 */
export function PanelPage({children}: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <CustomSidebar/>
            <main>
                <SidebarTrigger/>
                {children}
            </main>
        </SidebarProvider>
    );
}
