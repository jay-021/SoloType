import { Clock, BarChart3, Award, Calendar, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: <Clock className="h-10 w-10 text-solo-purple-light" />,
    title: 'Multiple Difficulty Levels',
    description:
      'Choose from easy, medium, or hard tests to match your skill level.',
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-solo-purple-light" />,
    title: 'Test Duration Options',
    description: 'Select from 1, 2, 3, or 5 minute tests to fit your schedule.',
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-solo-purple-light" />,
    title: 'Real-time Progress Tracking',
    description: 'Monitor your WPM, accuracy, and improvement over time.',
  },
  {
    icon: <Calendar className="h-10 w-10 text-solo-purple-light" />,
    title: 'Daily Challenges',
    description: 'New typing challenges every day to keep your skills sharp.',
  },
  {
    icon: <Award className="h-10 w-10 text-solo-purple-light" />,
    title: 'Leveling System',
    description:
      'Earn badges and achievements as you improve your typing skills.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-solo-black py-20 backdrop-blur-sm">
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center space-y-4 text-center">
          <h2 className="solo-font glow-text text-3xl font-bold tracking-tighter md:text-4xl">
            Features
          </h2>
          <p className="max-w-[700px] text-gray-300">
            Everything you need to become a typing master
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-lg border border-solo-purple/20 bg-gradient-to-b from-solo-black to-solo-darkgray/50 p-6 transition-all duration-300 hover:border-solo-purple/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]"
            >
              <div className="mb-4 rounded-full bg-solo-purple/10 p-3">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
