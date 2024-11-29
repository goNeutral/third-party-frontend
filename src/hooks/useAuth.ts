// "use client";

import { useGoogleLogin } from '@react-oauth/google';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSetAtom, useAtomValue } from 'jotai';
import { userAuthAtom as authState } from "@/store/auth";
import { authService } from "@/utils/auth";
import {request,getUrl} from "@/utils/network";


const googleAuthRequset = (data:any) :Promise<any>  =>{
  console.log(data);

  const url = getUrl('/auth/google');
  console.log(url);
  return request(url, data, 'POST');

}

export const googleMutation = (
  successCallback: (res: any) => void,
  errorCallback: (err: any) => void
): ReturnType<typeof useMutation> => {
  return useMutation<Promise<any>, any, any, unknown>({
    mutationFn: googleAuthRequset,
 
    onSuccess: (res: any) => {
      successCallback(res);
    },
    onError: (err: any) => {
      errorCallback(err);
    },
  });
}



const useAuth = (): useAuthState => {
  const setAuth = useSetAtom(authState)
  const auth = useAtomValue(authState)

  const { mutateAsync: verifyToken } = useMutation({
    mutationFn: authService.verifyGoogleToken,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      setAuth({
        isAuthenticated: true,
        user: data.user,
        loading: false,
      });
    },
  });

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authService.getCurrentUser,
    enabled: auth.isAuthenticated,
    onSuccess: (data) => {
      setAuth((prev) => ({
        ...prev,
        user: data,
      }));
    },
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      await verifyToken(response.access_token);
    },
    onError: (error) => {
      console.error('Google Login Error:', error);
    },
  });

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({
      isAuthenticated: false,
      user: null,
      loading: false,
    });
  };

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
    login: googleLogin,
    logout,
  };
}

export {
    useAuth
};