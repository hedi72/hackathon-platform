"use client";


// import {  EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaEnvelope,FaLinkedinIn } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
// import  svgPaths  from "@/components/imports/svg-50utk87dgi";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/app/api/auth/login/page";
import { loginWithGithub } from "@/app/api/auth/login/loginWithGithub";
// import Alert from "../ui/alert/Alert";
import { loginWithLinkedin } from "@/app/api/auth/login/loginWithLinkedin";
import { useRouter } from "next/navigation";

import { loginWithGoogle } from "@/app/api/auth/login/loginWithGoogle";
import { getCurrentUser } from "@/app/api/auth/getCurrentUser";

import { useToken } from "@/app/context/TokenContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useUser } from "@/app/context/UserContext";


const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type SignInData = z.infer<typeof SignInSchema>;

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
   const { setUser } = useUser();
     const {token, setToken} = useToken();
  const [alert, setAlert] = useState<{
  variant: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
} | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(SignInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberValue = watch("rememberMe");

const onSubmit = async (data: SignInData) => {
  console.log("🔐 Attempting login with data:", data);
  try {
    const res = await loginUser({
      identifier: data.email,
      password: data.password,
    });

    const token = res?.token;
    console.log("🔑 Token:", token);

    const user = await getCurrentUser(token);
    if (!user) throw new Error("Unauthorized");

       if (token) {
  localStorage.setItem("token", token);
  setToken(token);
} else {
  console.error("No token returned from login");
}
    localStorage.setItem("user", JSON.stringify(user));
     localStorage.setItem("name", user.username || "");

   setAlert({
      variant: "success",
      title: "Login Successful",
      message: "Redirecting to your dashboard...",
    });
    
    console.log("✅ Logged in user:", user);
   
      router.push("/");
    

    
  } catch (error: any) {

     console.error("❌ Login error:", error);
     
     setAlert({
      variant: "error",
      title: "Login Failed",
      message: error.message || "Invalid credentials or network error.",
    });
   
  }
};




  return (
    <div className="min-h-screen flex flex-col items-center px-4">
      <div className="w-full max-w-md mb-4">
        <Link
          href="/"
         className="inline-flex items-center text-sm text-black hover:text-black mt-12"
    >
      <HiArrowLeft className="w-4 h-4" />

          Back to dashboard
        </Link>
    </div>
      <div className="w-full max-w-md bg-white dark:bg-gray-900 
  shadow-lg dark:shadow-[0_0_15px_rgba(0,0,0,0.6)] 
  rounded-2xl p-8 transition-colors">


          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2.5 mb-8">
              <div className="relative h-10 w-10">
                {/* <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
                   <path clipRule="evenodd" d={svgPaths.p3e2ce480} fill="#FFC204" fillRule="evenodd" />
                </svg> */}
             </div>
        <span className="text-3xl font-['Manrope:Medium',sans-serif] text-[32px] text-gray-900 dark:text-gray-100">
          4Hacks
        </span>

      </div>

          <div className="text-center">
  <h2 className="text-3xl  text-black">
    Welcome Back
  </h2>

  <p className="text-l text-gray-500 mt-1">
    Sign in to continue your journey
  </p>
</div>

          </div>
          <div>
         <div className="flex flex-col gap-2 w-full">

 <Link
  href="#"
  onClick={(e) => {
    e.preventDefault();
     loginWithGoogle();
  }}
  target="_blank"
  rel="noopener noreferrer"
  className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl 
  bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
  hover:bg-gray-100 dark:hover:bg-gray-700 
  text-gray-800 dark:text-gray-100 transition"
>
  <FcGoogle className="text-lg" />
  <span className="text-sm">Continue with Google</span>
</Link>

      {/* GitHub Button */}
   <Link
  href="#"
  onClick={(e) => {
    e.preventDefault();
    loginWithGithub();
  }}
  target="_blank"
  rel="noopener noreferrer"
  className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl 
  bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
  hover:bg-gray-100 dark:hover:bg-gray-700 
  text-gray-800 dark:text-gray-100 transition"
>
  <FaGithub className="text-lg" />
  <span className="text-sm">Continue with GitHub</span>
</Link>
<Link
   href="#"
  onClick={(e) => {
    e.preventDefault();
    loginWithLinkedin();
  }}
  target="_blank"
  rel="noopener noreferrer"
  className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl 
  bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
  hover:bg-gray-100 dark:hover:bg-gray-700 
  text-gray-800 dark:text-gray-100 transition">
  <FaLinkedinIn className="text-md" color="#0077B5"/>
  <span className="text-sm">Continue with LinkedIn</span>
</Link>

</div>

            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-m">
               <span className="p-2 text-gray-500 bg-white dark:bg-gray-900 transition-colors sm:px-5 sm:py-2">
                  Or continue with email
                </span>
              </div>
            </div>
            {alert && (
    <div className="mb-4">
      <Alert
        variant={alert.variant}
        title={alert.title}
        message={alert.message}
      />
    </div>
  )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-5">
                  {/* Email */}
          <div>
            <Label>Email</Label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white "/>
             
              <Input
                type="email"
                placeholder="you@example.com"
                className="pl-12"
                error={!!errors.email}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
                {/* Password */}
          <div>
            <Label>Password</Label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"/>

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-12 pr-12"
                error={!!errors.password}
                {...register("password")}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {/* {showPassword ? (
                  <EyeIcon className="fill-gray-500" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500" />
                )} */}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
                 {/* Remember me + forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                {...register("rememberMe")}
                checked={rememberValue}
                onChange={(checked: boolean) =>
                  setValue("rememberMe", checked)
                }
              />
              <span className="text-sm text-gray-700">Keep me logged in</span>
            </label>

            <Link
              href="/resetpassword"
              className="text-sm text-yellow-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
                 <Button className="w-full" size="sm" onClick={handleSubmit(onSubmit)} >
            Sign in
          </Button>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-l font-normal text-center text-gray-700 dark:text-gray-400 l:text-center">
                Don&apos;t have an account? {""}
                <Link
                  href="/signup"
                  className=" text-black hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        
      </div>
    </div>
  );
}