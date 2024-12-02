'use client';
import React, { useState, useEffect,useRef } from 'react';
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
import { updateSupplierMutation,deletSupplierMutation } from '@/hooks/suppliers';
import { GetState } from 'react-country-state-city';

const formSchema = z.object({
	supplierName: z.string(),
	registeredEntityName: z.string(),
	registeredAddress: z.string(),
	phone: z.string(),
	email: z.string(),
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

export default function EditSupplierForm({ supplier }: { supplier: any }): JSX.Element {
	const [State, setState] = useState<any>([]);
	const [adhar,setAdhar] = useState<any>();
	const adharRef = useRef<HTMLInputElement>(null);
	const [gst,setGst] = useState<any>();
	const gstRef = useRef<HTMLInputElement>(null);
	const [pan,setPan] = useState<any>();
	const panRef = useRef<HTMLInputElement>(null);
		useEffect(() => {
		async function getAadharFile(){
			try {
				const response = await fetch(supplier.aadhar_file);
				
				const blob = await response.blob();
				const fileName = supplier.aadhar_file.split("/").pop(); // Extract filename from URL
				const file = new File([blob], fileName, { type: blob.type });
				setAdhar(file);
				
			  } catch (error) {
				console.error("Error fetching file:", error);
			  }

		}
		async function getGstFile(){
			try {
				const response = await fetch(supplier.gst_file);
			
				const blob = await response.blob();
				const fileName = supplier.gst_file.split("/").pop(); // Extract filename from URL
				const file = new File([blob], fileName, { type: blob.type });
				setGst(file);
			
			  } catch (error) {
				console.error("Error fetching file:", error);
			  }

		}
		async function getPanFile(){
			try {
				const response = await fetch(supplier.pan_file);
			
				const blob = await response.blob();
				const fileName = supplier.pan_file.split("/").pop(); // Extract filename from URL
				const file = new File([blob], fileName, { type: blob.type });
				setPan(file);
		
			  } catch (error) {
				console.error("Error fetching file:", error);
			  }

		}
		async function fetchData() {
			const data = await GetState(101);

			setState(data);
		}
		if(supplier?.aadhar_file){
			getAadharFile()
		}
		if(supplier?.pan_file){
			getPanFile()
		}
		if(supplier?.gst_file){
			getGstFile()
		}
		fetchData();
	}, [supplier]);

	useEffect(() => {
		if (adharRef.current && adhar) {
			const dataTransfer = new DataTransfer();

			dataTransfer.items.add(adhar);
			adharRef.current.files = dataTransfer.files;
		}
	}, [adhar])
	

	const { mutate: updateSupplier } =  updateSupplierMutation(
		(res: any) => {
			toast.success('Supplier created successfully');
		},
		(err: any) => {
			console.error('Create Supplier Error:', err);
			toast.error('Failed to create Supplier');
		}
	);

	const {mutate:deletSupplier} = deletSupplierMutation(
		(res:any)=>{
			toast.success('Supplier deleted successfully');
		},
		(res:any)=>{
			toast.error('Failed to remove Supplier');
		}
	)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
		try {
			console.log("Received values:", values);
			if (!supplier?.id) {
				console.error("Supplier ID is missing");
				toast.error("Supplier ID is missing");
				return;
			}
	
			let data = new FormData(supplier);
			data.append('id', supplier.id );
			data.append('name', values?.supplierName || supplier?.name );
			// data.append('registered_name', values.registeredEntityName || '');
			// data.append('address', values.registeredAddress || '');
			// data.append('city', values.city || '');
			// data.append('state', values.state || '');
			// data.append('pincode', values.pincode || '');
			// data.append('gst', values.gstNumber || '');
			// data.append('aadhar', values.aadharNumber || '');
			// data.append('pan', values.panNumber || '');
			// data.append('gst_status', values.gstStatus || '');
			// if (values.gstFile) data.append('gst_file', values.gstFile);
			// if (values.aadharFile) data.append('aadhar_file', values.aadharFile);
			// if (values.panFile) data.append('pan_file', values.panFile);
			// data.append('phone', values.phone || '');
			// data.append('email', values.email || '');
	
			// console.log("Constructed FormData:");
			// data.forEach((value, key) => {
			// 	console.log(`${key}:`, value);
			// });
			console.log("pre sub",data)
			await updateSupplier(data);
			toast.success("Supplier updated successfully!");
		} catch (error) {
			console.error("Form submission error:", error);
			toast.error("Failed to submit the form. Please try again.");
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
								<Input defaultValue={supplier?.name} placeholder='' type='' {...field} />
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
								<Input defaultValue={supplier?.registered_name} placeholder='' type='' {...field} />
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
								<Input defaultValue={supplier?.phone} placeholder='' type='' {...field} />
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
								<Input defaultValue={supplier.email}  placeholder='' type='' {...field} />
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
								<Textarea defaultValue={supplier.address} placeholder='' {...field} />
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
								defaultValue={supplier.state}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{State.map((state: any) => (
										<SelectItem
											key={state.id}
											value={state.name}
										>
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
								<Input defaultValue={supplier.city} placeholder='' type='' {...field} />
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
									defaultValue={ supplier?.pincode}
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
								<Input defaultValue={supplier?.gst} placeholder='' type='' {...field} />
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
							<FormLabel>adhar Number</FormLabel>
							<FormControl>
								<Input defaultValue={supplier.aadhar} placeholder='' type='' {...field} />
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
								<Input defaultValue={supplier?.pan} placeholder='' type='' {...field} />
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
								defaultValue={supplier.gst_status}
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
					<h3 className='text-base font-semibold col-span-2'>
						Upload Documents
					</h3>
					<FormField
						control={form.control}
						name='gstFile'
						render={({
							field: { value, onChange, ...fieldProps },
						}) => {
							return (
								<div className='py-2 px-4 border-2 gap-2 border-dashed rounded flex flex-row'>
									<FormItem className='flex flex-row gap-2 items-center justify-between'>
										<FormLabel className=''>GST</FormLabel>
										<FormControl>
											<Input
												{...fieldProps}
												type='file'
												onChange={(e) => {
													onChange(
														e?.target.files?.[0]
													);
												}}
												className=''
												defaultValue={gst}
												
												// {...fileRef}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
									{value instanceof File && (
										<img
											src={URL.createObjectURL(value)}
											width={100}
											height={100}
										/>
									)}
									{gst && (
										<img
											src={URL.createObjectURL(gst)}
											width={100}
											height={100}
										/>
									)}
								</div>
							);
						}}
					/>
					<FormField
						control={form.control}
						name='aadharFile'
						render={({
							field: { value, onChange, ...fieldProps },
						}) => {
							return (
								<div className='py-2 px-4 border-2 gap-2 border-dashed rounded flex flex-row'>
									<FormItem className='flex flex-row gap-2 items-center justify-between'>
										<FormLabel className=''>
											adhar
										</FormLabel>
										<FormControl>
											<Input
												{...fieldProps}
												type='file'
												onChange={(e) => {
													onChange(
														e?.target.files?.[0]
														
													);
													setAdhar()
												}}
												className=''
												// ref={adharRef}
												defaultValue={adhar}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
									{value instanceof File && (
										<img
											src={URL.createObjectURL(value)}
											width={100}
											height={100}
										/>
									)}
									{adhar && (
										<img
											src={URL.createObjectURL(adhar)}
											width={100}
											height={100}
										/>
									)}
								</div>
							);
						}}
					/>
					<FormField
						control={form.control}
						name='panFile'
						render={({
							field: { value, onChange, ...fieldProps },
						}) => {
							return (
								<div className='py-2 px-4 border-2 gap-2 border-dashed rounded flex flex-row'>
									<FormItem className='flex flex-row gap-2 items-center justify-between'>
										<FormLabel className=''>PAN</FormLabel>
										<FormControl>
											<Input
												{...fieldProps}
												type='file'
												onChange={(e) => {
													onChange(
														e?.target.files?.[0]
													);
												}}
												className=''
												defaultValue={pan}
												// {...fileRef}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
									{value instanceof File && (
										<img
											src={URL.createObjectURL(value)}
											width={100}
											height={100}
										/>
									)}
									{pan && (
										<img
											src={URL.createObjectURL(pan)}
											width={100}
											height={100}
										/>
									)}
								</div>
							);
						}}
					/>
				</div>
				
			</form>
			<div className='flex w-full mt-10 justify-center gap-5' >
				<Button className='w-[45%]' onClick={()=>{
					onSubmit( form.getValues()
						
					)
				}} >Update</Button><Button className='w-[45%]' onClick={()=>{
					console.log(supplier)
					deletSupplier(supplier.id)
				}} >Delete</Button>
				</div>
		</Form>
	);
}
