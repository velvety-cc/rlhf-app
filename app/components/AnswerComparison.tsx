"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface AnswerComparisonProps {
  chainOfThought: string
  actualResult: string
}

export default function AnswerComparison({ chainOfThought, actualResult }: AnswerComparisonProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  const handleSubmit = () => {
    if (selectedAnswer) {
      console.log("User selected:", selectedAnswer)
      // Here you would typically send this data to your backend
      setFeedbackSubmitted(true)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Chain of Thought</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md">{chainOfThought}</pre>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Actual Result</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md">{actualResult}</pre>
          </CardContent>
        </Card>
      </div>
      {!feedbackSubmitted ? (
        <Card>
          <CardHeader>
            <CardTitle>Which answer is better?</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup onValueChange={setSelectedAnswer} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="chainOfThought" id="chainOfThought" />
                <Label htmlFor="chainOfThought">Chain of Thought</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="actualResult" id="actualResult" />
                <Label htmlFor="actualResult">Actual Result</Label>
              </div>
            </RadioGroup>
            <Button onClick={handleSubmit} className="mt-4" disabled={!selectedAnswer}>
              Submit Feedback
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center">Thank you for your feedback!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

