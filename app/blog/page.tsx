import { Card, CardContent } from "@/components/ui/card"

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Blog Coming Soon!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            We're working on creating amazing content about typing techniques, productivity tips, and more.
            Stay tuned!
          </p>
          <div className="animate-bounce">
            🚀
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 