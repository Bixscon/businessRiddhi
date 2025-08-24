"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/schemas";
import Link from "next/link";
import { FormError } from "./FormError";
import GoogleLogin from "./GoogleLogin";
import { useState, useTransition } from "react";

import { CheckIcon } from "@radix-ui/react-icons";
import { register } from "@/actions/register";
import { FormSuccess } from "./FormSuccess";
import { Stepper } from "../Stepper";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeSlash } from "@phosphor-icons/react/dist/ssr";

const SignupForm = () => {
  const [password, setPassword] = useState<string>("");
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [currentType, setCurrentType] = useState("" as "STARTUP" | "BUSINESS");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      type: currentType,
      identifier: "",
      password: "",
      verificationCode: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      console.log("Submitting form with values:", values);
      console.log(typeof values);
      const res = await register(values);

      if (res.error) {
        setError(res.error);
      }

      if (res.success) {
        toast.success("Account created successfully!");
        if (currentType === "BUSINESS") {
          router.push("/list-business");
        } else {
          router.push("/list-preferences");
        }
      }
    });
  };

  const handleSelectType = () => {
    if (!currentType) {
      return;
    }

    form.setValue("type", currentType);

    // add type queries to navbar
    router.push(`?type=${currentType}`);

    setCurrentStep(2);
  };

  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="lg:w-[540px] w-[320px]">
        <div className="mb-8 mt-2">
          <Stepper currentStep={currentStep} numberOfSteps={2} />
        </div>

        {currentStep === 1 && (
          <div>
            <div className="mb-8">
              <h1 className="text-xl font-semibold text-center">
                Sign Up Type
              </h1>
              <p className="text-sm text-neutrals-600 text-center">
                Select account type
              </p>
            </div>

            <div className="mt-4 space-y-4">
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center gap-4 lg:items-stretch lg:flex-row">
                  <div
                    className={`border w-[220px] border-neutrals-400 rounded-lg p-4 cursor-pointer hover:border-primary-500 ${
                      currentType === "BUSINESS"
                        ? "border-primary-500 shadow-lg"
                        : ""
                    }`}
                    onClick={() => setCurrentType("BUSINESS")}
                  >
                    <h2 className="text-xl font-semibold mb-4">
                      List my Business, to reach startups
                    </h2>
                    <ul className="text-sm text-neutrals-500 flex flex-col gap-2">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="w-5 h-5" />
                        Find Clients
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="w-5 h-5" />
                        Greater Visibility
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="w-5 h-5" />
                        Generate Leads
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckIcon className="w-5 h-5" />
                        List Opportunities
                      </li>
                    </ul>
                  </div>
                  <div
                    className={`border w-[220px] border-neutrals-400 rounded-lg p-4 cursor-pointer hover:border-primary-500 ${
                      currentType === "STARTUP"
                        ? "border-primary-500 shadow-lg"
                        : ""
                    }`}
                    onClick={() => setCurrentType("STARTUP")}
                  >
                    <h2 className="text-xl font-semibold mb-4">
                      Find Resources, for my startup needs
                    </h2>
                    <ul className="text-sm text-neutrals-500 flex flex-col gap-2">
                      <li className="flex items-center gap-2">
                        <CheckIcon className="w-5 h-5" />
                        Find Responses Quickly
                      </li>
                      <li className="flex items-center gap-2">
                        <div>
                          <CheckIcon className="w-5 h-5" />
                        </div>
                        Get Personalized Recommendations
                      </li>
                      <li className="flex items-center gap-2">
                        <div>
                          <CheckIcon className="w-5 h-5" />
                        </div>
                        Create your Startup&apos;s Resume
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full mt-8" onClick={handleSelectType}>
              Continue
            </Button>

            <div className="mt-8">
              <GoogleLogin />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <div className="mb-8">
              <h1 className="text-xl font-semibold text-center">Sign Up</h1>
              <p className="text-sm text-neutrals-600 text-center">
                Create a new account
              </p>
            </div>

            <Form {...form}>
              <div className="flex flex-col gap-4">
                <FormError message={error} />
                <FormSuccess message={success} />
              </div>

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-4 space-y-4"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <p className="text-neutrals-600 font-semibold">
                            Name*
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="mt-1"
                            placeholder="Name"
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="identifier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <p className="text-neutrals-600 font-semibold">
                            Email/ Phone Number*
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="mt-1"
                            placeholder="Email/ Phone Number"
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="relative">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <p className="text-neutrals-600 font-semibold">
                              Password*
                            </p>
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                className="mt-1"
                                type={`${isPasswordVisible ? "text" : "password"}`}
                                placeholder="Enter your password"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setPassword(e.target.value);
                                }}
                                disabled={loading}
                              />
                              <span
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                onClick={() =>
                                  setIsPasswordVisible((prev) => !prev)
                                }
                              >
                                {isPasswordVisible ? (
                                  <Eye className="h-5 w-5" />
                                ) : (
                                  <EyeSlash className="h-5 w-5" />
                                )}
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                          <FormDescription>
                            <span
                              className={`text-sm ${
                                hasMinLength
                                  ? "text-success-200"
                                  : "text-neutrals-500"
                              }`}
                            >
                              <CheckIcon className="w-4 h-4 inline mr-1" />
                              At least 8 characters
                            </span>
                            <br />
                            <span
                              className={`text-sm ${
                                hasSpecialChar
                                  ? "text-success-200"
                                  : "text-neutrals-500"
                              }`}
                            >
                              <CheckIcon className="w-4 h-4 inline mr-1" />
                              Use at least 1 special character
                            </span>
                            <br />
                            <span
                              className={`text-sm ${
                                hasUpperCase
                                  ? "text-success-200"
                                  : "text-neutrals-500"
                              }`}
                            >
                              <CheckIcon className="w-4 h-4 inline mr-1" />
                              Use at least 1 uppercase letter
                            </span>
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? "Signing up..." : "Sign up"}
                </Button>
              </form>
            </Form>
          </div>
        )}

        <div className="flex justify-center mt-6 gap-2">
          <p>Already have an account?</p>
          <Link
            className="text-primary hover:underline font-semibold"
            href="/login"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
