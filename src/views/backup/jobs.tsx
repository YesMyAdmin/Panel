import { DataTable } from "@/components/tables";
import { Switch } from "@/components/ui/switch";
import type { ColumnDef } from "@tanstack/react-table";
import { useOutletContext } from "react-router";
import { useEffect } from "react";
import { operateColumn, tableSelectionColumn } from "@/components/table-elements";

/**
 * 备份任务展示对象
 */
type BackupJobVO = {
    /**
     * 任务编号
     */
    id: number;
    /**
     * 负责执行任务的女仆节点名称
     */
    maidName: string;
    /**
     * 备份任务名称
     */
    jobName: string; //备份任务名称
    /**
     * 备份模式(全量/增量)
     */
    mode: string;
    /**
     * 任务开关
     */
    switch: "on" | "off";
};

const columns: ColumnDef<BackupJobVO>[] = [
    {
        accessorKey: "maidName",
        header: "Maid节点",
    },
    {
        accessorKey: "jobName",
        header: "任务名称",
    },
    {
        accessorKey: "mode",
        header: "任务模式",
    },
    {
        accessorKey: "switch",
        header: "任务开关",
        cell: ({ row }) => (
            <Switch checked={"on" == row.getValue("switch") ? true : false} />
        ),
    }
];

const data: BackupJobVO[] = [
    {
        id: 29864884418489,
        maidName: "Sakuya",
        jobName: "备份任务展示",
        mode: "全量",
        switch: "on",
    },
    {
        id: 29864884418490,
        maidName: "Sakuya",
        jobName: "备份任务展示2",
        mode: "增量",
        switch: "off",
    },
    {
        id: 29864884418491,
        maidName: "Cirno",
        jobName: "备份任务展示3",
        mode: "增量",
        switch: "off",
    },
];

/**
 * 备份任务界面
 */
export function BackupJobPage() {
    const { updateTitle } = useOutletContext();
    useEffect(() => {
        // 设置布局中的标题
        updateTitle("备份任务");
    }, [updateTitle]);
    return (
        <div className="w-full">
            <DataTable columns={[tableSelectionColumn(), ...columns, operateColumn()]} data={data}>
            </DataTable>
        </div>
    );
}
