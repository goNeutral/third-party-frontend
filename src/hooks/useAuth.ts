"use client";

import { useGoogleLogin } from '@react-oauth/google';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userAuthAtom as authState } from "@/store/auth";
import { authService } from "@/utils/auth";

type useAuthState = {
    user: any;
    isAuthenticated: boolean;
    loading: boolean;
    login: any;
    logout: () => void;
}

const useAuth = (): useAuthState => {
  const setAuth = useSetRecoilState(authState);
  const auth = useRecoilValue(authState);

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