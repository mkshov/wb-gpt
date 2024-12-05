"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function Stepper() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Собираем данные",
      description: [
        "От магазинов партнеров",
        "От Яндекс.Маркета — о категориях, товарах и их характеристиках",
        "От Яндекса — о пользователях и поисковых запросах",
      ],
    },
    {
      title: "Создаём модель знания о видимой части рынка",
      description: [],
    },
    {
      title: "Распознаём и обогащаем данные, смоделированные алгоритмами недостающие знания",
      description: [],
    },
    {
      title: "Формируем отчёты структурирование обезличенных знаний",
      description: [],
    },
    {
      title: "Получаем полную картину рынка",
      description: [],
    },
  ];

  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <div className="container mt-32">
      <div className="flex max-[1100px]:flex-col-reverse items-center gap-10 bg-submain py-8 px-10 rounded-3xl">
        {/* Text Section */}
        <div className="flex flex-col justify-between min-h-[230px] min-[1100px]:w-1/2">
          <div>
            <h2 className="text-3xl font-bold text-white">{steps[activeStep].title}</h2>
            {steps[activeStep].description && (
              <ul className="mt-2 text-white pl-2">
                {steps[activeStep].description.map((item, idx) => (
                  <li key={idx} className="text-base list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button onClick={handleNextStep} className="mt-4 px-6 py-2 bg-white text-main font-semibold rounded-2xl max-w-44">
            Далее
          </button>
        </div>
        <div className="flex items-center justify-evenly max-[600px]:justify-between w-2/3 max-[1100px]:w-full h-full min-h-[250px] max-[500px]:min-h-[200px] relative">
          {Array.from({ length: 5 }).map((_, index) => (
            <React.Fragment key={index}>
              <div
                onClick={() => setActiveStep(index)}
                className={cn(
                  "h-8 w-8 max-[600px]:h-5 max-[600px]:w-5 rounded-full flex items-center justify-center transition-colors duration-500 cursor-pointer",
                  {
                    "self-start": [0, 2, 4].includes(index),
                    "self-end": index === 1,
                    "bg-main": index <= activeStep,
                    "bg-white": index > activeStep,
                  }
                )}
              ></div>
              {index < 4 && (
                <div
                  className={`h-2 max-[600px]:h-1.5 transform transition-colors duration-500 rounded-full absolute ${
                    (index === 0 && "left-[11%] rotate-[60deg] w-[25%] max-[600px]:left-[-5.8%] max-[600px]:w-[40%] max-[600px]:rotate-[63deg]") ||
                    (index === 1 &&
                      "left-[29%] bottom-25 -rotate-[60deg] w-[25%] max-[600px]:left-[18.5%] max-[600px]:w-[40%] max-[600px]:-rotate-[63deg]") ||
                    (index === 2 &&
                      "left-[51%] top-[68px] rotate-[43deg] w-[15%] max-[600px]:left-[51%] max-[600px]:w-[22%] max-[600px]:top-[57px] max-[600px]:rotate-[50deg]") ||
                    (index === 3 &&
                      "left-[69%] top-[66px] rotate-[136deg] w-[14%] max-[600px]:left-[74%] max-[600px]:w-[22%] max-[600px]:top-[57px] max-[600px]:-rotate-[50deg]")
                  } ${index < activeStep ? "bg-main" : "bg-white"}`}
                ></div>
              )}
            </React.Fragment>
          ))}
          <div
            className={cn("bg-main text-white px-4 py-1 text-sm rounded-2xl font-semibold absolute transition-all max-[600px]:hidden", {
              "-left-[0.5vw] top-0": activeStep === 0,
              "left-[5svw] bottom-0": activeStep === 1,
              "left-[10vw] top-0": activeStep === 2,
              "right-[8vw] bottom-16": activeStep === 3,
              "-right-[1vw] top-16": activeStep === 4,
            })}
          >
            {activeStep !== 4 && `Этап ${activeStep + 1}`}
            {activeStep === 4 && "Последний этап"}
          </div>
        </div>
      </div>
    </div>
  );
}
