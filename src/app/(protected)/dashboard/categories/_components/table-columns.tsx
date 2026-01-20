"use client";

import { Category } from "@/interfaces/category";
import { ColumnDef } from "@tanstack/react-table";
import CategoriesTableActions from "./table-actions";

export const categoriesTableColumns: ColumnDef<Category>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "actions",
    cell: (params) => {
      const data = params.row.original;
      return <CategoriesTableActions category={data} />;
    },
  },
];
