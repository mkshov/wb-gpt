"use client";
import React, { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

type Plan = {
  id: number;
  title: string;
  price: string;
  features: string[];
};

const plans: Plan[] = [
  {
    id: 1,
    title: "Новичок",
    price: "3400 руб/месяц",
    features: ["Multi-step Zaps", "3 Premium Apps", "2 Users team"],
  },
  {
    id: 2,
    title: "Профессионал",
    price: "5600 руб/месяц",
    features: ["Multi-step Zaps", "Unlimited Premium", "50 Users team", "Shared Workspace"],
  },
  {
    id: 3,
    title: "Для компании",
    price: "8300 руб/месяц",
    features: ["Multi-step Zap", "Unlimited Premium", "Unlimited Users Team", "Advanced Admin", "Custom Data Retention"],
  },
  {
    id: 4,
    title: "Professional",
    price: "11000 руб/месяц",
    features: ["Multi-step Zaps", "Unlimited Premium", "50 Users team", "Shared Workspace"],
  },
  {
    id: 5,
    title: "Company",
    price: "16600 руб/месяц",
    features: ["Multi-step Zap", "Unlimited Premium", "Unlimited Users Team", "Advanced Admin", "Custom Data Retention"],
  },
];

export function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(2);

  return (
    <div className="container mt-32">
      <h2 className="text-3xl font-bold">Планы & тарифы</h2>
      <p className="font-medium text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam?</p>
      <div className="bg-white rounded-3xl mt-10">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent className="py-5">
            {plans.map((plan, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 flex justify-center">
                <div className="p-1">
                  <div
                    key={plan.id}
                    className={`relative w-[270px] px-7 pt-12 pb-6 rounded-3xl duration-700 ease-in-out transform ${
                      selectedPlan === plan.id ? "bg-submain text-white scale-105 shadow-md" : "bg-white text-gray-900 scale-100"
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {selectedPlan === plan.id && plan.id === 2 && (
                      <span className="absolute -top-2 -right-2 text-[12px] font-semibold bg-main px-3 py-2 rounded-full">Популярное</span>
                    )}
                    <h3 className="text-xl font-bold">{plan.title}</h3>
                    <p className="text-2xl font-semibold my-4">{plan.price}</p>
                    <div className="min-h-60 flex flex-col justify-between">
                      <ul className="mb-4 space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <span className="inline-block w-2.5 h-2.5 bg-main rounded-full"></span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        className={`w-full py-2 rounded-full transition-colors duration-300 ${
                          selectedPlan === plan.id ? "bg-main text-white" : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        Выбрать план
                      </button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-10 mt-5">
            <CarouselPrevious className="static text-white border-none" />
            <CarouselNext className="static text-white border-none" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
