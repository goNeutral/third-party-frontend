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
// import displayCost from '@/utils/display;
import { type ProductCell } from './CreatePOForm';
// import { searchProductMutation } from '@/hooks/products';
const displayCost = (cost:Number) => {
	// Convert to two decimal places
	let val = `${cost.toFixed(2)}`;
	console.log(val)
  
	// Add commas as per the Indian numbering system
	val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	console.log(val)

	val = val.replace(/(\d+)(?=(\d{2}){1,2}\.)/g, (match, p1) => {
	  const parts = p1.split(/(?=(?:\d{2})+(?:\.\d{0,2})?$)/);
	  return parts.join(",");
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
		// const [productList, setProductList] = useState<any>([]);

	//   const { mutate: searchProduct } = searchProductMutation(
	//     (data: any) => {
	//       setProductList(data.data);
	//       console.log(data);
	//     },
	//     (error: any) => {
	//       console.log(error);
	//     }
	//   );

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		await searchProduct(null);
	// 	};
	// 	fetchData();
	// }, []);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		const { name, value } = e.target;
		const data = { ...newProduct };
		data[name] = value;
		data['amount'] = data.quantity * data.rate;
		data['netAmount'] = data['amount'] * (1 - data.discount / 100);
		setNewProduct(data);
		console.log(newProduct, name, value);
	};

	const handleSelectChange = (value: string): void => {
		const product = productList.find(
			(product: any) => product.name === value
		);

		console.log(product);
		setNewProduct((prev:any) => ({
			...prev,
			name: product.name,
			hsn: product.hsn,
			id: product.id,
			cgst: product.cgst,
			sgst: product.sgst,
			igst: product.igst,
		}));
	};

	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault();
		setProducts((prev:any) => [...prev, newProduct]);
		setNewProduct({
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
	};

	return (
		<Card className='rounded-sm p-2 col-span-3'>
			<Table className='border border-collapse'>
				<TableCaption>
					<Button onClick={handleSubmit}>Add Product</Button>
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
						<TableRow key={product?.id}>
							<TableCell className='border text-left'>
								{product?.name}
							</TableCell>
							<TableCell className='border text-left'>
								{product?.hsn}
							</TableCell>
							<TableCell className='border text-right'>
								{product?.quantity}
							</TableCell>
							<TableCell className='border text-right'>
								{product?.unit}
							</TableCell>
							<TableCell className='border text-right'>
								{product?.rate}
							</TableCell>
							<TableCell className='border text-right'>
								{displayCost(product?.amount)}
							</TableCell>
							<TableCell className='border text-right'>
								{product?.discount}
							</TableCell>
							<TableCell className='border text-right'>
								<div className='grid grid-cols-3'>
									<div className='pr-1 border-r'>
										{product?.cgst}
									</div>
									<div className='col-span-2 pl-1'>
										{displayCost(0.01*product?.cgst * product?.netAmount)}
									</div>
								</div>
							</TableCell>
							<TableCell className='border text-right'>
								<div className='grid grid-cols-3'>
									<div className='pr-1 border-r'>
										{product?.sgst}
									</div>
									<div className='col-span-2 pl-1'>
										{ displayCost(0.01 * product?.sgst * product?.netAmount)}
									</div>
								</div>
							</TableCell>
							<TableCell className='border text-right'>
								<div className='grid grid-cols-3'>
									<div className='pr-1 border-r'>
										{product?.igst}
									</div>
									<div className='col-span-2 pl-1'>
										{displayCost(0.01*product?.igst * product?.netAmount)}
									</div>
								</div>
							</TableCell>
							<TableCell className='border text-right'>
							{displayCost(
									product?.netAmount + (0.01*product?.igst * product?.netAmount) + (0.01*product?.sgst * product?.netAmount) + (0.01*product?.cgst * product?.netAmount)
									// (product?.igst + product?.sgst + product?.cgst)
								)}
							</TableCell>
						</TableRow>
					))}
					<TableRow>
						<TableCell colSpan={2} className='border text-left'>
							<Select
								onValueChange={handleSelectChange}
								value={newProduct.name}
							>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Select product' />
								</SelectTrigger>
								<SelectContent>
									{productList.map((product: any) => (
										<SelectItem
											key={product.id}
											value={product.name}
										>
											{product.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</TableCell>

						<TableCell className='border text-right'>
							<Input
								type='text'
								name='quantity'
								value={newProduct.quantity}
								onChange={handleInputChange}
								placeholder='quantity'
							/>
						</TableCell>
						<TableCell className='border text-right'>
							<Select
								onValueChange={(data) => {
									setNewProduct((prev: any) => ({
										...prev,
										unit: data,
									}));
								}}
								value={newProduct.unit}
							>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Unit' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='kg'>kg</SelectItem>
									<SelectItem value='ton'>ton</SelectItem>
									<SelectItem value='pcs'>pcs</SelectItem>
								</SelectContent>
							</Select>
						</TableCell>
						<TableCell className='border text-right'>
							<Input
								type='text'
								name='rate'
								value={newProduct.rate}
								onChange={handleInputChange}
								placeholder=''
							/>
						</TableCell>
						<TableCell className='border text-right'></TableCell>
						<TableCell className='border text-right'>
							<Input
								type='text'
								name='discount'
								value={newProduct.discount}
								onChange={handleInputChange}
								placeholder='discount percentage'
							/>
						</TableCell>
						<TableCell className='border text-right'></TableCell>
						<TableCell colSpan={3} />
					</TableRow>
				</TableBody>
				{/* <TableFooter>
					<TableRow>
						<TableCell
							className='border text-right'
							colSpan={7}
						></TableCell>
						<TableCell className='border text-right'>
							20.00
						</TableCell>
						<TableCell className='border text-right'>
							20.00
						</TableCell>
						<TableCell className='border text-right'>
							20.00
						</TableCell>
						<TableCell className='border text-right'>
							2,500.00
						</TableCell>
					</TableRow>
					<TableRow className='border bg-muted font-bold'>
						<TableCell colSpan={10}>Total</TableCell>
						<TableCell className='border text-right'>
							2500.00
						</TableCell>
					</TableRow>
				</TableFooter> */}
			</Table>
		</Card>
	);
};

export default POFormProductForm;
