'use client';
import React, { useState,useEffect } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {createSupplierMutation} from "@/hooks/suppliers"
import {
	GetState,

  } from "react-country-state-city";
  
  const formSchema = z.object({
	supplierName: z.string(),
	registeredEntityName: z.string(),
	registeredAddress: z.string(),
	phone: z.string(),
	email:z.string(),
	city: z.string(),
	state: z.string(),
	pincode: z.string(),
	gstNumber: z.string(),
	aadharNumber: z.string(),
	panNumber: z.string(),
	gstStatus: z.string(),
	gstFile: z
		.instanceof(File)
		.refine(
			(file) => file.size < 5 * 1024 * 1024,
			'File size must be less than 5MB'
		),
	aadharFile: z
		.instanceof(File)
		.refine(
			(file) => file.size < 5 * 1024 * 1024,
			'File size must be less than 5MB'
		),
	panFile: z
		.instanceof(File)
		.refine(
			(file) => file.size < 5 * 1024 * 1024,
			'File size must be less than 5MB'
		),
	// geotaggedImage: z
	// 	.instanceof(File)
	// 	.refine(
	// 		(file) => file.size < 5 * 1024 * 1024,
	// 		'File size must be less than 5MB'
	// 	),
});

export default function AddSupplierForm({CallBack}: {CallBack: any}): JSX.Element {
	const [State, setState] = useState<any>([])
	
	useEffect(() => {
		async function fetchData() {
		  const data = await GetState(101);
		  console.log("ins data",data)
		  setState(data);
		}
		fetchData();
	  }, []);
  
		  
	  
  
  
	  const {mutate:createSupplier} = createSupplierMutation(
		  (res:any) => {
			CallBack()
			  toast.success('Supplier created successfully');
			//   successCallBack()
		  },
		  (err:any) => {
			  console.error("Create Supplier Error:", err);
			  toast.error('Failed to create Supplier');
		  }
	  );

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	function onSubmit(values: z.infer<typeof formSchema>): void {
		try {
			const data = new FormData();
			data.append('name', values.supplierName);
			data.append('registered_name', values.registeredEntityName);
			data.append('address', values.registeredAddress);
			data.append('city', values.city);
			data.append('state', values.state);
			data.append('pincode', values.pincode);
			data.append('gst', values.gstNumber);
			data.append('aadhar', values.aadharNumber);
			data.append('pan', values.panNumber);
			data.append('gst_status', values.gstStatus);
			data.append('gst_file', values.gstFile);
			data.append('aadhar_file', values.aadharFile);
			data.append('pan_file', values.panFile);
			data.append('phone', values.phone);
			data.append('email', values.email);
		

			createSupplier(data);
			console.log(JSON.stringify(values, null, 2));
		} catch (error) {
			console.error('Form submission error', error);
			toast.error('Failed to submit the form. Please try again.');
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid grid-cols-3 gap-4'
			>
				<FormField
					control={form.control}
					name='supplierName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Supplier Name</FormLabel>
							<FormControl>
								<Input placeholder='' type='' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

<FormField
					control={form.control}
					name='registeredEntityName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Registered Entity Name</FormLabel>
							<FormControl>
								<Input placeholder='' type='' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
								<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone No</FormLabel>
							<FormControl>
								<Input placeholder='' type='' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email ID</FormLabel>
							<FormControl>
								<Input placeholder='' type='' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='registeredAddress'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Registered Address</FormLabel>
							<FormControl>
								<Textarea placeholder='' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

<FormField
					control={form.control}
					name='state'
					render={({ field }) => (
						<FormItem>
							<FormLabel>State</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{State.map((state:any) => (
										<SelectItem key={state.id} value={state.name}>
											{state.name}
										</SelectItem>
									))}
								
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='city'
					render={({ field }) => (
						<FormItem>
							<FormLabel>City</FormLabel>
							<FormControl>
								<Input placeholder='' type='' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				

				<FormField
					control={form.control}
					name='pincode'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Pincode</FormLabel>
							<FormControl>
								<Input
									placeholder=''
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
					name='gstNumber'
					render={({ field }) => (
						<FormItem>
							<FormLabel>GST Number</FormLabel>
							<FormControl>
								<Input placeholder='' type='' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='aadharNumber'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Aadhar Number</FormLabel>
							<FormControl>
								<Input placeholder='' type='' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='panNumber'
					render={({ field }) => (
						<FormItem>
							<FormLabel>PAN Number</FormLabel>
							<FormControl>
								<Input placeholder='' type='' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='gstStatus'
					render={({ field }) => (
						<FormItem>
							<FormLabel>GST Status</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value='Verified'>
										Verifed
									</SelectItem>
									<SelectItem value='Canceled'>
										Canceled
									</SelectItem>
									<SelectItem value='Pending'>
										Pending
									</SelectItem>
								</SelectContent>
							</Select>

							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='col-span-3 grid grid-cols-2 gap-4'>
					<h3 className='text-base font-semibold col-span-2'>Upload Documents</h3>
					<FormField
						control={form.control}
						name='gstFile'
						render={({ field: { value, onChange, ...fieldProps } }) => {
							return (
								<div className='py-2 px-4 border-2 gap-2 border-dashed rounded flex flex-row'>
									<FormItem className='flex flex-row gap-2 items-center justify-between'>
										<FormLabel className=''>GST</FormLabel>
										<FormControl>
											<Input
												{...fieldProps}
												type='file'
												onChange={(e) => {
													onChange(e?.target.files?.[0]);
												}}
												className=''
												// {...fileRef}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
									{value instanceof File && <img src={URL.createObjectURL(value)} width={100} height={100} />}
								</div>

							);
						}}
					/>
					<FormField
						control={form.control}
						name='aadharFile'
						render={({ field: { value, onChange, ...fieldProps } }) => {
							return (
								<div className='py-2 px-4 border-2 gap-2 border-dashed rounded flex flex-row'>
									<FormItem className='flex flex-row gap-2 items-center justify-between'>
										<FormLabel className=''>Aadhar</FormLabel>
										<FormControl>
											<Input
												{...fieldProps}
												type='file'
												onChange={(e) => {
													onChange(e?.target.files?.[0]);
												}}
												className=''
												// {...fileRef}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
									{value instanceof File && <img src={URL.createObjectURL(value)} width={100} height={100} />}
								</div>

							);
						}}
					/>
					<FormField
						control={form.control}
						name='panFile'
						render={({ field: { value, onChange, ...fieldProps } }) => {
							return (
								<div className='py-2 px-4 border-2 gap-2 border-dashed rounded flex flex-row'>
									<FormItem className='flex flex-row gap-2 items-center justify-between'>
										<FormLabel className=''>PAN</FormLabel>
										<FormControl>
											<Input
												{...fieldProps}
												type='file'
												onChange={(e) => {
													onChange(e?.target.files?.[0]);
												}}
												className=''
												// {...fileRef}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
									{value instanceof File && <img src={URL.createObjectURL(value)} width={100} height={100} />}
								</div>

							);
						}}
					/>
					
				</div>
				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	);
}
