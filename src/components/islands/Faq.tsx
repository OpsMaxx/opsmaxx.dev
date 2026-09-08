import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { faq } from '@/data/copy'

export function Faq() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faq.map((f, i) => (
        <AccordionItem key={f.q} value={`i${i}`} className="border-border">
          <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-[0.95rem] leading-relaxed text-muted-foreground">
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
