"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// const schema = z
//   .object({
//     email: z.string().email("Invalid email address"),
// .refine(async (value) => {
//   const res = await fetch("http://localhost:4000/signup", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email: value }),
//   });

//   const data = await res.json();
//   return data.valid;
// }, "Email is already taken"),
//   password: z
//     .string()
//     .min(6, { message: "Password must be at least 6 characters" })
//     .max(16, { message: "Password must not be longer than 16 characters" }),
//   confirmPassword: z.string(),
// })
// .refine((data) => data.confirmPassword === data.password, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });
const schema = z
  .object({
    user: z.object({
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(16, {
          message: "Password must not be longer than 16 characters",
        }),
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.user.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface RegisterProps {
  onToggle: () => void;
}

type SignupValidationSchemaType = z.infer<typeof schema>;

export default function Register({ onToggle }: RegisterProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  const onSignInSubmit: SubmitHandler<z.infer<typeof schema>> = async (
    data
  ) => {
    try {
      const res = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.status === 200) {
        console.log(result);
        setServerError(null);
        // Redirect to the login page
      } else {
        setServerError(result.status.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setServerError("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSignInSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("user.email")}
            className="border solid"
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
          />
          {errors.user?.password && <p>{errors.user?.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">confirm Password</label>
          <input
            type="text"
            id="confirmPassword"
            {...register("confirmPassword")}
            className="border solid"
          />
          {errors.confirmPassword && <p>{errors.confirmPassword?.message}</p>}
        </div>
        <button className="border solid" type="submit">
          Sign Up
        </button>
        <p>
          Already have an account?{" "}
          <button className="text-blue-500" onClick={onToggle}>
            Log In
          </button>
        </p>
      </form>
    </div>
  );
}
