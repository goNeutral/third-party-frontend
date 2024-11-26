import { useMutation } from '@tanstack/react-query';
import {request,getUrl} from "@/utils/network";
const formContetntType = 'x-www-form-urlencoded';

const createCustomerRequest = (data) => {
    const url = getUrl('/api/customers/');
    return request('POST', url, data, true,formContetntType);
}

export const createCustomerMutation = (successCallback, errorCallback) => {
    return useMutation({
        mutationFn: createCustomerRequest,
        onSuccess: (res) => {
            successCallback(res);
        },
        onError: (err) => {
            errorCallback(err);
        },
    });
}

const listCustomerRequest = () => {
    const url = getUrl('/api/customers/');
    console.log(url);
    return request('GET', url, null, true);
}

export const listCustomerMutation = (successCallback, errorCallback) => {
    return useMutation({
    
        mutationFn: listCustomerRequest,
        onSuccess: (res) => {
            successCallback(res);
        },
        onError: (err) => {
            errorCallback(err);
        },

    });
}

const searchCustomerRequest = (data) => {
    let url = getUrl('/api/customers/');
    if (data) {
        url = `${url}?query=${data}`;
    }
    return request('GET', url, {}, true);

}

export const searchCustomerMutation = (successCallback, errorCallback) => {
    return useMutation({
        mutationFn: searchCustomerRequest,
        onSuccess: (res) => {
            successCallback(res);
        },
        onError: (err) => {
            errorCallback(err);
        },
    });
}

const createSalesOrderRequest = (data) => {
    const url = getUrl('/api/orders/create_sales_order/');
    return request('POST', url, data, true);
}

export const createSalesOrderMutation = (successCallback, errorCallback) => {
    return useMutation({
        mutationFn: createSalesOrderRequest,
        onSuccess: (res) => {
            successCallback(res);
        },
        onError: (err) => {
            errorCallback(err);
        },
    });
}

const getFullSalesOrderRequest = () => {
    const url = getUrl(`/api/orders/get_sales_order/`);
    return request('GET', url, null, true);
}

export const getFullSalesOrderMutation = (successCallback, errorCallback) => {
    return useMutation({
        mutationFn: getFullSalesOrderRequest,
        onSuccess: (res) => {
            successCallback(res);
        },
        onError: (err) => {
            errorCallback(err);
        },
    });
}