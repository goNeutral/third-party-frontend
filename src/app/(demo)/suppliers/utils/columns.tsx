"use client"

import { type ColumnDef } from "@tanstack/react-table";

export interface Supplier {
    id: string
    name: string
    registered_name: string
    city: string
    gst_status: string

}

export const supplierColumns: Array<ColumnDef<Supplier>> = [
    {
        accessorKey: "name",
        header: "Supplier Name",
    },
    {
        accessorKey: "registered_name",
        header: "Registered Entity Name",
    },
    {
        accessorKey: "city",
        header: "City",
    },
    {
        accessorKey: "gst_status",
        header: "GST Status",
    },
  
]