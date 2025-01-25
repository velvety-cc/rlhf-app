"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import Loading from "./Loading"
import GroupComparison from "./GroupComparison"

interface AnswerGroup {
  chainOfThought: string
  answer: string
}

interface ChatMessage {
  type: "user" | "ai"
  content: string
}

export default function QuestionForm() {
  const [question, setQuestion] = useState("")
  const [group1, setGroup1] = useState<AnswerGroup | null>(null)
  const [group2, setGroup2] = useState<AnswerGroup | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setIsLoading(true)
    setChatHistory((prev) => [...prev, { type: "user", content: question }])
    setGroup1(null)
    setGroup2(null)
    setShowComparison(true)

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch answer")
      }

      const data = await response.json()
      setGroup1(data.group1)
      setGroup2(data.group2)
    } catch (error) {
      console.error("Error:", error)
      setChatHistory((prev) => [...prev, { type: "ai", content: "An error occurred while processing your question." }])
    } finally {
      setIsLoading(false)
      setQuestion("")
    }
  }

  const handleSelection = (selectedGroup: AnswerGroup) => {
    setChatHistory((prev) => [...prev, { type: "ai", content: selectedGroup.answer }])
    setShowComparison(false)
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow pr-4">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.type === "user" ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block p-2 rounded-lg ${
                msg.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && <Loading />}
        {showComparison && group1 && group2 && (
          <GroupComparison group1={group1} group2={group2} onSelection={handleSelection} />
        )}
      </ScrollArea>
      <div className="mt-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question..."
            className="flex-grow"
            rows={1}
          />
          <Button type="submit" disabled={isLoading}>
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}

