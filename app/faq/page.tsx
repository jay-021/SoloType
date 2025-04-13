import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is SoloType?",
    answer: "SoloType is a typing test platform designed to help you improve your typing skills through gamified practice. Our platform offers various typing tests with different difficulty levels and themes."
  },
  {
    question: "How is the typing speed calculated?",
    answer: "Typing speed is measured in Words Per Minute (WPM). We calculate this by taking the total number of characters typed (including spaces) divided by 5 (average word length) and then divided by the time taken in minutes."
  },
  {
    question: "How is accuracy calculated?",
    answer: "Accuracy is calculated by comparing the number of correctly typed characters to the total number of characters typed. The result is expressed as a percentage."
  },
  {
    question: "Can I customize the typing test?",
    answer: "Yes! Our custom test feature allows you to choose the test duration, difficulty level, and even input your own text for practice."
  },
  {
    question: "How can I improve my typing speed?",
    answer: "Regular practice is key. Start with proper finger positioning on the home row, focus on accuracy over speed initially, and gradually increase your pace. Check out our Typing Tips page for detailed guidance."
  },
  {
    question: "Is SoloType free to use?",
    answer: "Yes, SoloType is completely free to use. We believe in providing accessible tools for everyone to improve their typing skills."
  },
  {
    question: "Can I track my progress over time?",
    answer: "Yes, you can track your typing speed, accuracy, and improvement over time through your personal statistics dashboard when logged in."
  },
  {
    question: "Is SoloType related to the Solo Leveling anime?",
    answer: "No, SoloType is not affiliated with the Solo Leveling anime or its creators. This is a university study project focused on improving typing skills, and the name is just a coincidence."
  }
]

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
} 