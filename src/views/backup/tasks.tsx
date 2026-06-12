import { DataTable } from "@/components/tables";
import { Switch } from "@/components/ui/switch";
import type { ColumnDef } from "@tanstack/react-table";
import { useOutletContext } from "react-router";
import React, { useEffect } from "react";
import { operateColumn, tableSelectionColumn, type DropdownGroup } from "@/components/table-elements";
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxValue, useComboboxAnchor } from "@/components/ui/combobox";

/**
 * 备份任务展示对象
 */
type BackupJobVO = {
    /**
     * 任务编号
     */
    taskId: number;
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
    enabled: true | false;
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
        accessorKey: "enabled",
        header: "任务开关",
        cell: ({ row }) => (
            <Switch checked={row.getValue("enabled")} />
        ),
    }
];

const data: BackupJobVO[] = [
    {
        taskId: 29864884418489,
        maidName: "Sakuya",
        jobName: "备份任务展示",
        mode: "全量",
        enabled: true,
    },
    {
        taskId: 29864884418490,
        maidName: "Sakuya",
        jobName: "备份任务展示2",
        mode: "增量",
        enabled: false,
    },
    {
        taskId: 29864884418491,
        maidName: "Cirno",
        jobName: "备份任务展示3",
        mode: "增量",
        enabled: false,
    },
];

/**
 * 备份任务界面
 */
export function BackupTasksPage() {
    const { updateTitle } = useOutletContext();

    const dropdown: DropdownGroup[] = [
        {
            label: "操作",
            dropdownMenu: [
                {
                    operatorText: "查看详情/修改",
                    onclick: ""
                },
                {
                    operatorText: "删除",
                    onclick: ""
                }
            ]
        }
    ]

    useEffect(() => {
        // 设置布局中的标题
        updateTitle("备份任务");
    }, [updateTitle]);
    return (
        <div className="w-full">
            <DataTable columns={[tableSelectionColumn(), ...columns, operateColumn(dropdown, NewBackupTaskDialog())]} data={data}>
            </DataTable>
        </div>
    );
}

/**
 * 添加备份任务对话框
 */
function NewBackupTaskDialog() {
    const dumps = [
        {
            dumpId: "12537612543812",
            dumpName: "我的电脑",
            dumpType: "本地"
        },
        {
            dumpId: "12537612543813",
            dumpName: "远程SCP",
            dumpType: "远程主机"
        },
        {
            dumpId: "12537612543814",
            dumpName: "疼逊云",
            dumpType: "S3对象服务器"
        }
    ]
    const anchor = useComboboxAnchor()
    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>新增备份任务</DialogTitle>
            </DialogHeader>
            <FieldGroup>
                <Field>
                    <Label htmlFor="maidName">
                        Maid节点
                    </Label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="选择Maid节点" id="maidName" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Maid节点</SelectLabel>
                                <SelectItem value="16161616161616">Sakuya</SelectItem>
                                <SelectItem value="64375486375648">Cirno</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
                <Field>
                    <Label htmlFor="taskName">备份任务名称</Label>
                    <Input id="taskName" required />
                </Field>
                <Field>
                    <Label htmlFor="mode">
                        备份模式
                    </Label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="选择备份模式" id="mode" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>备份模式</SelectLabel>
                                <SelectItem value="full">全量</SelectItem>
                                <SelectItem value="incremental">增量</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>
                <Field>
                    <Label htmlFor="cron">
                        CRON表达式
                    </Label>
                    <Input id="cron" required />
                </Field>
                <Field>
                    <Label htmlFor="source">被备份的文件/目录路径</Label>
                    <Input id="source" required />
                </Field>
                <Field>
                    <Label htmlFor="cron">CRON表达式</Label>
                    <Input id="cron" required />
                </Field>
                <Field>
                    <Label htmlFor="enabled">任务开关</Label>
                    <Switch id="enabled" required />
                </Field>
                <Field>
                    <Label htmlFor="dumps">文件存储方式</Label>
                    <Combobox items={dumps} multiple autoHighlight>
                        <ComboboxChips ref={anchor} className="w-full">
                            <ComboboxValue>
                                {
                                    (dumps) => (
                                        <React.Fragment>
                                            {dumps.map((dump) => (
                                                <ComboboxChip key={dump.dumpId}>{dump.dumpName}</ComboboxChip>
                                            ))}
                                            <ComboboxChipsInput/>
                                        </React.Fragment>
                                    )
                                }
                            </ComboboxValue>
                        </ComboboxChips>
                        <ComboboxContent anchor={anchor}>
                            <ComboboxEmpty>没有找到任何东西...</ComboboxEmpty>
                            <ComboboxList>
                                {(dump) => (
                                    <ComboboxItem key={dump.dumpId} value={dump.dumpId}>
                                        {dump.dumpName + " - " + dump.dumpType}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </Field>
            </FieldGroup>

            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button type="button" id="submit">提交</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button type="button" id="cancel" variant="ghost">取消</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}
