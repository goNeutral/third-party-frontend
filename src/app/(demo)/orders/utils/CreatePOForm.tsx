'use client';
import React, { useState, useEffect } from 'react';
// import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

import POFormProductForm from './POFormProductForm';
import {
	searchSupplierMutation,
	createPurchaseOrderMutation,
} from '@/hooks/suppliers';
import { toast } from 'sonner';
import { getSOProductMutation } from '@/hooks/products';
import { updatePurchaseOrderMutation } from '@/hooks/suppliers';
import { updateSalesOrderMutation } from '@/hooks/suppliers';

const SHIPMENT_STATUS_CHOICES = [
	{ label: 'Confirmed', value: 0 },
	{ label: 'Pending', value: 1 },
	{ label: 'Processing', value: 2 },
	{ label: 'Intransit', value: 3 },
	{ label: 'Delivered', value: 4 },
	{ label: 'Completed', value: 5 },
	{ label: 'Cancelled', value: 6 },
];

const formSchema = z.object({
	supplier: z.string(),
	so_id: z.string(),
	deliveryTerms: z.number(),
	paymentTerms: z.number(),
	deliveryMode: z.string(),
	termsAndConditions: z.string(),
	remarks: z.string(),
	comments: z.string(),
	status: z.string(),
});

export interface ProductCell {
	id: number;
	name: string;
	hsnCode: string;
	quantity: number;
	unit: string;
	rate: number;
	amount: number;
	discount: number;
	netAmount: number;
	cgst: number;
	sgst: number;
	igst: number;
}

export default function CreatePOForm(data: any, listPO: any): JSX.Element {
	const [products, setProducts] = useState<ProductCell[]>([]);
	const [productList, setProductList] = useState([]);
	console.log(data.data.purchased_items);

	useEffect(() => {
		const productsData = data.data.purchased_items.map((product: any) => ({
			id: product.id,
			name: product.product.name,
			hsnCode: product.product.hsn,
			quantity: product.quantity,
			unit: 'pcs',
			rate: product.unit_price,
			amount: product.quantity * parseFloat(product.unit_price),
			discount: 0,
			netAmount:
				product.quantity * parseFloat(product.unit_price) +
				(100 +
					parseFloat(product.product.cgst) +
					parseFloat(product.product.sgst) +
					parseFloat(product.product.igst)) /
					100,
			cgst: parseFloat(product.product.cgst),
			sgst: parseFloat(product.product.sgst),
			igst: parseFloat(product.product.igst),
		}));
		setProducts(productsData);
	}, [data.data.purchased_items]);



	const { mutate: updatePurchaseOrder} = updatePurchaseOrderMutation(
		(data: any) => {
			
			toast('Purchase Order updated successfully');
			listPO();
		},
		(error: any) => {
			console.log(error);
		}
	);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	function onSubmit(values: z.infer<typeof formSchema>): void {
		try {
			const status = SHIPMENT_STATUS_CHOICES.find(
				(status) => status.label === values.status
			);
			const data_send = {
				order_id :  data.data.id,
				status: status?.value,
				
			};
			updatePurchaseOrder(data_send);
		} catch (error) {
			console.error('Form submission error', error);
			toast('Failed to submit the form. Please try again.');
		}
	}
	


	useEffect(() => {
		const fetchData = async () => {
			// await searchCustomer(null);
		};
		fetchData();
	}, []);

	return (
		<div>
			<Form {...form}>
				<form
					// onSubmit={form.handleSubmit(onSubmit)}
					className='p-2 grid grid-cols-3 gap-2 '
				>
					<FormField
						control={form.control}
						name='so_id'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Sales Order</FormLabel>
								<FormControl
									onChange={(e) => {
										field.onChange(e);
										// getData();
									}}
								>
									{/* <FormControl> */}
									<Input
										placeholder=''
										type='string'
										disabled={true}
										defaultValue={data.data.sales_order}
										// {...field}
									/>
									{/* </FormControl> */}
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='supplier'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Supplier</FormLabel>
								<FormControl
									onChange={(e) => {
										field.onChange(e);
										// getData();
									}}
								>
									{/* <FormControl> */}
									<Input
										placeholder=''
										type='string'
										disabled={true}
										defaultValue={data.data.supplier}
										// {...field}
									/>
									{/* </FormControl> */}
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* <FormField
						control={form.control}
						name='deliveryTerms'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Delivery Time</FormLabel>
								<FormControl>
									<Input
										placeholder='in days'
										type='number'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='paymentTerms'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Payment Time</FormLabel>
								<FormControl>
									<Input
										placeholder='in days'
										type='number'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/> */}
					{/* <FormField
						control={form.control}
						name='deliveryMode'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mode of Delivery</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='m@example.com'>
											m@example.com
										</SelectItem>
										<SelectItem value='m@google.com'>
											m@google.com
										</SelectItem>
										<SelectItem value='m@support.com'>
											m@support.com
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/> */}
					<POFormProductForm
						products={products}
						setProducts={setProducts}
						productList={productList}
					/>
					<FormField
						name='termsAndConditions'
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Terms Ans Conditions</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										rows={8}
										className='w-full p-2 border rounded'
										disabled={true}
										defaultValue={data.data.terms}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='remarks'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Remarks</FormLabel>
								<FormControl>
									<Input
										placeholder=''
										type=''
										{...field}
										disabled={true}
										defaultValue={data.data.remarks}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='comments'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Comments</FormLabel>
								<FormControl>
									<Input
										placeholder=''
										type=''
										{...field}
										disabled={true}
										defaultValue={data.data.comment}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='status'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Status</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={data.data.order_status}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Shipment Status' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										
											{SHIPMENT_STATUS_CHOICES.map((status:any) => (
												<SelectItem value={status.label}>
													{status.label}
												</SelectItem>
											))}
									
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						className='col-span-3'
						onClick={() => {
							onSubmit(form.getValues());
						}}
						type='submit'
					>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
