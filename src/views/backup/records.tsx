import {useOutletContext} from "react-router";
import {useEffect} from "react";
import {DataTable} from "@/components/data-table";
import type {ColumnDef} from "@tanstack/react-table";

/**
 * 展示备份记录列表
 */
type BackupRecordsListVO = {
    /**
     * 记录id
     */
    id: string;
    /**
     * 文件id
     */
    fileId: string;
    /**
     * 文件名
     */
    fileName: string;
    /**
     * 女仆节点id
     */
    maidId: string;
    /**
     * 女仆节点名称
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
     * 存储id
     */
    dumpId: string;
    /**
     * 存储名称
     */
    dumpName: string;
    /**
     * 记录日期
     */
    createTime: string;
}

const data: BackupRecordsListVO[] = [
    {
        id: "1294687324697824",
        fileId: "8923146873246",
        fileName: "level.dat",
        maidId: "1616161616161616",
        maidName: "Sakuya",
        jobId:"324063280746",
        jobName:"increment-1",
        dumpId:"1289361092836",
        dumpName:"dump",
        createTime:"2026-04-01 00:00:00",
    }
]

const columns: ColumnDef<BackupRecordsListVO>[] = [
    {
        accessorKey: "fileName",
        header: "文件名",
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
        accessorKey: "dumpName",
        header: "存储方式",
    },
    {
        accessorKey: "createTime",
        header: "备份时间"
    }
];

export function BackupRecordsPage() {
    const { updateTitle } = useOutletContext();
    useEffect(() => {
        // 设置布局中的标题
        updateTitle("备份任务");
    }, [updateTitle]);
    return (
        <div className="w-full">
            <DataTable columns={columns} data={data}>
            </DataTable>
        </div>
    );
}