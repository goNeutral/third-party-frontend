// "use client"

import React, { useState,useEffect } from 'react';
import { Navbar } from '@/components/admin-panel/navbar';
import { Button } from '@/components/ui/button';
import { type Supplier, supplierColumns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import { Card } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import AddSupplierForm from './add-supplier';
import { ScrollArea } from '@/components/ui/scroll-area';
import CreatePOForm from './CreatePOForm';
import {listSupplierMutation} from "@/hooks/suppliers"

// function getSuppliers(): Supplier[] {
// 	// Fetch data from your API here.
// 	return [
// 		{
// 			id: '728ed52f',
// 			supplierName: 'Supplier 1',
// 			registeredEntityName: 'Registered Entity 1',
// 			city: 'Kanpur',
// 			gstStatus: 'active',
// 			paymentStatus: 'pending',
// 			businessTillDate: 'Business Till Date 1',
// 		},
// 		{
// 			id: '728ed52k',
// 			supplierName: 'Supplier 2',
// 			registeredEntityName: 'Registered Entity 2',
// 			city: 'Gurgaon',
// 			gstStatus: 'inactive',
// 			paymentStatus: 'completed',
// 			businessTillDate: 'Business Till Date 2',
// 		},
// 		{
// 			id: '728ed52l',
// 			supplierName: 'Supplier 3',
// 			registeredEntityName: 'Registered Entity 3',
// 			city: 'Indore',
// 			gstStatus: 'active',
// 			paymentStatus: 'pending',
// 			businessTillDate: 'Business Till Date 3',
// 		},
// 		// ...
// 	];
// }

const SupplierDashboardPage = (): JSX.Element => {
	const [isAddingProduct, setIsAddingProduct] = useState(false);
	const [isCreatingPO, setIsCreatingPO] = useState(false);
	const [orders, setOrders] = useState<any>([]);

	const {mutate: listSupplier} = listSupplierMutation(
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
		 await listSupplier();
  
	  };
	  fetchData();
	}
	, []);

	const AddSupplierButton = (
		<Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
			<DialogTrigger asChild>
				<Button>
					<Plus className='h-2 w-2' />
					Add Supplier
				</Button>
			</DialogTrigger>
			<DialogContent className='min-w-[80vw]'>
				<DialogHeader>
					<DialogTitle>Add New Supplier</DialogTitle>
				</DialogHeader>
				<ScrollArea className='max-h-[80vh] pr-4'>
					<AddSupplierForm />
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);

	const CreatePOButton = (
		<Dialog open={isCreatingPO} onOpenChange={setIsCreatingPO}>
			<DialogTrigger asChild>
				<Button>Create PO</Button>
			</DialogTrigger>
			<DialogContent className='min-w-[95vw]'>
				<DialogHeader>
					<DialogTitle>Create Product Order</DialogTitle>
				</DialogHeader>
				<ScrollArea className='max-h-[80vh] pr-4'>
					<CreatePOForm />
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
	return (
		<div>
			<Navbar
				title='Supplier'
				buttons={[CreatePOButton, AddSupplierButton]}
			/>
			{/* <div className="grid grid-cols-1 md:grid-cols-5 m-4 gap-4"> */}
			{/* <ProductDashboardStats className="md:col-span-2"/> */}
			{/* <GraphStats className=" md:col-span-3" /> */}
			{/* <MyChart /> */}
			{/* </div> */}
			<Card className='p-4 m-4 rounded-sm'>
				{/* <CreatePOForm /> */}
				<DataTable columns={supplierColumns} data={orders} />
			</Card>
		</div>
	);
};

export default SupplierDashboardPage;
