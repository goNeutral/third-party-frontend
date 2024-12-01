// "use client"

import React, { useState,useEffect } from "react";
import { Navbar } from "@/components/admin-panel/navbar";
import { Button } from "@/components/ui/button";
import { type Customer, customerColumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddCustomerForm from "./add-customer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {listCustomerMutation} from "@/hooks/customer"
import CreatePOForm from "./CreatePOForm";



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
	const [isCreatingPO, setIsCreatingPO] = useState(false);

  const [orders, setOrders] = useState<any>([]);

  const {mutate: listCustomer} = listCustomerMutation(
    (data:any) => {
      setOrders(data.data);
      console.log(data);
    },
    (error:any) => {
      console.log(error);
      
    }
  );

  useEffect(() => {
    const fetchData = async () => {
       await listCustomer();

    };
    fetchData();
  }
  , []);


  const successCallBack=()=>{
    setIsAddingProduct(false)
    setIsCreatingPO(false)
    listCustomer()
  }
  // const orders = getCustomers();

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
              <AddCustomerForm  successCallBack={successCallBack} />
            </ScrollArea>
        </DialogContent>
      </Dialog>
    );

    const CreatePOButton = (
      <Dialog open={isCreatingPO} onOpenChange={setIsCreatingPO}>
			<DialogTrigger asChild>
				<Button>Create SO</Button>
			</DialogTrigger>
			<DialogContent className='min-w-[95vw]'>
				<DialogHeader>
					<DialogTitle>Create Sales Order</DialogTitle>
				</DialogHeader>
				<ScrollArea className='max-h-[80vh] pr-4'>
					<CreatePOForm />
				</ScrollArea>
			</DialogContent>
		</Dialog>
    )
    return (
      <div>
        <Navbar title="Customer" buttons={[CreatePOButton, AddSupplierButton]} />
      
        <Card className="p-4 m-4 rounded-sm">
            <DataTable columns={customerColumns} data={orders} />
        </Card>
      </div>
    );
}

export default CustomerDashboardPage;