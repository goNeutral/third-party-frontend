import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@alexandernanberg/react-pdf-renderer';

interface ProductOrderPDFProps {
	customerDetails: any;
	products: any[];
}

const ProductOrderPDF = ({
	customerDetails,
	products,
}: ProductOrderPDFProps) => {
	const styles = StyleSheet.create({
		page: {
			flexDirection: 'row',
			backgroundColor: '#fff',
			padding: 30,
			color: '#333',
		},
		section: {
			marginBottom: 20,
		},
		title: {
			fontSize: 18,
			textAlign: 'center',
			marginBottom: 10,
		},
		customerDetails: {
			fontSize: 12,
			marginBottom: 5,
		},
		productTable: {
			display: 'table',
			width: '100%',
			borderStyle: 'solid',
			borderWidth: 1,
			borderRightWidth: 0,
			borderBottomWidth: 0,
		},
		productTableHeader: {
			backgroundColor: '#f2f2f2',
			flexDirection: 'row',
			alignItems: 'center',
			height: 30,
			borderStyle: 'solid',
			borderWidth: 0,
			borderTopWidth: 1,
			borderLeftWidth: 1,
		},
		productTableRow: {
			flexDirection: 'row',
			alignItems: 'center',
			height: 30,
			borderStyle: 'solid',
			borderWidth: 0,
			borderTopWidth: 1,
			borderLeftWidth: 1,
		},
		productTableCell: {
			width: '16.66%',
			padding: 5,
			fontSize: 12,
		},
		termsSection: {
			fontSize: 12,
			marginTop: 10,
		},
	});

	return (
		<Document>
			<Page size='A4' style={styles.page}>
				<View style={styles.section}>
					<Text style={styles.title}>Product Order</Text>
				</View>
				<View style={styles.section}>
					<Text style={styles.customerDetails}>
						Customer: {customerDetails.name}
					</Text>
					<Text style={styles.customerDetails}>
						Billing Address: {customerDetails.billingAddress}
					</Text>
					<Text style={styles.customerDetails}>
						Shipping Address: {customerDetails.shippingAddress}
					</Text>
				</View>
				<View style={styles.section}>
					<View style={styles.productTable}>
						<View style={styles.productTableHeader}>
							<Text style={styles.productTableCell}>Product</Text>
							<Text style={styles.productTableCell}>HSN</Text>
							<Text style={styles.productTableCell}>
								Quantity
							</Text>
							<Text style={styles.productTableCell}>Rate</Text>
							<Text style={styles.productTableCell}>Amount</Text>
							<Text style={styles.productTableCell}>CGST</Text>
							<Text style={styles.productTableCell}>SGST</Text>
							<Text style={styles.productTableCell}>IGST</Text>
						</View>
						{products.map((product, index) => (
							<View key={index} style={styles.productTableRow}>
								<Text style={styles.productTableCell}>
									{product.name}
								</Text>
								<Text style={styles.productTableCell}>
									{product.hsnCode}
								</Text>
								<Text style={styles.productTableCell}>
									{product.quantity}
								</Text>
								<Text style={styles.productTableCell}>
									{product.rate}
								</Text>
								<Text style={styles.productTableCell}>
									{product.amount}
								</Text>
								<Text style={styles.productTableCell}>
									{product.cgst}
								</Text>
								<Text style={styles.productTableCell}>
									{product.sgst}
								</Text>
								<Text style={styles.productTableCell}>
									{product.igst}
								</Text>
							</View>
						))}
					</View>
				</View>
				<View style={styles.termsSection}>
					<Text>Payment Terms: {customerDetails.paymentTerms}</Text>
					<Text>Delivery Terms: {customerDetails.deliveryTerms}</Text>
				</View>
			</Page>
		</Document>
	);
};

export default ProductOrderPDF;
