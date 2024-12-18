'use client';

import React, { type JSX, useEffect, useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableFooter,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { type ProductCell } from './CreatePOForm';
// import { searchProductMutation } from '@/hooks/products';

const displayCost = (cost: number): string => {
	// Convert to two decimal places
	let val = `${cost.toFixed(2)}`;

	// Add commas as per the Indian numbering system
	val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

	console.log(val);

	val = val.replace(/(\d+)(?=(\d{2}){1,2}\.)/g, (match, p1) => {
		const parts = p1.split(/(?=(?:\d{2})+(?:\.\d{0,2})?$)/);
		return parts.join(',');
	});

	return val;
};
const POFormProductForm = ({
	products,
	setProducts,
	productList,
}: {
	products: any;
	setProducts: any;
	productList: any;
}): JSX.Element => {
	const [newProduct, setNewProduct] = React.useState<any>({
		id: 0,
		name: '',
		hsn: '',
		quantity: 0,
		unit: '',
		rate: 0,
		amount: 0,
		discount: 0,
		netAmount: 0,
		cgst: 0,
		sgst: 0,
		igst: 0,
	});

	// const handleInputChange = (
	// 	e: React.ChangeEvent<HTMLInputElement>
	// ): void => {
	// 	const { name, value } = e.target;
	// 	const data = { ...newProduct };
	// 	data[name] = value;
	// 	data['amount'] = data.quantity * data.rate;
	// 	data['netAmount'] = data['amount'] * (1 - data.discount / 100);
	// 	setNewProduct(data);
	// 	console.log(newProduct, name, value);
	// };

	// const handleSelectChange = (value: string): void => {
	// 	const product = productList.find(
	// 		(product: any) => product.name === value
	// 	);

	// 	console.log(product);
	// 	setNewProduct((prev:any) => ({
	// 		...prev,
	// 		name: product.name,
	// 		hsn: product.hsn,
	// 		id: product.id,
	// 		cgst: product.cgst,
	// 		sgst: product.sgst,
	// 		igst: product.igst,
	// 	}));
	// };

	// const handleSubmit = (e: React.FormEvent): void => {
	// 	e.preventDefault()
	// 	setProducts((prev) => [...prev, newProduct])
	// 	setNewProduct({
	// 		id: 0,
	// 		name: "",
	// 		hsn: "",
	// 		quantity: 0,
	// 		unit: "",
	// 		rate: 0,
	// 		amount: 0,
	// 		discount: 0,
	// 		netAmount: 0,
	// 		cgst: 0,
	// 		sgst: 0,
	// 		igst: 0
	// 	})
	// }

	return (
		<Card className='rounded-sm p-2 col-span-3'>
			<Table className='border border-collapse'>
				<TableCaption>
					{/* <Button onClick={handleSubmit} >Add Product</Button> */}
				</TableCaption>
				<TableHeader className='bg-accent'>
					<TableRow>
						<TableHead className='border text-left'>
							Description of Goods
						</TableHead>
						<TableHead className='border text-left'>HSN</TableHead>
						<TableHead className='border text-right'>Qty</TableHead>
						<TableHead className='border text-right'>
							Unit
						</TableHead>
						<TableHead className='border text-right'>
							Rate
						</TableHead>
						<TableHead className='border text-right'>
							Amount
						</TableHead>
						<TableHead className='border text-right'>
							Disc %
						</TableHead>
						<TableHead className='border text-center'>
							CGST
							<Separator />
							<div className='grid grid-cols-3'>
								<div className='pr-1 border-r'>%</div>
								<div className='col-span-2 pl-1'>Amt</div>
							</div>
						</TableHead>
						<TableHead className='border text-right'>
							SGST
							<Separator />
							<div className='grid grid-cols-3'>
								<div className='pr-1 border-r'>%</div>
								<div className='col-span-2 pl-1'>Amt</div>
							</div>
						</TableHead>
						<TableHead className='border text-right'>
							IGST
							<Separator />
							shou
							<div className='grid grid-cols-3'>
								<div className='pr-1 border-r'>%</div>
								<div className='col-span-2 pl-1'>Amt</div>
							</div>
						</TableHead>
						<TableHead className='border text-right'>
							Net Amt
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{products.map((product:any) => (
						<TableRow key={product.id}>
							<TableCell className='border text-left'>
								{product.name}
							</TableCell>
							<TableCell className='border text-left'>
								{product.hsn}
							</TableCell>
							<TableCell className='border text-right'>
								{product.quantity}
							</TableCell>
							<TableCell className='border text-right'>
								{product.unit}
							</TableCell>
							<TableCell className='border text-right'>
								{product.rate}
							</TableCell>
							<TableCell className='border text-right'>
								{displayCost(product.amount)}
							</TableCell>
							<TableCell className='border text-right'>
								{product.discount}
							</TableCell>
							<TableCell className='border text-right'>
								<div className='grid grid-cols-3'>
									<div className='pr-1 border-r'>
										{product.cgst}
									</div>
									<div className='col-span-2 pl-1'>
										{displayCost(
											(product.cgst * product.netAmount) /
												100
										)}
									</div>
								</div>
							</TableCell>
							<TableCell className='border text-right'>
								<div className='grid grid-cols-3'>
									<div className='pr-1 border-r'>
										{product.sgst}
									</div>
									<div className='col-span-2 pl-1'>
										{displayCost(
											(product.sgst * product.netAmount) /
												100
										)}
									</div>
								</div>
							</TableCell>
							<TableCell className='border text-right'>
								<div className='grid grid-cols-3'>
									<div className='pr-1 border-r'>
										{product.igst}
									</div>
									<div className='col-span-2 pl-1'>
										{displayCost(
											(product.igst * product.netAmount) /
												100
										)}
									</div>
								</div>
							</TableCell>
							<TableCell className='border text-right'>
								{displayCost(
									product.netAmount *
										(1 +
											(product.igst +
												product.sgst +
												product.cgst) /
												100)
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
};

export default POFormProductForm;
