"use client"

import React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export interface Order {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const orderColumns: Array<ColumnDef<Order>> = [
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
]