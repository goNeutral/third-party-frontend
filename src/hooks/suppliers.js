import { useMutation } from '@tanstack/react-query';
import {request,getUrl} from "@/utils/network";
const formContetntType = 'x-www-form-urlencoded';

const createSupplierRequest = (data) => {
    const url = getUrl('/api/suppliers/');
    return request('POST', url, data, true,formContetntType);
}

export const createSupplierMutation = (successCallback, errorCallback) => {
    return useMutation({
        mutationFn: createSupplierRequest,
        onSuccess: (res) => {
            successCallback(res);
        },
        onError: (err) => {
            errorCallback(err);
        },
    });
}

const listSupplierRequest = (name = "") => {
    const url = getUrl('/api/suppliers/?name=' + name);
    console.log(url);
    return request('GET', url, null, true);
}

export const listSupplierMutation = (successCallback, errorCallback) => {
    return useMutation({
    
        mutationFn: listSupplierRequest,
        onSuccess: (res) => {
            successCallback(res);
        },
        onError: (err) => {
            errorCallback(err);
        },

    });
}

const searchSupplierRequest = (data) => {
    let url = getUrl('/api/suppliers/search_supplier/');
    if (data) {
        url = `${url}?query=${data}`;
    }
    return request('GET', url, {}, true);

}

export const searchSupplierMutation = (successCallback, errorCallback) => {
    return useMutation({
        mutationFn: searchSupplierRequest,
        onSuccess: (res) => {
            successCallback(res);
        },
        onError: (err) => {
            errorCallback(err);
        },
    });
}

const createPurchaseOrderRequest = (data) => {
    const url = getUrl('/api/orders/create_purchase_order/');
    return request('POST', url, data, true);
}

export const createPurchaseOrderMutation = (successCallback, errorCallback) => {
    return useMutation({
        mutationFn: createPurchaseOrderRequest,
        onSuccess: (res) => {
            successCallback(res);
        },
        onError: (err) => {
            errorCallback(err);
        },
    });
}

const listPurchaseOrderRequest = () => {
    const url = getUrl('/api/orders/get_purchase_order/');
    return request('GET', url, null, true);
}

export const listPurchaseOrderMutation = (successCallback, errorCallback) => {
    return useMutation({
        mutationFn: listPurchaseOrderRequest,
        onSuccess: (res) => {
            successCallback(res);
        },
        onError: (err) => {
            errorCallback(err);
        },
    });
}

const updatePurchaseOrderRequest = (data) => {
    const url = getUrl('/api/orders/update_status_purchase_order/');
    return request('POST', url, data, true);
}

export const updatePurchaseOrderMutation = (successCallback, errorCallback) => {
    return useMutation({
        mutationFn: updatePurchaseOrderRequest,
        onSuccess: (res) => {
            successCallback(res);
        },
        onError: (err) => {
            errorCallback(err);
        },
    });
}

const updateSalesOrderRequest = (data) => {
    const url = getUrl('/api/orders/update_status_sales_order/');
    return request('POST', url, data, true);
}

export const updateSalesOrderMutation = (successCallback, errorCallback) => {
    return useMutation({
        mutationFn: updateSalesOrderRequest,
        onSuccess: (res) => {
            successCallback(res);
        },
        onError: (err) => {
            errorCallback(err);
        },
    });
}

const updateSupplierRequest = (data) => {
    console.log("data update =>",data)
    const url = getUrl(`/api/suppliers/${data?.id}/`);
    return request('PATCH', url, data, true);
}

export const updateSupplierMutation = (successCallback, errorCallback) => {
    return useMutation({
        mutationFn: updateSupplierRequest,
        onSuccess: (res) => {
            successCallback(res);
        },
        onError: (err) => {
            errorCallback(err);
        },
    });
}

const deletSupplierRequest  = (id) => {
    console.log(id)
    const url = getUrl(`/api/suppliers/${id}/`);
    return request('DELETE', url, {}, true);
}

export const deletSupplierMutation = (successCallback, errorCallback) => {
    return useMutation({
        mutationFn: deletSupplierRequest,
        onSuccess: (res) => {
            successCallback(res);
        },
        onError: (err) => {
            errorCallback(err);
        },
    });
}