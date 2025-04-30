"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  user: z.object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(16, {
        message: "Password must not exceed 16 characters",
      }),
  }),
});

type LoginFormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const onSignInSubmit: SubmitHandler<z.infer<typeof schema>> = async (
    data
  ) => {
    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok) {
        console.log(result);
        setServerError(null);
        const token = res.headers.get("Authorization");
        if (token) {
          localStorage.setItem("token", token);
          router.push("/pots");
        } else {
          setServerError("No authorization token received");
        }
      } else {
        setServerError(result.status.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setServerError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      {serverError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {serverError}
        </div>
      )}
      <form onSubmit={handleSubmit(onSignInSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("user.email")}
            className="border solid"
            disabled={isSubmitting}
          />
          {errors.user?.email && <p>{errors.user?.email.message}</p>}
          {serverError && <p className="text-red-500">{serverError}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            {...register("user.password")}
            className="border solid"
            disabled={isSubmitting}
          />
          {errors.user?.password && <p>{errors.user?.password.message}</p>}
        </div>
        <button className="border solid" type="submit">
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <p>
        Need to create an account?{" "}
        <Link href="/signup" className="text-blue-500">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
