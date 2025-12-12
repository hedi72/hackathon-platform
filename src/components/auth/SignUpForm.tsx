"use client";


import { FaArrowLeft, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiUser, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { CiMail } from "react-icons/ci";

import Link from "next/link";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/api/auth/register";
import { loginWithGoogle } from "@/app/api/auth/login/loginWithGoogle";
import { loginWithGithub } from "@/app/api/auth/login/loginWithGithub";
import { loginWithLinkedin } from "@/app/api/auth/login/loginWithLinkedin";
import { sendVerifyEmail } from "@/app/api/auth/verifyemail/verifyemailsend";
import { loginUser } from "@/app/api/auth/login/page";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "@/src/hooks/useAuth";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";




export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState<{variant: "success"|"error", message: string} | null>(null);
  const [passwordStrength, setPasswordStrength] =
    useState<"weak" | "medium" | "strong">("weak");
    const router = useRouter();
      const {token} = useAuth();

    
function getPasswordStrength(password: string) {
  if (!password) return "weak";
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  const mediumRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;

  if (strongRegex.test(password)) return "strong";
  if (mediumRegex.test(password)) return "medium";
  return "weak";
}

// Zod validation
const SignupSchema = z
  .object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    userName: z.string().min(3, "username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    terms: z.boolean().refine(val => val === true, {
      message: "You must accept the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
    defaultValues: {
    fullName: "", 
    userName: "",         
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,         
  },
  });
  const termsValue = watch("terms"); 
const onSubmit = async (data: any) => {
    if (passwordStrength !== "strong") {
      setAlert({ variant: "error", message: "Password must be very strong" });
     setTimeout(() => setAlert(null), 2000);
    return;
  }
  try {
    await registerUser({
      name: data.fullName,
      username: data.userName.toLowerCase().replace(/\s+/g, ""),
      email: data.email,
      password: data.password,
    });

    setAlert({ variant: "success", message: "User registered successfully!" });
    const res = await loginUser({
      identifier: data.email,
      password: data.password,
    }); 
    setTimeout(async () => {
      setAlert(null);
      router.push("/verify-email");
      localStorage.setItem("name", res?.user?.username as string);
      localStorage.setItem("token", res?.token || "");
      localStorage.setItem("user", JSON.stringify(res?.user));
      await sendVerifyEmail();
    }, 2000);

  } catch (error: any) {
     setAlert({ variant: "error", message: error.message });
     setTimeout(() => setAlert(null), 2000);
  }
};

  const passwordValue = watch("password");
  React.useEffect(() => {
    setPasswordStrength(getPasswordStrength(passwordValue as string));
  }, [passwordValue]);

  const strengthColor = {
    weak: "bg-red-500",
    medium: "bg-yellow-500",
    strong: "bg-green-500",
  };




  return (
    <div className="min-h-screen flex flex-col items-center px-4">
      <div className="w-full max-w-md mb-4">
        {alert && (
        <div
          className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[400px] z-50"
        >
          <Alert
            // variant={alert.variant}
            title={alert.variant === "success" ? "Success" : "Error"}
            // message={alert.message}
          />
        </div>
      )}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-black hover:text-black mt-12"
        >
          <FaArrowLeft className="mr-1.5" />
          Back to Home
        </Link>
      </div>

      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl text-black mb-4">4Hacks</h1>
          <h1 className="text-3xl text-black mb-2">Get Started</h1> <p className=" text-gray-500 mt-1 mb-4"> Create your account and start your journey </p> </div>
           {/* Social buttons */}
            <div className="grid grid-cols-1 gap-3">
               <button className="inline-flex items-center justify-center gap-3 py-3 text-sm border rounded-lg hover:bg-gray-200" onClick={(e) => {
                   e.preventDefault();
                   loginWithGoogle();
                 }}> <FcGoogle />Continue with Google </button>
                <button className="inline-flex items-center justify-center gap-3 py-3 text-sm border rounded-lg hover:bg-gray-200"   onClick={(e) => {
                    e.preventDefault();
                    loginWithGithub();
                  }}> <FaGithub />Continue with GitHub </button> 
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
                 {/* Divider */} 
                 <div className="relative py-5">
                   <div className="absolute inset-0 flex items-center">
                     <div className="w-full border-t border-gray-200"></div>
                      </div>
                       <div className="relative flex justify-center"> <span className="px-3 bg-white text-gray-400">Or sign up with email</span>
             </div> 
            </div>
        

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full name */}
          <div>
            {/* <Label>Full Name</Label> */}
            <div className="relative">
              <FiUser className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="John Doe"
                className="pl-10 bg-gray-100"
                {...register("fullName")}
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

             <div>
            {/* <Label>UserName</Label> */}
            <div className="relative">
              <FiUser className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="John Doe"
                className="pl-10 bg-gray-100"
                {...register("userName")}
              />
            </div>
            {errors.userName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            {/* <Label>Email</Label> */}
            <div className="relative">
              <CiMail className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="you@example.com"
                className="pl-10 bg-gray-100"
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
  {/* <Label>Password</Label> */}
  <div className="relative">
    <FiLock className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-gray-500" />

    <Input
      type={showPassword ? "text" : "password"}
      placeholder="••••••••"
      className="pl-10 pr-10 bg-gray-100"
      {...register("password")}
    />

    {/* Eye Icon */}
    <button
      type="button"
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <FiEyeOff /> : <FiEye />}
    </button>
  </div>

  {/* Strength bar */}
  <div className="h-2 mt-2 w-full bg-gray-200 rounded">
    <div
      className={clsx(
        "h-full rounded transition-all duration-300",
        strengthColor[passwordStrength]
      )}
      style={{
        width:
          passwordStrength === "weak"
            ? "33%"
            : passwordStrength === "medium"
            ? "66%"
            : "100%",
      }}
    ></div>
  </div>

  <p className="text-xs mt-1 text-gray-600 capitalize">
    Strength: {passwordStrength}
  </p>

  {errors.password && (
    <p className="text-red-500 text-xs mt-1">
      {errors.password.message}
    </p>
  )}
</div>

          {/* Confirm Password */}
         <div>
  {/* <Label>Confirm Password</Label> */}
  <div className="relative">
    <FiLock className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-gray-500" />

    <Input
      type={showConfirmPassword ? "text" : "password"}
      placeholder="••••••••"
      className="pl-10 pr-10 bg-gray-100"
      {...register("confirmPassword")}
    />

    {/* Eye Icon */}
    <button
      type="button"
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    >
      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
    </button>
  </div>

  {errors.confirmPassword && (
    <p className="text-red-500 text-xs mt-1">
      {errors.confirmPassword.message}
    </p>
  )}
</div>


          {/* Checkbox */}
          <div className="flex items-start gap-3">
            <Checkbox {...register("terms")} checked={termsValue}    />
            <p className="text-gray-500 text-sm">
              I agree to the{" "}
              <span className="text-black underline">Terms</span> and{" "}
              <span className="text-black underline">Privacy Policy</span>.
            </p>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-xs">{errors.terms.message}</p>
          )}

          {/* Submit */}
          <button type="submit" className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-black rounded-lg" >
            Create Account
          </button>
        </form>
        {/* Footer */} <p className="text-center text-gray-700 mt-5"> Already have an account?{" "} 
          <Link href="/signin" className="text-black hover:text-brand-600"> Sign In </Link> </p>
      </div>
    </div>
  );

}
