"use client"

import { useState } from "react"
import { Calculator } from "./calculator"
import { Results } from "./results"
import { UnicornHeader } from "./unicorn-header"

export function Unicorn() {
  const [result, setResult] = useState<number | null>(null)
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([])

  const handleCalculate = (probability: number, criteria: string[]) => {
    setResult(probability)
    setSelectedCriteria(criteria)
  }

  const handleReset = () => {
    setResult(null)
  }

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      <UnicornHeader />

      <div className="p-6 md:p-8">
        {result === null ? (
          <Calculator onCalculate={handleCalculate} />
        ) : (
          <Results probability={result} selectedCriteria={selectedCriteria} onReset={handleReset} />
        )}
      </div>
    </div>
  )
}
