"use client"

import { type ColumnDef } from "@tanstack/react-table";

export interface Customer {
  id: string
  customerName: string
  registeredEntityName: string
  city: string
  gstStatus: "active" | "inactive"
  paymentStatus: "pending" | "completed"
  businessTillDate: string
}

export const customerColumns: Array<ColumnDef<Customer>> = [
    {
        accessorKey: "customerName",
        header: "Customer Name",
    },
    {
        accessorKey: "registeredEntityName",
        header: "Registered Entity Name",
    },
    {
        accessorKey: "city",
        header: "City",
    },
    {
        accessorKey: "gstStatus",
        header: "GST Status",
    },
    {
        accessorKey: "paymentStatus",
        header: "Payment Status",
    },
    {
        accessorKey: "businessTillDate",
        header: "Business Till Date",
    }
]