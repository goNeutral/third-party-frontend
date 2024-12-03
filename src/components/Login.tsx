"use client";

import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { googleMutation } from "@/hooks/useAuth";
import { gLoginMutation } from "@/hooks/auth";
import { useAtom } from "jotai";
import { userAuthAtom } from "@/store/auth";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import logoImg from '../../public/logo.jpg';


const GoogleLoginComponent = () => {


  const [authState, setAuthState] = useAtom(userAuthAtom);
  if (authState.isAuthenticated) {
    window.location.href = "/products";
  }

  const { mutate: googleAuth } = gLoginMutation(
    (res: any) => {
      console.log("Google Login Successful:", res);
      setAuthState({
        isAuthenticated: true,
        user: res?.data?.user,
        loading: false,
        token: res?.data?.access,
      });
      window.location.href = "/products";

    },
    (err: any) => {
      console.error("Google Login Error:", err);

    }
  );
  interface GoogleLoginResponse {
    credential: string;
  }

  const handleLoginSuccess = (response: GoogleLoginResponse) => {

    googleAuth({ token: response.credential });

  };

  const handleLoginFailure = (error: any) => {
    console.error("Login Failed:", error);
    // alert("Google Login failed. Please try again.");
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center bg-background text-foreground p-4">
      <Card className="w-full max-w-md bg-secondary">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-40 h-15 mb-2 relative">
            <Image
              src={logoImg}
              alt="Company Logo"
              objectFit="contain"
            />
          </div>
          <h2 className="text-2xl font-bold">Welcome</h2>
          <p className="text-muted-foreground">Sign in to continue to Your App</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
            theme="outline"
            size="large"
          />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            By signing in, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </CardFooter>
      </Card>
      <Card className="w-full max-w-md bg-secondary rounded-lg p-4 text-center">
        <p className="text-secondary-foreground font-medium">
          Powered by
          <span className="ml-2 text-xl font-extrabold text-secondary-foreground">GoNeutral</span>
        </p>
      </Card>
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