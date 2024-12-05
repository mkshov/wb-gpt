"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import { Sling as Hamburger } from "hamburger-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function BurgerMenu({ isScrolled }: { isScrolled: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleToggle}>
      <SheetTrigger asChild className="min-[640px]:hidden">
        <Button variant="link">
          <Hamburger color={isScrolled ? "black" : "white"} toggled={isOpen} toggle={handleToggle} />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0">
        <SheetHeader className="p-7">
          <SheetTitle className="font-bold text-2xl">WBPRO</SheetTitle>
          <SheetDescription>Отслеживайте результаты и увеличивайте прибыль на Wildberries</SheetDescription>
        </SheetHeader>

        <nav className="flex flex-col">
          <SheetClose asChild>
            <Link href="/" className="px-7 py-3 text-lg border-y-2 border-slate-100 hover:bg-slate-50 transition-all cursor-pointer">
              Тарифы
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/" className="px-7 py-3 text-lg border-b-2 border-slate-100 hover:bg-slate-50 transition-all cursor-pointer">
              Контакты
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/" className="px-7 py-3 text-lg border-b-2 border-slate-100 hover:bg-slate-50 transition-all cursor-pointer">
              Функционал
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/" className="px-7 py-3 text-lg border-b-2 border-slate-100 hover:bg-slate-50 transition-all cursor-pointer">
              О нас
            </Link>
          </SheetClose>
        </nav>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
