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
import EditSupplierForm from './edit-supplier';
import { ScrollArea } from '@/components/ui/scroll-area';
import CreatePOForm from './CreatePOForm';
import {listSupplierMutation} from "@/hooks/suppliers"
import { Input } from "@/components/ui/input"



const SupplierDashboardPage = (): JSX.Element => {
	const [isAddingProduct, setIsAddingProduct] = useState(false);
	const [isCreatingPO, setIsCreatingPO] = useState(false);
	const [orders, setOrders] = useState<any>([]);
	const [selectSupplier , setSelectSupplier ] = useState<any>({})
	const [editing,setEditing] =useState<boolean>(false)
	const [searchTerm, setSearchTerm] = useState("");
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

	useEffect(() => {
		const getData = setTimeout(() => {
			listSupplier(searchTerm)
	
		}, 1000)
		return () => clearTimeout(getData)

	}, [searchTerm])


	const successCallBack = async () => {
		setIsCreatingPO(false)
		setIsAddingProduct(false)
		// setEditing(false)
		// await listSupplier()

	}
 
	const AddSupplierButton = (
		<Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}  >
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
					<AddSupplierForm CallBack={successCallBack} />
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
					<CreatePOForm successCallBack={successCallBack} />
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
	const SearchSupplier = (
		<div className="relative">
		  <Input
			placeholder="Search by supplier name"
			value={searchTerm}
			onChange={(e) => { setSearchTerm(e.target.value) }}
			className="pl-8"
		  />
		</div>
	  );
	
	return (
		<div>
			<Navbar
				title='Supplier'
				buttons={[CreatePOButton, AddSupplierButton,SearchSupplier]}
			/>
			<Dialog open={editing} onOpenChange={setEditing}>
			{/* <DialogTrigger asChild>
				<Button>
					<Plus className='h-2 w-2' />
					Edit Supplier
				</Button>
			</DialogTrigger> */}
			<DialogContent className='min-w-[80vw]'>
				<DialogHeader>
					<DialogTitle>Edit Supplier</DialogTitle>
				</DialogHeader>
				<ScrollArea className='max-h-[80vh] pr-4'>
					<EditSupplierForm  supplier={selectSupplier}  />
				</ScrollArea>
			</DialogContent>
		</Dialog>
			<Card className='p-4 m-4 rounded-sm'>
				{/* <CreatePOForm /> */}
				<DataTable columns={supplierColumns} data={orders}  
				
				callback={(data: any) => {
					// alert(data?.id);
					console.log(data);
					setSelectSupplier(data)
					setEditing(true)
					

				}}

				/>
			</Card>
		</div>
	);
};

export default SupplierDashboardPage;
