import { Settings, Keyboard, LineChart } from 'lucide-react';

const steps = [
  {
    icon: <Settings className="h-12 w-12 text-solo-purple-light" />,
    title: 'Choose your difficulty and duration',
    description:
      'Select from multiple difficulty levels and test durations to match your skill level and available time.',
  },
  {
    icon: <Keyboard className="h-12 w-12 text-solo-purple-light" />,
    title: 'Start typing and complete the test',
    description:
      'Type the displayed text as quickly and accurately as possible to improve your skills.',
  },
  {
    icon: <LineChart className="h-12 w-12 text-solo-purple-light" />,
    title: 'Track your progress and level up',
    description:
      'Monitor your performance over time and earn achievements as you improve.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center space-y-4 text-center">
          <h2 className="solo-font glow-text text-3xl font-bold tracking-tighter md:text-4xl">
            How It Works
          </h2>
          <p className="max-w-[700px] text-gray-300">
            Follow these simple steps to start improving your typing skills
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center"
            >
              <div className="mb-6 rounded-full border border-solo-purple/30 bg-solo-black p-4 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                {step.icon}
              </div>

              {index < steps.length - 1 && (
                <div className="absolute left-[calc(50%+4rem)] top-12 hidden h-0.5 w-[calc(100%-8rem)] bg-gradient-to-r from-solo-purple/50 to-transparent md:block"></div>
              )}

              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-solo-purple font-bold text-white">
                {index + 1}
              </div>

              <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
