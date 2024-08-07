"use client";

import { Checkbox } from "~/components/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import React, { type FC, useMemo } from "react";
import { DataTableColumnHeader } from "~/components/data-table/data-table-column-header";
import { DataTable } from "~/components/data-table";
import { FriendRequestCellActions } from "./actions";

export type Row = {
  senderId: string;
  senderName: string;
  senderEmail: string;
};

type Props = {
  data: Row[];
};

export const FriendRequestTableShell: FC<Props> = ({ data }) => {
  const FriendsColumnDef = useMemo<ColumnDef<Row>[]>(
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
        id: "senderName",
        header: ({ column }) => (
          <div>
            <DataTableColumnHeader column={column} title="Name" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="min-w-max mr-auto">{row.getValue("senderName")}</div>
        ),
        accessorKey: "senderName",
        enableSorting: true,
        enableHiding: true,
      },
      {
        id: "senderEmail",
        header: ({ column }) => (
          <div>
            <DataTableColumnHeader column={column} title="Email" />
          </div>
        ),
        cell: ({ row }) => (
          <div className="min-w-max mr-auto">{row.getValue("senderEmail")}</div>
        ),
        accessorKey: "senderEmail",
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
            <FriendRequestCellActions rowData={row.original} data={data} />
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );
  return (
    <DataTable
      data={data}
      columns={FriendsColumnDef}
      filterableColumns={[]}
      searchPlaceholder="Search users..."
      messages={{
        filteredDataNotFoundMessage: {
          title: "No friend requests found!",
          description: "",
        },
        emptyDataMessage: {
          title: "No friend requests found!",
          description: "",
        },
      }}
    />
  );
};
