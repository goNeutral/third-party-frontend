// "use client"

import React, { useState,useEffect } from "react";
import { Navbar } from "@/components/admin-panel/navbar";
import { Button } from "@/components/ui/button";
import {  customerColumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddCustomerForm from "./add-customer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {listCustomerMutation} from "@/hooks/customer"
import CreatePOForm from "./CreatePOForm";

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