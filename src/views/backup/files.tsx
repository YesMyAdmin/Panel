import type {ColumnDef} from "@tanstack/react-table";
import {DataTable} from "@/components/tables";
import {useOutletContext} from "react-router";
import {useEffect} from "react";
import { operateColumn, tableSelectionColumn } from "@/components/table-elements";

/**
 * 备份文件视图对象(列表展示)
 */
type BackupFileListVO = {
    /**
     * 文件id
     */
    fileId: string;
    /**
     * 文件名(从originalPath提取)
     */
    fileName: string;
    /**
     * 女仆节点id
     */
    maidId: string;
    /**
     * 女仆节点名称
     * 后端只会传maid节点id,前段要查缓存转成节点名称
     */
    maidName: string;
    /**
     * 任务id
     */
    jobId: string;
    /**
     * 任务名称
     */
    jobName: string;
    /**
     * 文件大小(格式化后的)
     * 比如1024格式化成 1KB, 1048576格式化成1MB
     */
    fileSize: string;
    /**
     * 备份时间
     * 后端传的是标准ISO格式，要转成yyyy-MM-dd HH:mm:ss这样对人类友好的格式
     */
    recordTime: string;
}

export const columns: ColumnDef<BackupFileListVO>[] = [
    {
        accessorKey: "fileName",
        header: "文件名",
    },
    {
        accessorKey: "fileSize",
        header: "文件大小",
    },
    {
        accessorKey: "maidName",
        header: "Maid节点",
    },
    {
        accessorKey: "jobName",
        header: "任务名称",
    },
    {
        accessorKey: "recordTime",
        header: "最近一次备份时间"
    }
];

const data: BackupFileListVO[] = [
    {
        fileId: "312548345837244",
        fileName: "level.dat",
        maidId: "1616161616161616",
        maidName: "Sakuya",
        jobId: "1111151111155555511115",
        jobName: "incremental-1",
        fileSize: "16KB",
        recordTime: "2026-05-01 00:00:00",
    },
    {
        fileId: "312548345837244",
        fileName: "MyWorld.zip",
        maidId: "1616161616161616",
        maidName: "Sakuya",
        jobId: "55555155555111111555551",
        jobName: "full-1",
        fileSize: "1.5GB",
        recordTime: "2026-05-01 00:03:00",
    }
]

/**
 * 备份文件列表
 */
export function BackupFilesPage() {
    const { updateTitle } = useOutletContext();
    useEffect(() => {
        // 设置布局中的标题
        updateTitle("备份文件列表");
    }, [updateTitle]);
    return (
        <div className="w-full">
            <DataTable columns={[tableSelectionColumn(), ...columns, operateColumn()]} data={data}>
            </DataTable>
        </div>
    );
}