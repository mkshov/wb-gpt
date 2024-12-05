"use client";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CircleHelp, Eye, EyeOff, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { ReactTyped } from "react-typed";
import debounce from "lodash.debounce";
import API from "@/requester";
import { useRouter } from "next/navigation";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const formSchema = z.object({
  username: z.string().nonempty("Это поле обязательно."),
  email: z
    .string()
    .email("Введите корректный email.")
    .min(5, "Email должен содержать минимум 5 символов")
    .max(50, "Email должен содержать максимум 50 символов"),
  phone_number: z
    .string()
    .regex(/^\+?[1-9]\d{0,2}[\s\-]?\(?\d{1,4}\)?[\s\-]?\d{1,4}[\s\-]?\d{1,4}[\s\-]?\d{1,4}$/, "Введите правильный номер телефона"),
  password: z
    .string()
    .nonempty("Это поле обязательно.")
    .min(8, "Пароль должен содержать минимум 8 символов.")
    .max(50, "Пароль должен содержать максимум 50 символов.")
    .regex(/[A-Za-z]/, "Пароль должен содержать хотя бы одну букву.")
    .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру."),
});

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone_number: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setLoading(true);
    try {
      const response = await API.post(`/account/register/`, { ...values });
      setLoading(false);
      router.push("/signin/redirect");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.error.phone_number) {
          form.setError("phone_number", { message: "Этот номер телефона уже зарегистрирован." });
        }
      }
    } finally {
      setLoading(false);
    }
  }
  const checkEmailExists = useCallback(
    debounce(async (email) => {
      if (!email) return;

      setLoading(true);
      try {
        const response = await API.post(`/account/register/checkemail/`, { email });
        if (response.data.email) {
          setEmailExists(true);
          form.setError("email", { message: "Этот email уже зарегистрирован." });
        } else {
          setEmailExists(false);
          form.clearErrors("email");
        }
      } catch (error) {
        console.log("Ошибка проверки email:", error);
        form.setError("email", { message: "Не удалось проверить email." });
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Za-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-main">
      <Link href="/" className="flex items-center gap-2 absolute left-5 top-5 text-white">
        <ArrowLeft />
        Вернуться домой
      </Link>
      <div
        className="w-2/3 bg-cover bg-center h-full"
        style={{
          backgroundImage: `
        radial-gradient(circle, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.22) 100%), 
        url('/images/bg-login.png')`,
        }}
      ></div>
      <div className="w-1/3 h-full p-10 rounded-s-lg bg-white backdrop-blur-md shadow-2xl text-submain">
        <div className="max-w-sm mx-auto flex flex-col justify-center h-full">
          <h1 className="font-bold text-3xl text-center mb-5">WBPRO</h1>
          <Form {...form}>
            <ReactTyped
              strings={["Добро пожаловать!", "Давайте начнем регистрацию!"]}
              className="font-semibold text-center"
              typeSpeed={40}
              backSpeed={30}
              backDelay={1500}
              loop={false}
            />
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4 mt-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field, fieldState }) => (
                  <FormItem className="relative">
                    <FormLabel className="font-medium">Ваше имя</FormLabel>
                    <div
                      className={`relative rounded-xl border-2 group ${
                        fieldState.error ? "!border-red-500" : "border-gray-300"
                      } focus-within:border-pink-500`}
                    >
                      <FormControl>
                        <Input
                          autoComplete="username"
                          placeholder="Ваше имя"
                          {...field}
                          className="font-medium border-none bg-white outline-none pr-12 py-6 rounded-xl"
                        />
                      </FormControl>

                      <User
                        className={`absolute inset-y-0 right-3 h-full text-sm ${
                          fieldState.error ? "text-red-500" : "text-gray-400 group-focus-within:text-main"
                        }`}
                      />
                    </div>
                    <FormMessage className="text-[12px] text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem className="relative">
                    <FormLabel className="font-medium">Ваш email</FormLabel>
                    <div
                      className={`relative rounded-xl border-2 group ${
                        fieldState.error ? "!border-red-500" : "border-gray-300"
                      } focus-within:border-pink-500`}
                    >
                      <FormControl>
                        <Input
                          autoComplete="email"
                          placeholder="youremail@gmail.com"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            checkEmailExists(e.target.value);
                          }}
                          className="font-medium border-none bg-white outline-none pr-12 py-6 rounded-xl"
                        />
                      </FormControl>

                      <Mail
                        className={`absolute inset-y-0 right-3 h-full text-sm ${
                          fieldState.error ? "text-red-500" : "text-gray-400 group-focus-within:text-main"
                        }`}
                      />
                    </div>
                    <FormMessage className="text-[12px] text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field, fieldState }) => (
                  <FormItem className="relative">
                    <FormLabel className="font-medium">Ваш номер телефона</FormLabel>
                    <div
                      className={`relative rounded-xl border-2 group ${
                        fieldState.error ? "!border-red-500" : "border-gray-300"
                      } focus-within:border-pink-500`}
                    >
                      <FormControl>
                        <Input
                          autoComplete="new-password"
                          type="number"
                          disabled={emailExists}
                          placeholder="+7 (123) 456-78-90"
                          {...field}
                          className="font-medium border-none bg-white outline-none pr-12 py-6 rounded-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </FormControl>

                      <Phone
                        className={`absolute inset-y-0 right-3 h-full text-sm ${
                          fieldState.error ? "text-red-500" : "text-gray-400 group-focus-within:text-main"
                        }`}
                      />
                    </div>
                    <FormMessage className="text-[12px] text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem className="relative">
                    <FormLabel className="font-medium">Ваш пароль</FormLabel>
                    <div className={`relative rounded-xl border-2 group ${fieldState.error ? "!border-red-500" : "border-gray-300"}`}>
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Введите пароль"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            calculatePasswordStrength(e.target.value);
                          }}
                          disabled={emailExists}
                          className={`font-medium border-none bg-white outline-none pr-12 py-6 rounded-xl ${
                            emailExists ? "bg-gray-200 cursor-not-allowed" : ""
                          }`}
                        />
                      </FormControl>
                      <button
                        type="button"
                        className={`absolute inset-y-0 right-3 flex items-center text-sm ${fieldState.error ? "text-red-500" : "text-gray-400"}`}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Eye /> : <EyeOff />}
                      </button>
                    </div>
                    <FormMessage className="text-[12px] text-red-500" />
                    <div className="mt-2 flex gap-2">
                      <div
                        className={`h-2 w-full rounded-lg ${
                          passwordStrength >= 1
                            ? passwordStrength >= 2
                              ? passwordStrength >= 3
                                ? "bg-green-500"
                                : "bg-orange-400"
                              : "bg-main"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <div
                        className={`h-2 w-full rounded-lg ${
                          passwordStrength >= 2 ? (passwordStrength >= 3 ? "bg-green-500" : "bg-orange-400") : "bg-gray-300"
                        }`}
                      ></div>
                      <div className={`h-2 w-full rounded-lg ${passwordStrength >= 3 ? "bg-green-500" : "bg-gray-300"}`}></div>
                    </div>
                    <div className="flex items-center gap-1">
                      <p
                        className={`text-sm ${
                          passwordStrength === 1
                            ? "text-main"
                            : passwordStrength === 2
                            ? "text-orange-400"
                            : passwordStrength === 3
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      >
                        {passwordStrength === 1
                          ? "Слабый пароль"
                          : passwordStrength === 2
                          ? "Средняя надежность"
                          : passwordStrength === 3
                          ? "Надежный пароль"
                          : "Надежность пароля"}
                      </p>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger type="button">
                            <CircleHelp className="text-gray-400" size={18} />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-96">
                            <p>
                              Используй сильный пароль, чтобы его было сложно подобрать, иначе злоумышленники могут значительно снизить цену на товары
                              и выкупить их задешево. <br /> По статистике, 80 % взломов в мире происходит из-за использования простых или одинаковых
                              паролей.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </FormItem>
                )}
              />

              <div className="text-center">
                <Button
                  disabled={emailExists || passwordStrength < 3 || loading}
                  type="submit"
                  className={`w-full bg-main text-white mb-2 text-base py-7 rounded-3xl ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  variant="ghost"
                >
                  {loading ? "Проверка..." : "Зарегистрироваться"}
                </Button>

                <span className="text-sm">
                  У вас уже аккаунт?{" "}
                  <Link href="/login" className="underline">
                    Войти
                  </Link>
                </span>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
