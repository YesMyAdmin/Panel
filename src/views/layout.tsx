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
    SidebarMenu,
    SidebarGroupContent,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar";
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@/components/ui/collapsible";
import {
    AppWindow,
    BookUser,
    ChartPie,
    ChevronRight,
    FileUser,
    LibraryBig,
    LogOut,
    Search,
    Settings2,
    UserCog,
} from "lucide-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Outlet} from "react-router/internal/react-server-client";
import {useState} from "react";
import {Link} from "react-router";

/**
 * 自定义侧边栏
 * @returns 自定义侧边栏
 */
function CustomSidebar() {
    const {isMobile} = useSidebar();
    return (
        <Sidebar className="border-r-0">
            <SidebarHeader>
                <InputGroup>
                    <InputGroupInput placeholder="搜索功能"/>
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
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton>
                                            <AppWindow/>
                                            备份管理
                                            <ChevronRight
                                                className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"/>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton asChild>
                                                    <Link to="/backup/jobs">备份任务</Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton asChild>
                                                    <Link to="/backup/files">备份文件</Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                            <SidebarMenuItem>
                                                <SidebarMenuButton asChild>
                                                    <Link to="/backup/records">备份记录</Link>
                                                </SidebarMenuButton>
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
                        <Collapsible defaultOpen className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        <Settings2/>
                                        系统设置
                                        <ChevronRight
                                            className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"/>
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
                        <Collapsible defaultOpen className="group/collapsible">
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton>
                                        <LibraryBig/>
                                        文档中心
                                        <ChevronRight
                                            className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"/>
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
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="px-1 py-0 h-12 ">
                                    <Avatar className="my-6 mx-1 ">
                                        <AvatarImage className="" src="../../public/favicon.svg" alt="USER"/>
                                        <AvatarFallback>LR</AvatarFallback>
                                    </Avatar>
                                    <div className="grid-cols-2 my-3">
                                        <div className="my-0.3">Herobrine</div>
                                        <div className="mt-0.3 mb-1 text-xs">超级用户</div>
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-popper-anchor-width]"
                                side={isMobile ? "bottom" : "right"}
                            >
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>Herobrine</DropdownMenuLabel>
                                    <DropdownMenuItem>
                                        <FileUser/>
                                        用户档案
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <UserCog/>
                                        用户设置
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator/>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <LogOut/>
                                        退出登录
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail className="border-0 bg-sidebar"/>
        </Sidebar>
    );
}
/**
 * 面板页面组件，包含一个侧边栏和一个主内容区域
 */
export function Panel() {
    const [title, setTitle] = useState('默认标题');
    /**
     * 修改标题
     * @param title
     */
    const updateTitle = (title: string) => {
        setTitle(title);
    }
    return (
        <SidebarProvider>
            <CustomSidebar/>
            <main className='bg-sidebar flex justify-center items-center'>
                <div
                    className="bg-white w-95/100 h-95/100 justify-center items-center rounded-lg border border-gray-200 shadow">
                    <div className='flex border-b border-gray-200 items-center p-1'>
                        <div className="w-8 h-8">
                            <SidebarTrigger/>
                        </div>
                        <span className="text-sm ml-1">{title}</span>
                    </div>
                    <div className="max-w-4/5 mx-auto">
                        <Outlet context={{ updateTitle }} />
                    </div>
                </div>
            </main>
        </SidebarProvider>
    );
}