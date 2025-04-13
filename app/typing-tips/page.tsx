'use client'

import { Card, CardContent } from "@/components/ui/card"

const typingTips = [
  {
    title: "Proper Posture",
    description: "Sit up straight with your feet flat on the floor. Keep your elbows bent at right angles and your wrists straight.",
  },
  {
    title: "Home Row Position",
    description: "Always start with your fingers on the home row keys (ASDF for left hand, JKL; for right hand). This is your anchor position.",
  },
  {
    title: "Look at the Screen",
    description: "Train yourself to look at the screen instead of your hands. This will significantly improve your typing speed.",
  },
  {
    title: "Practice Regularly",
    description: "Set aside 15-30 minutes daily for typing practice. Consistency is key to improvement.",
  },
  {
    title: "Start Slow",
    description: "Focus on accuracy first, then gradually increase your speed. It's better to type slowly and correctly than quickly with mistakes.",
  },
  {
    title: "Use All Fingers",
    description: "Learn to use all ten fingers. Each finger should be responsible for specific keys on the keyboard.",
  },
]

export default function TypingTipsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Typing Tips</h1>
      <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
        Master these fundamental typing techniques to improve your speed and accuracy.
        Remember, becoming a proficient typist takes time and practice.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {typingTips.map((tip, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">{tip.title}</h2>
              <p className="text-muted-foreground">{tip.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Additional Resources</h2>
        <p className="text-muted-foreground">
          Practice these tips on our typing test platform to track your progress and improve your skills.
        </p>
      </div>
    </div>
  )
} 