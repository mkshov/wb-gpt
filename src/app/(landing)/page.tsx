import OurRespects from "@/components/home/OurRespects";
import { PricingPlans } from "@/components/home/Plan";
import Stepper from "@/components/home/Stepper";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[#f6f7fa]">
      <section className="relative bg-submain text-white h-screen overflow-hidden clip-diagonal">
        <div className="container flex items-center max-sm:items-start max-sm:pt-44 justify-between h-full">
          <div className="max-w-xl relative z-10">
            <h1 className="text-5xl font-bold max-sm:text-3xl">Анализируйте продажи на Wildberries в реальном времени</h1>
            <p className="text-submain mt-2 mb-6">
              Следите за динамикой продаж, популярностью товаров и поведением покупателей на платформе Wildberries. Все ключевые метрики в одном
              месте.
            </p>
            <Button className="rounded-full bg-main px-14 py-6 text-base" variant="ghost">
              Начать анализ
            </Button>
          </div>
          <div className="absolute right-0 w-[40%] max-[1000px]:opacity-10 max-[1000px]:w-[85%] max-sm:opacity-100 max-sm:bottom-36">
            <Image src="/images/main-screen.png" alt="chart image" width={3000} height={3000} />
          </div>
          <div className="absolute -bottom-1 -left-10 w-[120%] h-5 bg-main transform rotate-[-4deg] origin-bottom-left"></div>
          <Image
            className="absolute -left-1/2 opacity-5 -rotate-45 max-[1000px]:hidden"
            src="/WBPRO.svg"
            alt="logo wbpro"
            width={3000}
            height={3000}
          />
          <Image
            className="absolute -left-1/5 opacity-5 -rotate-45 max-[1000px]:hidden"
            src="/WBPRO.svg"
            alt="logo wbpro"
            width={3000}
            height={3000}
          />
        </div>
      </section>
      <section className="mt-32 container">
        <h2 className="text-4xl font-bold text-center mb-10">Что предлагает сервис</h2>
        <div className="flex flex-col gap-7">
          <div className="flex gap-7 max-[780px]:flex-col max-[780px]:items-center">
            <div className="flex items-center gap-5 w-full bg-white rounded-3xl p-7">
              <Image src="/chart-1.svg" alt="chart image" className="max-w-36 max-[1000px]:max-w-24" width={200} height={200} />
              <div>
                <span className="font-bold text-2xl">Данные в отчётах</span>
                <p>Динамика продаж, информация о покупателях и их интересах — в срезах брендов, категорий и товаров </p>
              </div>
            </div>
            <div className="flex items-center gap-5 w-full bg-white rounded-3xl p-7">
              <Image src="/chart-2.svg" alt="chart image" className="max-w-32 max-[1000px]:max-w-24" width={200} height={200} />
              <div>
                <span className="font-bold text-2xl">Актуальность данных</span>
                <p>Статистика за сегодня появится в отчётах уже через 2 дня</p>
              </div>
            </div>
          </div>
          <div className="flex gap-7 max-[780px]:flex-col max-[780px]:items-center">
            <div className="flex items-center gap-6 w-full bg-white rounded-3xl p-7">
              <Image src="/chart-3.svg" alt="chart image" className="max-w-32 max-[1000px]:max-w-24" width={200} height={200} />
              <div>
                <span className="font-bold text-2xl">Визуализация данных</span>
                <p>Интерфейс DataLens от Яндекса для удобной работы с данными </p>
              </div>
            </div>
            <div className="flex items-center gap-6 w-full bg-white rounded-3xl p-7">
              <Image src="/chart-4.svg" alt="chart image" className="max-w-36 max-[1000px]:max-w-24" width={200} height={200} />
              <div>
                <span className="font-bold text-2xl">Надёжные иточники данных</span>
                <p>Получаем данные от магазинов партнёров, Яндекс Маркета и Яндекса</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container mt-40">
        <h2 className="text-4xl font-bold text-center mb-10">Как выглядят отчёты</h2>
        <div className="mx-auto">
          <Image src="/images/page.png" alt="page image" className="rounded-3xl" width={2000} height={2000} />
        </div>
      </section>
      <OurRespects />

      <section className="container mt-40">
        <div>
          <div className="flex flex-col text-4xl font-bold max-[1000px]:text-center max-[850px]:text-2xl">
            <div>
              Аналитике по товарам <span className="bg-main text-white px-2">Wildberries -</span>
            </div>

            <span>преимущества использования наших данных:</span>
          </div>
          <div className="flex justify-between gap-3 items-center mt-10 max-[1000px]:flex-wrap max-[1000px]:justify-center">
            <div className="flex items-center max-w-sm gap-3">
              <Image src="/1.svg" alt="1 image" width={300} height={300} className="max-w-24 opacity-80" />
              <p>
                <span className="font-semibold">Обширная база данных</span> - Наша аналитика предоставляет доступ к данным по огромному количеству
                товаров на Wildberries, что позволяет детально отслеживать популярность, цены, рейтинги и отзывы.
              </p>
            </div>
            <div className="flex items-center max-w-sm gap-3">
              <Image src="/2.svg" alt="1 image" width={300} height={300} className="max-w-24 opacity-80" />
              <p>
                <span className="font-semibold">Актуальная информация</span> - Мы анализируем самые свежие данные и обновляем показатели, чтобы вы
                могли оперативно реагировать на изменения в спросе, конкуренцию и динамику рынка на платформе Wildberries.
              </p>
            </div>
            <div className="flex items-center max-w-sm gap-3">
              <Image src="/3.svg" alt="1 image" width={300} height={300} className="max-w-24 opacity-80" />
              <p>
                <span className="font-semibold">Глубокая аналитика</span> - Благодаря нашим инструментам вы сможете выявить тренды, проанализировать
                поведение покупателей и улучшить стратегию продаж, опираясь на проверенные данные.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Stepper />

      <section className="flex items-center gap-10 mt-40 max-[1000px]:justify-center container">
        <div className="flex flex-col max-[1000px]:items-center">
          <div className="flex flex-col gap-1 font-bold text-4xl max-[1000px]:text-center">
            <span className="text-black mr-3">Чем полезен</span>
            <div>
              <span className="bg-[#3287FF] text-white px-2">WBPRO</span>
              <span className="text-black ml-3">для вас?</span>
            </div>
          </div>
          <div className="min-[1000px]:hidden mt-5 max-w-2xl">
            <Image src="/images/macbook.png" alt="macbook ui interface chart" width={1080} height={1080} />
          </div>
          <div className="max-w-6xl max-[1000px]:max-w-2xl max-[550px]:pl-5">
            <p className="text-lg mt-10 mb-5">
              Мы собираем, обрабатываем и анализируем данные о продажах, спросе и поведении покупателей на платформе Wildberries. Используя
              статистические методы, аналитические платформы и программные инструменты, мы строим отчеты, графики и делаем прогнозы.
            </p>
            <p className="text-lg">
              Мы переводим данные в понятные графики и метрики, выявляем тенденции и помогаем оптимизировать бизнес-решения. Наша основная задача —
              помочь продавцам и маркетологам понять, как повысить продажи и адаптироваться к потребностям покупателей на любых устройствах (телефоны,
              компьютеры).
            </p>
          </div>
        </div>
        <div className="max-[1000px]:hidden max-w-2xl">
          <Image src="/images/macbook.png" alt="macbook ui interface chart" width={1080} height={1080} />
        </div>
      </section>
      <PricingPlans />
    </main>
  );
}
