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
  type ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  type Row,
  useReactTable,
  type Table as ReactTable,
} from "@tanstack/react-table";
import { Input } from "./ui/input";
import {
  ChevronDown,
  ChevronRight,
  Ellipsis,
  LucideScanSearch,
  Plus,
} from "lucide-react";
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
import { Fragment, useMemo, useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function TableSearchBox() {
  return (
    <div className="flex justify-center items-center mx-3 my-5">
      <div className="items-center mr-2">
        <LucideScanSearch />
      </div>
      <Input placeholder="查找..." className="max-w-3/5" />
    </div>
  );
}

function TablePagination() {
  return (
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
  );
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
      <TableSearchBox />
      <div className="flex justify-center">
        <div className="overflow-hidden rounded-sm border border-gray-200 w-9/10 shadow">
          <SimpleTable0 table={table} />
        </div>
      </div>
      <TablePagination />
    </div>
  );
}

export function SimpleTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return <SimpleTable0 table={table} />;
}

function SimpleTable0<TData>({ table }: { table: ReactTable<TData> }) {
  return (
    <Table>
      <TableHeader className=" border-b border-b-gray-200">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="border-b-gray-200">
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className={ header.column.columnDef.meta? header.column.columnDef.meta?.className: "text-left"}
                >
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
      <TableBody className="border-b border-b-gray-200">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className="border-b-gray-200"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={ cell.column.columnDef.meta? cell.column.columnDef.meta?.className: "text-left"}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={table._getColumnDefs().length}
              className="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

/**
 * 为数据表列添加勾选框和选项卡
 * @param columns 原始数据列
 * @returns 添加勾选框和选项卡的数据列
 */
export function ExtendTableColumns<TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
): ColumnDef<TData, TValue>[] {
  const columnsRef = useMemo(() => {
    //往第一行放入勾选框
    const selectColumn = {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className="text-left"
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
      meta: {
        className: "text-right"
      }
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
      meta: {
        className: "text-right"
      }
    };

    return [selectColumn, ...columns, operateColumn];
  }, [columns]); // 依赖 columns，当它变化时才重新派生
  return columnsRef;
}

/**
 * 多层级表格(父子表)
 * @param param0
 * @constructor
 */
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** 展开行时渲染的子组件，若不提供则退化为普通表格 */
  renderSubComponent?: (props: { row: Row<TData> }) => React.ReactNode;
  /** 自定义行是否可展开，默认所有行均可展开 */
  getRowCanExpand?: (row: Row<TData>) => boolean;
}

export function MultiLevelTable<TData, TValue>({
  columns,
  data,
  renderSubComponent,
  getRowCanExpand,
}: DataTableProps<TData, TValue>) {
  const [expanded, setExpanded] = useState<ExpandedState>({});

  // 如果需要展开功能，在列最前面插入一个展开/折叠按钮列
  const expandCollapseColumn: ColumnDef<TData, TValue>[] = renderSubComponent
    ? [
        {
          id: "expander",
          header: () => null,
          cell: ({ row }: { row: Row<TData> }) => {
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
        } as ColumnDef<TData, TValue>,
        ...columns,
      ]
    : columns;

  const table = useReactTable({
    data,
    columns: expandCollapseColumn,
    getCoreRowModel: getCoreRowModel(),
    // 仅在启用子组件时引入展开模型与状态
    ...(renderSubComponent
      ? {
          getExpandedRowModel: getExpandedRowModel(),
          onExpandedChange: setExpanded,
          state: { expanded },
          getRowCanExpand: getRowCanExpand ?? (() => true),
        }
      : {}),
  });

  const colSpan = expandCollapseColumn.length;

  const headers = table.getHeaderGroups();

  return (
    <div>
      <TableSearchBox />
      <div className="flex justify-center">
        <div className="overflow-hidden rounded-sm border border-gray-200 w-9/10 shadow">
          <Table>
            <TableHeader className="bg-sidebar">
              {headers.map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-b-gray-200">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={ header.column.columnDef.meta? header.column.columnDef.meta?.className: "text-left"}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <Fragment key={row.id}>
                    {/* 父行 */}
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      className={"border-b-gray-200"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={cell.column.columnDef.meta? cell.column.columnDef.meta?.className: "text-left"}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>

                    {/* 展开的子行区域 */}
                    {row.getIsExpanded() && renderSubComponent && (
                      <TableRow className="border-0">
                        <TableCell colSpan={colSpan} className="p-0">
                          {renderSubComponent({ row })}
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={colSpan} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <TablePagination />
    </div>
  );
}
