import { DataTable, ExtendTableColumns } from "@/components/tables";
import { Switch } from "@/components/ui/switch";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";
import { useOutletContext } from "react-router";

/**
 * 女仆节点展示列表
 */
type MaidListVO = {
    /**
     * 女仆节点id
     */
    maidId: string,
    /**
     * 女仆节点名称
     */
    maidName: string,
    /**
     * 主机地址+端口
     */
    hostPort: string,
    /**
     * 是否启用
     */
    enabled: boolean
}

const data: MaidListVO[] = [
    {
        maidId:"1616161616161616",
        maidName:"Sakuya",
        hostPort:"[:1]:16160",
        enabled:true
    }
]


const columns: ColumnDef<MaidListVO>[] = [
    {
        accessorKey: "maidName",
        header: "Maid节点",
    },
    {
        accessorKey: "hostPort",
        header: "地址",
    },
    {
        accessorKey: "enabled",
        header: "任务开关",
        cell: ({row}) => (
            <Switch checked={row.getValue("enabled")}/>
        ),
    }
];

export function MaidsPage() {
    const { updateTitle } = useOutletContext();
    useEffect(() => {
        // 设置布局中的标题
        updateTitle("Maid节点");
    }, [updateTitle]);
    return (
        <div className="w-full">
            <DataTable columns={ExtendTableColumns(columns)} data={data}>
            </DataTable>
        </div>
    );
}