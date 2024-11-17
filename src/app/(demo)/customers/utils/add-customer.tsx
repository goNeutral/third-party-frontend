'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
	Form,
	FormControl,
	FormDescription,
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

const formSchema = z.object({
	customerName: z.string(),
	registeredEntityName: z.string(),
	registeredAddress: z.string(),
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
	geotaggedImage: z
		.instanceof(File)
		.refine(
			(file) => file.size < 5 * 1024 * 1024,
			'File size must be less than 5MB'
		),
});

export default function AddCustomerForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			console.log(values);
			toast(
				<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4 '>
					<code className='text-white'>
						{JSON.stringify(values, null, 2)}
						{ values.gstFile instanceof File ? values.gstFile.name : '' }
						{ values.aadharFile instanceof File ? values.gstFile.name : '' }
						{ values.panFile instanceof File ? values.gstFile.name : '' }
						{ values.geotaggedImage instanceof File ? values.gstFile.name : '' }
					</code>
				</pre>
			);
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
					name='customerName'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Customer Name</FormLabel>
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
					<FormField
						control={form.control}
						name='geotaggedImage'
						render={({ field: { value, onChange, ...fieldProps } }) => {
							return (
								<div className='py-2 px-4 border-2 gap-2 border-dashed rounded flex flex-row'>
									<FormItem className='flex flex-row gap-2 items-center justify-between'>
										<FormLabel className=''>GeoTagged</FormLabel>
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
