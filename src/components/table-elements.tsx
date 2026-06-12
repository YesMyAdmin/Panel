import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "./ui/button";
import { ChevronDown, ChevronRight, Ellipsis, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import type { ReactElement } from "react";

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
export type DropdownMenu = {
    operatorText: string;
    onclick: string;
};

/**
 * 下拉栏菜单组
 */
export type DropdownGroup = {
    label: string;
    dropdownMenu: DropdownMenu[];
};

/**
 * 表格最右侧的操作按钮
 * @param dropDownMenus 操作按钮所需的菜单项
 * @param addNewItemDialog 添加新项目的对话框(可以留空,但右上角的"新增"按钮将不会显示)
 */
export function operateColumn(dropDownMenus: DropdownGroup[], addNewItemDialog?: ReactElement) {
    return {
        id: "operate-menu",
        header: () => {
            return addNewItemDialog ? (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary">
                        <Plus />
                    </Button>
                </DialogTrigger>
                {addNewItemDialog}
            </Dialog>
            ) : undefined
        },
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost"><Ellipsis /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {
                        dropDownMenus.map((group) => (
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
                                {group.dropdownMenu.map((menu) => (
                                    <DropdownMenuItem>{menu.operatorText}</DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                        ))
                    }
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
