import { useMutation } from '@tanstack/react-query';
import {request,getUrl} from "@/utils/network";
const googleAuthRequset = (data)   =>{
    console.log(data);
  
    const url = getUrl('/auth/google-login/');
    console.log(url);
    return request('POST',url, data ,false);
  
  }
  
 

export const gLoginMutation = (successCallback, errorCallback) => {
	return useMutation({
		mutationFn: googleAuthRequset,
		onSuccess: (res) => {
			successCallback(res);
		},
		onError: (err) => {
			errorCallback(err);
		},
	});
};

