// api/products/
import { useMutation } from '@tanstack/react-query';

import {request,getUrl} from "@/utils/network";
const productListRequset = (data)   =>{
    console.log(data);
  
    const url = getUrl('/api/products/');
    console.log(url);
    return request('GET',url, null ,true);
  
  }
  
 

export const productListMutation = (successCallback, errorCallback) => {
	return useMutation({
		mutationFn: productListRequset,
		onSuccess: (res) => {
			successCallback(res);
		},
		onError: (err) => {
			errorCallback(err);
		},
	});
};


const createProductRequest = (data) => {
	const url = getUrl('/api/products/');
	const contetntType = 'x-www-form-urlencoded';
	return request('POST', url, data, false, contetntType);
}

export const createProductMutation = (successCallback, errorCallback) => {
	return useMutation({
		mutationFn: createProductRequest,
		onSuccess: (res) => {
			successCallback(res);
		},
		onError: (err) => {
			errorCallback(err);
		},
	});
}

const searchProductRequest = (data=None) => {
	let url = '';
	if(data){
		 url = getUrl('/api/products/search/?query=' + data);
	}
	else{
		 url = getUrl('/api/products/search/');
	}
	return request('GET', url, null, false);
}

export const searchProductMutation = (successCallback, errorCallback) => {
	return useMutation({
		mutationFn: searchProductRequest,
		onSuccess: (res) => {
			successCallback(res);
		},
		onError: (err) => {
			errorCallback(err);
		},
	});
}

const getSOProductRequest = (data) => {
	const url = getUrl(`/api/products/product_sales_order/?so=${data}`);
	return request('GET', url, data, false);
}

export const getSOProductMutation = (successCallback, errorCallback) => {
	return useMutation({
		mutationFn: getSOProductRequest,
		onSuccess: (res) => {
			successCallback(res);
		},
		onError: (err) => {
			errorCallback(err);
		},
	});
}