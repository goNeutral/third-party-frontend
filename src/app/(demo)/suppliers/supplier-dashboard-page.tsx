"use client"

import React from "react";
import { Navbar } from "@/components/admin-panel/navbar";
import { Button } from "@/components/ui/button";
import { type Order, orderColumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card } from "@/components/ui/card";
import ProductDashboardStats from "./stats";
import GraphStats from "./stat-graphs";
import MyChart from "./graph-orders-bar";

async function getOrders(): Promise<Order[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },{
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },{
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },{
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },{
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },{
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },{
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },{
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },{
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },{
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },{
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },{
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },{
        id: "7283d52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },{
        id: "728ed51f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },{
        id: "738ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },{
        id: "728ed52a",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      // ...
    ]
  }

const SupplierDashboardPage = async (): Promise<JSX.Element> => {
    const orders = await getOrders();

    const AddSupplierButton = (
        <Button>
          Add Supplier
        </Button>
    )

    const CreatePOButton = (
        <Button>Create PO</Button>
    )
    return (
      <div>
        <Navbar title="Supplier" buttons={[CreatePOButton, AddSupplierButton]} />
        <div className="grid grid-cols-1 md:grid-cols-5 m-4 gap-4">
            <ProductDashboardStats className="md:col-span-2"/>
            {/* <GraphStats className=" md:col-span-3" /> */}
            <MyChart />
        </div>
        <Card className="p-4 m-4 rounded-sm">
            <DataTable columns={orderColumns} data={orders} />
        </Card>
      </div>
    );
}

export default SupplierDashboardPage;