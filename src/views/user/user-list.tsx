import {MultiLevelTable, SimpleTable} from "@/components/tables";
import {type ColumnDef} from "@tanstack/react-table";
import {Switch} from "@/components/ui/switch";
import { ExtendTableColumns } from '../../components/tables';

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

type UserGroupVO = {
    groupId: string;
    groupName: string;
    groupDesc: string;
    users: UserListVO[];
}

const parentData :UserGroupVO[] = [
    {
        groupId:"1264871236423",
        groupName: "superuser",
        groupDesc: "超级用户",
        users: [
            {
                userId:"1653456841653",
                name:"Herobrine",
                credentialProviders:"密码+TOTP",
                groupId:"1264871236423",
                groupName:"superuser",
                frozen: false
            }
        ]
    },
    {
        groupId:"56468468468",
        groupName: "op",
        groupDesc: "运维人员",
        users: [
            {
                userId:"1653456841654",
                name:"ru0_y1",
                credentialProviders:"仅密码(不安全)",
                groupId:"56468468468",
                groupName:"op",
                frozen: false
            }
        ]
    }
]

const parentColumns: ColumnDef<UserGroupVO>[] = [
    {
        accessorKey: "groupName",
        header: "用户组",
    },
    {
        accessorKey: "groupDesc",
        header: "备注",
    }
]

const childColumns: ColumnDef<UserListVO>[] = [
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
    const extendedChildColumns = ExtendTableColumns(childColumns)
    return (
        <MultiLevelTable
            columns={ExtendTableColumns(parentColumns)}
            data={parentData}
            renderSubComponent={({ row }) => (
                <div className="border-b-0">
                    <SimpleTable data={row.original.users} columns={extendedChildColumns}/>
                </div>
            )}
        />
    )
}