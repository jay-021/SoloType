import { Clock, BarChart3, Award, Calendar, TrendingUp } from "lucide-react"

const features = [
  {
    icon: <Clock className="h-10 w-10 text-solo-purple-light" />,
    title: "Multiple Difficulty Levels",
    description: "Choose from easy, medium, or hard tests to match your skill level.",
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-solo-purple-light" />,
    title: "Test Duration Options",
    description: "Select from 1, 2, 3, or 5 minute tests to fit your schedule.",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-solo-purple-light" />,
    title: "Real-time Progress Tracking",
    description: "Monitor your WPM, accuracy, and improvement over time.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-solo-purple-light" />,
    title: "Daily Challenges",
    description: "New typing challenges every day to keep your skills sharp.",
  },
  {
    icon: <Award className="h-10 w-10 text-solo-purple-light" />,
    title: "Leveling System",
    description: "Earn badges and achievements as you improve your typing skills.",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-solo-black backdrop-blur-sm">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="solo-font text-3xl md:text-4xl font-bold tracking-tighter glow-text">Features</h2>
          <p className="text-gray-300 max-w-[700px]">Everything you need to become a typing master</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-gradient-to-b from-solo-black to-solo-darkgray/50 rounded-lg border border-solo-purple/20 hover:border-solo-purple/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]"
            >
              <div className="mb-4 p-3 rounded-full bg-solo-purple/10">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

