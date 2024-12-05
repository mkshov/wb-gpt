import React from "react";

import "./redirect.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen">
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
          <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
        <p className="font-medium text-lg max-w-xl text-center mt-10 mb-2">
          Регистрация прошла успешно! Проверьте свою почту и подтвердите регистрацию по ссылке.
        </p>
        <p className="text-xs">Если сообщение не пришло, проверьте вкладку "спам".</p>

        <Link href="/login">
          <Button className="bg-background text-base mt-10 hover:bg-background">Войти в аккаунт</Button>
        </Link>
      </div>
    </div>
  );
}
