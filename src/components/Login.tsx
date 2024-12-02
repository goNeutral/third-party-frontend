"use client";

import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { googleMutation } from "@/hooks/useAuth";
import {gLoginMutation} from "@/hooks/auth";
import { useAtom } from "jotai";
import { userAuthAtom } from "@/store/auth";


const GoogleLoginComponent = () => {


  const [authState, setAuthState] = useAtom(userAuthAtom);


  const { mutate:googleAuth } = gLoginMutation(
    (res:any) => {
      console.log("Google Login Successful:", res);
      setAuthState({
        isAuthenticated: true,
        user: res?.data?.user,
        loading: false,
        token: res?.data?.access,
      });
      window.location.href = "/products";
      
    },
    (err:any) => {
      console.error("Google Login Error:", err);

    }
  );
  interface GoogleLoginResponse {
    credential: string;
  }

  const handleLoginSuccess = (response: GoogleLoginResponse) => {
    
    googleAuth({ token: response.credential });
    
  };

  const handleLoginFailure = (error:any) => {
    console.error("Login Failed:", error);
    // alert("Google Login failed. Please try again.");
  };

  return (
    <div>
      <h1>Login with Google</h1>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
        theme="outline"
        size="large"
      />
    </div>
  );
};

const App = () => {
  return (
    <>
      <GoogleLoginComponent />
    </>
  );
};

export default App;
