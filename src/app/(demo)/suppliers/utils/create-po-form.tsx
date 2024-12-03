import React, { useState } from 'react';
import { PlusCircle, Trash2, FileDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import ReactPDF, { PDFDownloadLink, PDFViewer } from '@alexandernanberg/react-pdf-renderer';
import ProductOrderPDF from './ProductOrderPDF';

const OrderForm = () => {
	// Sample data for dropdowns
	const suppliers = [
		{ id: 1, name: 'Supplier 1' },
		{ id: 2, name: 'Supplier 2' },
		{ id: 3, name: 'Supplier 3' },
	];

	const addresses = [
		{ id: 1, address: '123 Main St, City 1' },
		{ id: 2, address: '456 Oak St, City 2' },
		{ id: 3, address: '789 Pine St, City 3' },
	];

	const [customer, setCustomer] = useState({
		supplier: '',
		billToAddress: '',
		shipToAddress: '',
		paymentTerms: '',
		deliveryTerms: '',
	});

	const [products, setProducts] = useState<any[]>([]);
	const [currentProduct, setCurrentProduct] = useState({
		description: '',
		hsnCode: '',
		quantity: '',
		rate: '',
		amount: '',
		discount: '0',
		cgst: '0',
		sgst: '0',
		igst: '0',
	});

	const handleCustomerChange = (e:any) => {
		const { name, value } = e.target;
		setCustomer((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSelectChange = (value: string, field: string) => {
		setCustomer((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const calculateAmount = (quantity: number, rate: number, discount = 0) => {
		const baseAmount = quantity * rate;
		return baseAmount - baseAmount * (discount / 100);
	};

	const handleProductChange = (e:any) => {
		const { name, value } = e.target;
		setCurrentProduct((prev) => {
			const newProduct = {
				...prev,
				[name]: value,
			};

			if (name === 'quantity' || name === 'rate' || name === 'discount') {
				const amount = calculateAmount(
					parseFloat(name === 'quantity' ? value : prev.quantity) ||
						0,
					parseFloat(name === 'rate' ? value : prev.rate) || 0,
					parseFloat(name === 'discount' ? value : prev.discount) || 0
				);
				newProduct.amount = amount.toFixed(2);
			}

			return newProduct;
		});
	};

	const addProduct = () => {
		if (
			currentProduct.description &&
			currentProduct.quantity &&
			currentProduct.rate
		) {
			setProducts((prev:any) => [
				...prev,
				{ ...currentProduct, id: Date.now() },
			]);
			setCurrentProduct({
				description: '',
				hsnCode: '',
				quantity: '',
				rate: '',
				amount: '',
				discount: '0',
				cgst: '0',
				sgst: '0',
				igst: '0',
			});
		}
	};

	const removeProduct = (id:any) => {
		setProducts((prev) => prev.filter((product) => product.id !== id));
	};

	const calculateTotals = () => {
		return products.reduce(
			(acc, product) => {
				const amount = parseFloat(product.amount) || 0;
				const cgst = amount * (parseFloat(product.cgst) / 100);
				const sgst = amount * (parseFloat(product.sgst) / 100);
				const igst = amount * (parseFloat(product.igst) / 100);

				return {
					subTotal: acc.subTotal + amount,
					totalCGST: acc.totalCGST + cgst,
					totalSGST: acc.totalSGST + sgst,
					totalIGST: acc.totalIGST + igst,
					grandTotal: acc.grandTotal + amount + cgst + sgst + igst,
				};
			},
			{
				subTotal: 0,
				totalCGST: 0,
				totalSGST: 0,
				totalIGST: 0,
				grandTotal: 0,
			}
		);
	};

	const generatePDF = () => {
		const totals = calculateTotals();
		const orderData = {
			orderNumber: `PO-${Date.now()}`,
			date: new Date().toLocaleDateString(),
			customerInfo: customer,
			products: products,
			totals: totals,
		};
		console.log('PDF Data:', orderData);
		alert(
			'PDF data is ready for generation. Install react-pdf to generate actual PDF.'
		);
	};

	const handleSubmit = (e:any) => {
		e.preventDefault();
		generatePDF();
	};

	const [showPDF, setShowPDF] = useState(false);

	return (
		<>
		<form
			onSubmit={handleSubmit}
			className='w-full max-w-4xl mx-auto space-y-6 p-4'
		>
			<Card>
				<div className='p-4 grid grid-cols-3 gap-4'>
					<div className='space-y-2'>
						<Label htmlFor='supplier'>Choose Supplier</Label>
						<Select
							onValueChange={(value) =>
								handleSelectChange(value, 'supplier')
							}
							value={customer.supplier}
						>
							<SelectTrigger>
								<SelectValue placeholder='Select supplier' />
							</SelectTrigger>
							<SelectContent>
								{suppliers.map((supplier) => (
									<SelectItem
										key={supplier.id}
										value={supplier.id.toString()}
									>
										{supplier.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='billToAddress'>Bill To Address</Label>
						<Select
							onValueChange={(value) =>
								handleSelectChange(value, 'billToAddress')
							}
							value={customer.billToAddress}
						>
							<SelectTrigger>
								<SelectValue placeholder='Select billing address' />
							</SelectTrigger>
							<SelectContent>
								{addresses.map((addr) => (
									<SelectItem
										key={addr.id}
										value={addr.id.toString()}
									>
										{addr.address}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='shipToAddress'>Ship To Address</Label>
						<Select
							onValueChange={(value) =>
								handleSelectChange(value, 'shipToAddress')
							}
							value={customer.shipToAddress}
						>
							<SelectTrigger>
								<SelectValue placeholder='Select shipping address' />
							</SelectTrigger>
							<SelectContent>
								{addresses.map((addr) => (
									<SelectItem
										key={addr.id}
										value={addr.id.toString()}
									>
										{addr.address}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='paymentTerms'>Payment Terms</Label>
						<Input
							id='paymentTerms'
							name='paymentTerms'
							value={customer.paymentTerms}
							onChange={handleCustomerChange}
							placeholder='Enter payment terms'
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='deliveryTerms'>Delivery Terms</Label>
						<Input
							id='deliveryTerms'
							name='deliveryTerms'
							value={customer.deliveryTerms}
							onChange={handleCustomerChange}
							placeholder='Enter delivery terms'
						/>
					</div>
				</div>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Products</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					{/* Product List */}
					{products.length > 0 && (
						<div className='space-y-2'>
							{products.map((product) => (
								<div
									key={product.id}
									className='flex items-center justify-between p-2 border rounded'
								>
									<div className='flex-1 grid grid-cols-4 gap-2'>
										<span>{product.description}</span>
										<span>Qty: {product.quantity}</span>
										<span>Rate: ₹{product.rate}</span>
										<span>Amount: ₹{product.amount}</span>
									</div>
									<Button
										type='button'
										variant='ghost'
										size='icon'
										onClick={() =>
											removeProduct(product.id)
										}
									>
										<Trash2 className='h-4 w-4' />
									</Button>
								</div>
							))}

							<div className='pt-4 border-t'>
								<div className='grid grid-cols-2 gap-4 border border-red-300'>
									<div className='text-right'>Sub Total:</div>
									<div>
										₹{calculateTotals().subTotal.toFixed(2)}
									</div>
									<div className='text-right'>
										Total CGST:
									</div>
									<div>
										₹
										{calculateTotals().totalCGST.toFixed(2)}
									</div>
									<div className='text-right'>
										Total SGST:
									</div>
									<div>
										₹
										{calculateTotals().totalSGST.toFixed(2)}
									</div>
									<div className='text-right'>
										Total IGST:
									</div>
									<div>
										₹
										{calculateTotals().totalIGST.toFixed(2)}
									</div>
									<div className='text-right font-bold'>
										Grand Total:
									</div>
									<div className='font-bold'>
										₹
										{calculateTotals().grandTotal.toFixed(
											2
										)}
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Add Product Form */}
					<div className='grid grid-cols-11 gap-1'>
						<div className='col-span-4'>
							<Label htmlFor='description'>
								Description of Goods
							</Label>
							<Input
								id='description'
								name='description'
								value={currentProduct.description}
								onChange={handleProductChange}
								placeholder='Enter description'
							/>
						</div>
						<div className='col-span-2'>
							<Label htmlFor='hsnCode'>HSN Code</Label>
							<Input
								id='hsnCode'
								name='hsnCode'
								value={currentProduct.hsnCode}
								onChange={handleProductChange}
							/>
						</div>
						<div>
							<Label htmlFor='quantity'>Quantity</Label>
							<Input
								id='quantity'
								name='quantity'
								type='number'
								value={currentProduct.quantity}
								onChange={handleProductChange}
							/>
						</div>
						<div>
							<Label htmlFor='rate'>Rate</Label>
							<Input
								id='rate'
								name='rate'
								type='number'
								value={currentProduct.rate}
								onChange={handleProductChange}
							/>
						</div>
						<div className='col-span-2'>
							<Label htmlFor='discount'>Discount (%)</Label>
							<Input
								id='discount'
								name='discount'
								type='number'
								value={currentProduct.discount}
								onChange={handleProductChange}
							/>
						</div>
						<div>
							<Label htmlFor='amount'>Amount</Label>
							<Input
								id='amount'
								name='amount'
								value={currentProduct.amount}
								readOnly
							/>
						</div>
						<div className='col-span-8'></div>
						<div>
							<Label htmlFor='cgst'>CGST (%)</Label>
							<Input
								id='cgst'
								name='cgst'
								type='number'
								value={currentProduct.cgst}
								onChange={handleProductChange}
								placeholder='Enter CGST'
							/>
						</div>
						<div>
							<Label htmlFor='sgst'>SGST (%)</Label>
							<Input
								id='sgst'
								name='sgst'
								type='number'
								value={currentProduct.sgst}
								onChange={handleProductChange}
								placeholder='Enter SGST'
							/>
						</div>
						<div>
							<Label htmlFor='igst'>IGST (%)</Label>
							<Input
								id='igst'
								name='igst'
								type='number'
								value={currentProduct.igst}
								onChange={handleProductChange}
								placeholder='Enter IGST'
							/>
						</div>
					</div>

					<Button
						type='button'
						onClick={addProduct}
						className='w-full'
						disabled={
							!currentProduct.description ||
							!currentProduct.quantity ||
							!currentProduct.rate
						}
					>
						<PlusCircle className='h-4 w-4 mr-2' />
						Add Product
					</Button>
				</CardContent>
			</Card>

			<Button type='submit' className='w-full bg-primary'>
				<FileDown className='h-4 w-4 mr-2' />
				Generate Purchase Order PDF
			</Button>
			
		</form>
		{/* <PDFDownloadLink 
			document={<ProductOrderPDF customerDetails={customer} products={products} />} 
			fileName="somename.pdf">
			{({ blob, url, loading, error }) =>  {
const handleClick = (event: any) => {
event.preventDefault();

                if (!blob) return;

                const blobUrl = URL.createObjectURL(blob);

                const link = document.createElement("a");

                link.href = blobUrl;
                link.download = "example.pdf";

                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);
              };

              return (
                <span
                  role="button"
                  onClick={handleClick}
                //   className={
                //     loadingState === LoadingState.LOADING
                //       ? styles["text-disabled"]
                //       : ""
                //   }
                >
                  Download
                </span>
              );
            }}
		</PDFDownloadLink> */}
		<Button onClick={() => setShowPDF(true)}>Show PDF</Button>
		{showPDF && <PDFViewer width={500} height={500}>
				<ProductOrderPDF
					customerDetails={customer}
					products={products}
				/>
			</PDFViewer> }
			{/* { showPDF && <ProductOrderPDF customerDetails={customer} products={products} />} */}
			</>
	);
};

export default OrderForm;
