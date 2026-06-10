import { DataTable, ExtendTableColumns } from "@/components/data-table";
import { Switch } from "@/components/ui/switch";
import type { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";
import { useOutletContext } from "react-router";

type UserListVO = {
    /**
     * 用户id
     */
    userId: string,
    /**
     * 用户名
     */
    name: string,
    /**
     * 认证方式
     */
    credentialProviders: string,
    /**
     * 用户组id
     */
    groupId: string,
    /**
     * 用户组名
     */
    groupName: string,
    /**
     * 是否冻结
     */
    frozen: boolean,
}

const data: UserListVO[] = [
    {
        userId:"1653456841654",
        name:"ru0_y1",
        credentialProviders:"仅密码(不安全)",
        groupId:"56468468468",
        groupName:"op",
        frozen: false
    }
]

const columns: ColumnDef<UserListVO>[] = [
    {
        accessorKey: "name",
        header: "用户名",
    },
    {
        accessorKey: "credentialProviders",
        header: "认证方式",
    },
    {
        accessorKey: "groupName",
        header: "用户组",
    },
    {
        accessorKey: "frozen",
        header: "冻结",
        cell: ({row}) => (
            <Switch checked={row.getValue("frozen")}/>
        ),
    }
];


export function UserListPage(){
    const { updateTitle } = useOutletContext();
    useEffect(() => {
        // 设置布局中的标题
        updateTitle("用户列表");
    }, [updateTitle]);
    return (
        <div className="w-full">
            <DataTable columns={ExtendTableColumns(columns)} data={data}>
            </DataTable>
        </div>
    );
}