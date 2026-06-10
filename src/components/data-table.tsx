import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "./ui/input";
import { Ellipsis, LucideScanSearch, Plus } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {useMemo} from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

/**
 * 带分页的数据表格
 */
export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <div className="flex justify-center items-center mx-3 my-5">
        <div className="items-center mr-2">
          <LucideScanSearch />
        </div>
        <Input placeholder="查找..." className="max-w-3/5" />
      </div>
      <div className="flex justify-center">
        <div className="overflow-hidden rounded-sm border border-gray-200 w-9/10 shadow">
          <Table>
            <TableHeader className='bg-sidebar'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-b-gray-200">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className={header.column.id === 'operate-menu' ? 'text-right' : 'text-left'}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-b-gray-200"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className={cell.column.id === 'operate-menu' ? 'text-right' : 'text-left'}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <Pagination className="mt-2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink> 1 </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink> 2 </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink> 3 </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}


/**
 * 为数据表列添加勾选框和选项卡
 * @param columns 原始数据列
 * @returns 添加勾选框和选项卡的数据列
 */
export function ExtendTableColumns<TData, TValue>(columns: ColumnDef<TData, TValue>[]): ColumnDef<TData, TValue>[] {
    const columnsRef = useMemo(() => {
    //往第一行放入勾选框
    const selectColumn = {
      id: "select",
      header: ({ table }) => (
          <Checkbox className="text-left"
              checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
      style: { textAlign: 'left' }
    };
    //最后一列放"查看详情"按钮
    const operateColumn = {
      id: "operate-menu",
      header: () => (
          <Button variant="secondary">
            <Plus />
          </Button>
      ),
      cell: () => (
          <Button variant="ghost">
            <Ellipsis />
          </Button>
      ),
      style: { textAlign: 'right' }
    };

    return [selectColumn, ...columns, operateColumn];
  }, [columns]); // 依赖 columns，当它变化时才重新派生
  return columnsRef;
}