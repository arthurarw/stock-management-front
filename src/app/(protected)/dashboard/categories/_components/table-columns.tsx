"use client";

import { Category } from "@/interfaces/category";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import CategoriesTableActions from "./table-actions";

export const categoriesTableColumns: ColumnDef<Category>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Criado em",
    cell: (params) => {
      const data = params.row.original;
      const brDate = toZonedTime(data.createdAt, "UTC");
      return format(brDate, "dd/MM/yyyy 'às' HH:mm:ss");
    },
  },
  {
    id: "productCount",
    accessorKey: "productCount",
    header: "Qtd de Produtos",
    cell: (params) => {
      const data = params.row.original;
      return data.productCount ?? 0;
    },
  },
  {
    id: "actions",
    cell: (params) => {
      const data = params.row.original;
      return <CategoriesTableActions category={data} />;
    },
  },
];
