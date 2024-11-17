// "use client"

import React, { useState } from "react";
import { Navbar } from "@/components/admin-panel/navbar";
import { Button } from "@/components/ui/button";
import { type Customer, customerColumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddCustomerForm from "./add-customer";
import { ScrollArea } from "@/components/ui/scroll-area";

function getCustomers(): Customer[] {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        customerName: "Customer 1",
        registeredEntityName: "Registered Entity 1",
        city: "Kanpur",
        gstStatus: "active",
        paymentStatus: "pending",
        businessTillDate: "Business Till Date 1",
      },
      {
        id: "728ed52k",
        customerName: "Customer 2",
        registeredEntityName: "Registered Entity 2",
        city: "Gurgaon",
        gstStatus: "inactive",
        paymentStatus: "completed",
        businessTillDate: "Business Till Date 2",
      }, {
        id: "728ed52l",
        customerName: "Customer 3",
        registeredEntityName: "Registered Entity 3",
        city: "Indore",
        gstStatus: "active",
        paymentStatus: "pending",
        businessTillDate: "Business Till Date 3",
      }
      // ...
    ]
  }




const CustomerDashboardPage = (): JSX.Element => {
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const orders = getCustomers();

    const AddSupplierButton = (
      <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4" />
            Add Customer
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[80vw]">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
            <ScrollArea className="max-h-[80vh] p-2 pr-4">
              <AddCustomerForm />
            </ScrollArea>
        </DialogContent>
      </Dialog>
    );

    const CreatePOButton = (
        <Button>Create PO</Button>
    )
    return (
      <div>
        <Navbar title="Supplier" buttons={[CreatePOButton, AddSupplierButton]} />
        {/* <div className="grid grid-cols-1 md:grid-cols-5 m-4 gap-4"> */}
            {/* <ProductDashboardStats className="md:col-span-2"/> */}
            {/* <GraphStats className=" md:col-span-3" /> */}
            {/* <MyChart /> */}
        {/* </div> */}
        <Card className="p-4 m-4 rounded-sm">
            <DataTable columns={customerColumns} data={orders} />
        </Card>
      </div>
    );
}

export default CustomerDashboardPage;