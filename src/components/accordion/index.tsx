import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Faq {
  id: string;
  question: string;
  answer: string;
}

export function MyAccordion({ faqs }: { faqs?: Faq[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs?.map((item) => (
        <AccordionItem value={item.id} key={item.id} className="py-0">
          <AccordionTrigger className="text-xl text-start">{item.question}</AccordionTrigger>
          <AccordionContent className="text-base">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
