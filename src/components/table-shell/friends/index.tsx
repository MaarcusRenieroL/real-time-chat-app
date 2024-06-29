"use client";

import { Checkbox } from "~/components/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import React, { type FC, useMemo } from "react";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTable } from "~/components/data-table";
import { FriendCellActions } from "./actions";

type TaskTableShellProps = {};

export const FriendTableShell: FC<TaskTableShellProps> = ({}) => {
  const FriendsColumnDef = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        id: "uniqueId",
        cell: ({ row }) => (
          <div className="min-w-max">{row.getValue("id")}</div>
        ),
        accessorKey: "id",
        enableHiding: true,
      },
      {
        id: "name",
        header: ({ column }) => (
          <div>
            <DataTableColumnHeader column={column} title="Name" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="min-w-max mr-auto">{row.getValue("name")}</div>
        ),
        accessorKey: "name",
        enableSorting: true,
        enableHiding: true,
      },
      {
        id: "email",
        header: ({ column }) => (
          <div>
            <DataTableColumnHeader column={column} title="Email" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="min-w-max mr-auto">{row.getValue("email")}</div>
        ),
        accessorKey: "email",
        enableSorting: true,
        enableHiding: true,
      },
      {
        id: "actions",
        header: () => (
          <div className="flex min-w-max items-center justify-center">
            Actions
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center min-w-max">
            <FriendCellActions data={row.original} />
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <DataTable
      data={[{ name: "Maarcus", email: "maarcusreniero@gmail.com" }]}
      columns={FriendsColumnDef}
      filterableColumns={[]}
      searchPlaceholder="Search tasks..."
      messages={{
        filteredDataNotFoundMessage: {
          title: "No tasks found!",
          description: "Add some posts to get started!",
        },
        emptyDataMessage: {
          title: "No tasks found!",
          description: "Add some posts to get started!",
        },
      }}
    />
  );
};
