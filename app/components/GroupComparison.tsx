"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface AnswerGroup {
  chainOfThought: string
  answer: string
}

interface GroupComparisonProps {
  group1: AnswerGroup
  group2: AnswerGroup
  onSelection: (selectedGroup: AnswerGroup) => void
}

export default function GroupComparison({ group1, group2, onSelection }: GroupComparisonProps) {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  const handleSubmit = () => {
    if (selectedGroup) {
      onSelection(selectedGroup === "Group 1" ? group1 : group2)
    }
  }

  const renderGroup = (group: AnswerGroup, groupName: string) => (
    <Card className={`mb-4 ${selectedGroup === groupName ? "ring-2 ring-primary" : ""}`}>
      <CardHeader>
        <CardTitle>{groupName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Chain of Thought:</h3>
          <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md text-sm">{group.chainOfThought}</pre>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Answer:</h3>
          <p className="bg-muted p-4 rounded-md">{group.answer}</p>
        </div>
        <RadioGroup onValueChange={setSelectedGroup} className="pt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={groupName} id={groupName} checked={selectedGroup === groupName} />
            <Label htmlFor={groupName}>Select this response</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>{renderGroup(group1, "Group 1")}</div>
        <div>{renderGroup(group2, "Group 2")}</div>
      </div>
      <div className="flex justify-center">
        <Button onClick={handleSubmit} disabled={!selectedGroup}>
          Confirm Selection
        </Button>
      </div>
    </div>
  )
}

