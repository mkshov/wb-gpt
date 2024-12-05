"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { BurgerMenu } from "./components/BurgerMenu";

export default function Header({ classes }: { classes?: { parent: string; btn: string } }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed left-0 right-0 z-50 transition-colors duration-300 ${classes?.parent} ${
        isScrolled ? "bg-white text-black shadow-lg" : "bg-transparent text-white"
      }`}
    >
      <header className="container flex justify-between items-center py-5">
        <div className="flex items-center gap-10">
          <Link href="/">
            <span className="font-bold text-2xl">WBPRO</span>
          </Link>
          <nav className="flex gap-4 font-medium max-[1000px]:hidden">
            <Link href="/">Тарифы</Link>
            <Link href="/">Контакты</Link>
            <Link href="/">Функционал</Link>
            <Link href="/">О нас</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-5 max-sm:hidden">
            <Link href="/login">
              <Button className="rounded-full px-5 font-semibold" variant="ghost">
                Войти
              </Button>
            </Link>
            <Button className={`rounded-full bg-main px-5 text-white ${classes?.btn}`} variant="ghost">
              Зарегистрироваться
            </Button>
          </div>
          <BurgerMenu isScrolled={isScrolled} />
        </div>
      </header>
    </div>
  );
}
