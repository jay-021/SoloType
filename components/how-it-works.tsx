import { Settings, Keyboard, LineChart } from "lucide-react"

const steps = [
  {
    icon: <Settings className="h-12 w-12 text-solo-purple-light" />,
    title: "Choose your difficulty and duration",
    description:
      "Select from multiple difficulty levels and test durations to match your skill level and available time.",
  },
  {
    icon: <Keyboard className="h-12 w-12 text-solo-purple-light" />,
    title: "Start typing and complete the test",
    description: "Type the displayed text as quickly and accurately as possible to improve your skills.",
  },
  {
    icon: <LineChart className="h-12 w-12 text-solo-purple-light" />,
    title: "Track your progress and level up",
    description: "Monitor your performance over time and earn achievements as you improve.",
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="solo-font text-3xl md:text-4xl font-bold tracking-tighter glow-text">How It Works</h2>
          <p className="text-gray-300 max-w-[700px]">Follow these simple steps to start improving your typing skills</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center relative">
              <div className="mb-6 p-4 rounded-full bg-solo-black border border-solo-purple/30 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                {step.icon}
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[calc(50%+4rem)] w-[calc(100%-8rem)] h-0.5 bg-gradient-to-r from-solo-purple/50 to-transparent"></div>
              )}

              <div className="mb-2 flex items-center justify-center w-8 h-8 rounded-full bg-solo-purple text-white font-bold">
                {index + 1}
              </div>

              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

