"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Feedback() {
  const [rating, setRating] = useState<number | null>(null)

  const handleFeedback = (value: number) => {
    setRating(value)
    console.log("User feedback:", value)
    // Here you could send the feedback to an API endpoint
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Was this answer helpful?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <Button
              key={value}
              onClick={() => handleFeedback(value)}
              variant={rating === value ? "default" : "outline"}
            >
              {value}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

