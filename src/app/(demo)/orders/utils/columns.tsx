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

export interface SalesOrder {
    customer: string
    order_date : string
    total_amount: string
    terms : string
    order_status : string
    remarks : string
    coment : string
    order_items: any
}

export const salesOrderColumns: Array<ColumnDef<SalesOrder>> = [
    {
        accessorKey: "customer",
        header: "Customer",
    },
    {
        accessorKey: "order_date",
        header: "Order Date",
    },
    {
        accessorKey: "total_amount",
        header: "Total Amount",
    },

    {
        accessorKey: "order_status",
        header: "Order Status",
    },
    {
        accessorKey: "remarks",
        header: "Remarks",
    },
    {
        accessorKey: "comment",
        header: "Comment",
    },

  
]

export interface PurchaseOrder {
    supplier: string
    order_date : string
    total_amount: string
    terms : string
    order_status : string
    remarks : string
    coment : string
    order_items: any
    sales_order: string
}

export const purchaseOrderColumns: Array<ColumnDef<PurchaseOrder>> = [
    {
        accessorKey: "supplier",
        header: "Supplier",
    },
    {
        accessorKey: "order_date",
        header: "Order Date",
    },
    {
        accessorKey: "sales_order",
        header: "Sales Order",
    },

    {
        accessorKey: "order_status",
        header: "Order Status",
    },
 
 
    {
        accessorKey: "total_amount",
        header: "Total Amount",
    },

    {
        accessorKey: "order_status",
        header: "Order Status",
    },
    {
        accessorKey: "remarks",
        header: "Remarks",
    },
    {
        accessorKey: "comment",
        header: "Comment",
    },

  
]
// const salesOrderColumns: Array<ColumnDef<Sup