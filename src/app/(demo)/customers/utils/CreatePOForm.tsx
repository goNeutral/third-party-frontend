'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
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
import { searchCustomerMutation } from '@/hooks/customer';
import { createSalesOrderMutation } from '@/hooks/customer';

const formSchema = z.object({
	supplier: z.string(),
	shipTo: z.string(),
	deliveryTerms: z.number(),
	paymentTerms: z.number(),
	deliveryMode: z.string(),
	termsAndConditions: z.string(),
	remarks: z.string(),
	comments: z.string(),
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

export default function CreatePOForm(): JSX.Element {
	const [products, setProducts] = useState<ProductCell[]>([]);

	const { mutate: createSalesOrder } = createSalesOrderMutation(
		(data: any) => {
			console.log(data);
		},
		(error: any) => {
			console.log(error);
		}
	);

	const defaultTerms = `Point 1: First term of delivery
	Point 2: Second term of delivery
	Point 3: Third term of delivery
	Point 4: Fourth term of delivery`;

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	function onSubmit(values: z.infer<typeof formSchema>): void {
		try {
			console.log('Form submitted', values);

			toast.success('Form submitted successfully	');
			const productsData = products.map((product) => ({
				product: product.id,
				quantity: product.quantity,
				unit_price: product.rate,
				unit: product.unit,
			}));
			const cust = customerList.find(
				(customer: any) => customer.name === values.shipTo
			) || { id: '' };
			console.log(cust);
			const salesData = {
				customer: cust?.id,
				// order_dte in yyyy-mm-dd format

				order_date: new Date().toISOString().split('T')[0],
				total_amount: products.reduce(
					(acc, product) => acc + product.netAmount,
					0
				),
				terms: values.termsAndConditions,
				remarks: values.remarks,
				coment: values.comments,
			};
			createSalesOrder({
				products: productsData,
				sales_order: salesData,
			});
		} catch (error) {
			console.error('Form submission error', error);
			toast.error('Failed to submit the form. Please try again.');
		}
	}
	const [customerList, setCustomerList] = useState([]);
	const { mutate: searchCustomer } = searchCustomerMutation(
		(data: any) => {
			setCustomerList(data.data);
			console.log(data);
		},
		(error: any) => {
			console.log(error);
		}
	);

	useEffect(() => {
		const fetchData = async () => {
			await searchCustomer(null);
		};
		fetchData();
	}, []);

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='p-2 grid grid-cols-3 gap-2 '
				>
					<FormField
						control={form.control}
						name='shipTo'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ship To</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select customer' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{customerList.map((customer: any) => (
											<SelectItem
												key={customer.id}
												value={customer.name}
											>
												{customer.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
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
										defaultValue={defaultTerms}
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
									<Input placeholder='' type='' {...field} />
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
									<Input placeholder='' type='' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className='col-span-3' onClick={()=>{
						onSubmit(form.getValues())
					}} type='submit'>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
