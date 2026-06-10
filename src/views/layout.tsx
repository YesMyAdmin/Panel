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
    ChevronRight, ConciergeBell,
    FileUser, HandPlatter,
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
import {useEffect, useMemo, useState} from "react";
import {Link} from "react-router";

/**
 * 侧边栏菜单数据结构定义
 */
interface LeafItem {
    label: string;
    to?: string; // 有 to 时用 Link 渲染
}

/**
 * 侧边栏菜单数据结构定义
 */
interface MenuItem {
    type: "item" | "collapsible";
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
    to?: string; // 仅 type=item 时有效
    children?: LeafItem[]; // 仅 type=collapsible 时有效
}

/**
 * 侧边栏菜单数据结构定义
 */
interface SidebarGroupData {
    groupLabel: string;
    items: MenuItem[];
}

// ---------- 可任意增删的动态菜单数据 ----------
const sidebarData: SidebarGroupData[] = [
    {
        groupLabel: "运维面板",
        items: [
            {
                type: "item",
                label: "概览",
                icon: ChartPie,
                to: "/overview",
            },
            {
                type: "collapsible",
                label: "备份管理",
                icon: AppWindow,
                children: [
                    {label: "备份任务", to: "/backup/jobs"},
                    {label: "备份文件", to: "/backup/files"},
                    {label: "备份记录", to: "/backup/records"},
                ],
            },
        ],
    },
    {
        groupLabel: "系统管理",
        items: [
            {
                type: "collapsible",
                label: "用户管理",
                icon: BookUser,
                children: [
                    {label: "用户列表", to: "/user/list"},
                    {label: "用户组管理", to: "/user/groups"}
                ],
            },
            {
                type: "collapsible",
                label: "系统设置",
                icon: Settings2,
                children: [
                    {label: "Maid节点", to: "/system/maids"},
                    {label: "系统配置", to: "/system/settings"},
                    {label: "权限配置", to: "/system/grants"},
                    {label: "删库跑路", to: "/docs/fib-warning"},
                ],
            },
            {
                type: "collapsible",
                label: "文档中心",
                icon: LibraryBig,
                children: [
                    {label: "使用说明"},
                    {label: "服务契约"},
                    {label: "保密条款"},
                    {label: "免责声明"},
                    {label: "开源组件许可证"},
                ],
            },
        ],
    },
];


/**
 * 自定义侧边栏
 * @returns 自定义侧边栏
 */
function CustomSidebar() {
    const [search, setSearch] = useState("");
    const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

    // 初始化：所有可折叠菜单默认展开
    useEffect(() => {
        const initial: Record<string, boolean> = {};
        sidebarData.forEach((group) => {
            group.items.forEach((item) => {
                if (item.type === "collapsible") {
                    const id = `${group.groupLabel}-${item.label}`;
                    initial[id] = true;
                }
            });
        });
        setOpenStates(initial);
    }, []);

    // 根据搜索词过滤菜单
    const filteredGroups = useMemo(() => {
        if (!search.trim()) return sidebarData;

        const query = search.toLowerCase();
        return sidebarData
            .map((group) => {
                const groupMatch = group.groupLabel.toLowerCase().includes(query);
                const filteredItems = group.items
                    .map((item) => {
                        if (item.type === "item") {
                            return item.label.toLowerCase().includes(query) ? item : null;
                        }
                        // 折叠菜单
                        const labelMatch = item.label.toLowerCase().includes(query);
                        const matchedChildren = item.children?.filter((child) =>
                            child.label.toLowerCase().includes(query)
                        ) ?? [];
                        if (labelMatch || matchedChildren.length > 0) {
                            return {
                                ...item,
                                children: labelMatch ? item.children : matchedChildren,
                            };
                        }
                        return null;
                    })
                    .filter(Boolean) as MenuItem[];

                return groupMatch || filteredItems.length > 0
                    ? {...group, items: filteredItems}
                    : null;
            })
            .filter(Boolean) as SidebarGroupData[];
    }, [search]);

    // 当前可见的折叠菜单 id 列表
    const visibleCollapsibleIds = useMemo(() => {
        const ids: string[] = [];
        filteredGroups.forEach((group) => {
            group.items.forEach((item) => {
                if (item.type === "collapsible") {
                    ids.push(`${group.groupLabel}-${item.label}`);
                }
            });
        });
        return ids;
    }, [filteredGroups]);

    // 搜索时强制展开可见折叠菜单，清空搜索时恢复全部展开
    useEffect(() => {
        if (search.trim()) {
            setOpenStates((prev) => {
                const next = {...prev};
                visibleCollapsibleIds.forEach((id) => (next[id] = true));
                return next;
            });
        } else {
            setOpenStates((prev) => {
                const next = {...prev};
                Object.keys(next).forEach((key) => (next[key] = true));
                return next;
            });
        }
    }, [search, visibleCollapsibleIds]);
    const {isMobile} = useSidebar();
    return (
        <Sidebar className="border-r-0">
            <SidebarHeader>
                <InputGroup>
                    <InputGroupInput placeholder="搜索功能" value={search}
                                     onChange={(e) => setSearch(e.target.value)}/>
                    <InputGroupAddon>
                        <Search/>
                    </InputGroupAddon>
                </InputGroup>
            </SidebarHeader>
            <SidebarContent>
                {/* 动态渲染分组及菜单 */}
                {filteredGroups.map((group) => (
                    <SidebarGroup key={group.groupLabel}>
                        <SidebarGroupLabel>{group.groupLabel}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    if (item.type === "item") {
                                        const Icon = item.icon;
                                        return (
                                            <SidebarMenuItem key={item.label}>
                                                <SidebarMenuButton asChild>
                                                    {item.to ? (
                                                        <Link to={item.to}>
                                                            {Icon && <Icon className="h-4 w-4"/>}
                                                            {item.label}
                                                        </Link>
                                                    ) : (
                                                        <span>{Icon && <Icon className="h-4 w-4"/>}{item.label}</span>
                                                    )}
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        );
                                    }

                                    // 折叠菜单
                                    const Icon = item.icon;
                                    const collapsibleId = `${group.groupLabel}-${item.label}`;
                                    const isOpen = openStates[collapsibleId] ?? true;

                                    return (
                                        <Collapsible
                                            key={item.label}
                                            open={isOpen}
                                            onOpenChange={(open) =>
                                                setOpenStates((prev) => ({
                                                    ...prev,
                                                    [collapsibleId]: open,
                                                }))
                                            }
                                            className="group/collapsible"
                                        >
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton>
                                                        {Icon && <Icon className="h-4 w-4"/>}
                                                        {item.label}
                                                        <ChevronRight
                                                            className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"/>
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.children?.map((child) => (
                                                            <SidebarMenuItem key={child.label}>
                                                                <SidebarMenuButton asChild>
                                                                    {child.to ? (
                                                                        <Link to={child.to}>{child.label}</Link>
                                                                    ) : (
                                                                        <span>{child.label}</span>
                                                                    )}
                                                                </SidebarMenuButton>
                                                            </SidebarMenuItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}

                {/* 搜索无结果提示 */}
                {filteredGroups.length === 0 && (
                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                        未找到匹配的菜单
                    </div>
                )}
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
                        <Outlet context={{updateTitle}}/>
                    </div>
                </div>
            </main>
        </SidebarProvider>
    );
}