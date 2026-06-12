import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";
import { ChevronDown, ChevronRight, Ellipsis, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

/**
 * 表左侧的勾选框
 */
export function tableSelectionColumn() {
    return {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                className="text-left"
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        meta: {
            className: "text-right",
        },
    };
};

/**
 * 下拉栏菜单选项
 */
export type DropDownMenu = {
    operatorText: string,
    onclick: string
};

const defaultDropDownMenu: DropdownMenu[] = [
    {
        operatorText: "查看详情/修改",
        onclick: ""
    },
    {
        operatorText: "删除",
        onclick: ""
    }
];

/**
 * 表格最右侧的操作按钮
 */
export function operateColumn(dropDownMenus: DropDownMenu[]) {
    return {
        id: "operate-menu",
        header: () => (
            <Button variant="secondary">
                <Plus />
            </Button>
        ),
        cell: () => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost"><Ellipsis/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>操作</DropdownMenuLabel>
                            {dropDownMenus.map({menu}) => {
                                <DropdownMenuItem>{menu}</DropdownMenuItem>
                            }}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
        ),
        meta: {
            className: "text-right",
        },
    };
};

/**
 * 下拉按钮
 */
export function expandCollapseColumn() {
    return {
        id: "expander",
        header: () => null,
        cell: ({ row }) => {
            if (!row.getCanExpand()) return null;
            return (
                <button
                    onClick={row.getToggleExpandedHandler()}
                    className="p-1 rounded hover:bg-gray-100"
                >
                    {row.getIsExpanded() ? (
                        <ChevronDown className="w-4 h-4" />
                    ) : (
                        <ChevronRight className="w-4 h-4" />
                    )}
                </button>
            );
        },
        meta: {
            className: "text-center p-0 w-12",
        },
    };
};
