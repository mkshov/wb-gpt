"use client";
import React, { useEffect, useState, useRef } from "react";

// Кастомный хук для анимации чисел
function useCountUp(target: number, duration: number, startCounting: boolean): number {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!startCounting) return;

    let start = 0;
    const increment = target / (duration / 10);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        clearInterval(interval);
        setCount(target);
      } else {
        setCount(Math.floor(start));
      }
    }, 10);

    return () => clearInterval(interval);
  }, [target, duration, startCounting]);

  return count;
}

export default function OurRespects() {
  const [startCounting, setStartCounting] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCounting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const count1 = useCountUp(36720, 2300, startCounting);
  const count2 = useCountUp(10000000, 2300, startCounting);
  const count3 = useCountUp(217, 1600, startCounting); // Статичное число
  const count4 = useCountUp(322, 1900, startCounting); // Статичное число

  return (
    <section
      ref={sectionRef}
      className="text-white py-20 mt-40 text-center relative bg-[url(/images/winter.jpg)] bg-no-repeat bg-cover before:absolute before:inset-0 before:bg-main before:opacity-70"
    >
      <h2 className="text-4xl font-bold mb-10 relative z-10">Наши достижения</h2>
      <div className="container justify-between flex items-center gap-5 max-[1000px]:flex-wrap max-[1000px]:max-w-3xl max-[700px]:justify-center relative z-10">
        <div className="bg-submain px-6 min-h-[216px] flex flex-col justify-center items-center rounded-3xl">
          <span className="font-bold text-4xl">{count1}</span>
          <p className="max-w-64 mt-4">Активных участников в сообществе</p>
        </div>
        <div className="bg-submain px-6 min-h-[216px] flex flex-col justify-center items-center rounded-3xl min-w-[304px]">
          <span className="font-bold text-4xl">{count2}+</span>
          <p className="max-w-56 mt-4">Проанализированных товаров</p>
        </div>
        <div className="bg-submain px-6 min-h-[216px] flex flex-col justify-center items-center rounded-3xl">
          <span className="font-bold text-4xl">+{count3}%</span>
          <p className="max-w-64 mt-4">Средний рост продаж в первые 3 месяца</p>
        </div>
        <div className="bg-submain px-6 min-h-[216px] flex flex-col justify-center items-center rounded-3xl">
          <span className="font-bold text-4xl">+{count4}%</span>
          <p className="max-w-64 mt-4">Средний прирост прибыли в первые 3 месяца</p>
        </div>
      </div>
    </section>
  );
}
