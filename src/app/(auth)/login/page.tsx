"use client";
import { z } from "zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";

import API from "@/requester";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { ArrowLeft, Eye, EyeOff } from "lucide-react";

// Схема валидации
const formSchema = z.object({
  email: z
    .string()
    .email("Введите корректный email")
    .min(5, "Email должен содержать минимум 5 символов")
    .max(50, "Email должен содержать максимум 50 символов"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов").max(50, "Пароль должен содержать максимум 50 символов"),
});

export default function LogIn() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      const response = await API.post(`/account/login/`, values);
      console.log("hello");

      setLoading(false);
      router.push("/dashboard");
      setCookie("__wbp_token", response.data.token);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        backgroundImage: `
        radial-gradient(circle, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.22) 100%), 
        url('/images/bg-login.png')`,
      }}
      className="h-screen bg-cover bg-center flex items-center justify-center bg-background"
    >
      <Link href="/" className="flex items-center gap-2 absolute left-5 top-5 text-white">
        <ArrowLeft />
        Вернуться домой
      </Link>
      <div className="w-[400px] p-10 rounded-3xl backdrop-blur-md shadow-2xl">
        <h1 className="font-bold text-3xl text-center text-white mb-5">WBPRO</h1>
        <Form {...form}>
          <span className="font-bold text-white text-2xl">Вход</span>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-7 mt-5">
            {/* Поле email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-white font-medium">Ваш email</FormLabel>
                  <FormControl>
                    <Input placeholder="youremail@gmail.com" {...field} className="bg-white outline-none py-5" />
                  </FormControl>
                  <FormMessage className="text-white text-[12px] absolute right-0 -bottom-5" />
                </FormItem>
              )}
            />
            {/* Поле пароля с кнопкой показать/скрыть */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="text-white font-medium">Ваш пароль</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Введите пароль"
                        {...field}
                        className="bg-white outline-none pr-12 py-5"
                      />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Eye className="text-secondary" /> : <EyeOff className="text-secondary" />}
                    </button>
                  </div>
                  <span className="text-white text-sm">
                    Забыли пароль?{" "}
                    <a href="/login" className="underline">
                      сбросить
                    </a>
                  </span>
                  <FormMessage className="text-white text-[12px] absolute right-0 -bottom-5" />
                </FormItem>
              )}
            />
            <div className="text-center ">
              <Button type="submit" className="w-full bg-submain text-white mb-2 py-6" variant="ghost">
                {loading ? "Загрузка..." : "Войти"}
              </Button>

              <span className="text-white text-sm">
                Нет аккаунта?{" "}
                <Link href="/signin" className="underline">
                  Зарегистрироваться
                </Link>
              </span>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
