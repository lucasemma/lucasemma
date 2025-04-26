"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalculatorIcon } from "lucide-react"

// CRITERIA_OPTIONS constant remains the same
const CRITERIA_OPTIONS = {
  height: [
    { value: "no_matter", label: "No matter", probability: 1.0 },
    { value: "150cm", label: "1.50 m", probability: 0.9 },
    { value: "160cm", label: "1.60 m", probability: 0.8 },
    { value: "170cm", label: "1.70 m", probability: 0.6 },
    { value: "180cm", label: "1.80 m", probability: 0.3 },
    { value: "190cm", label: "1.90 m", probability: 0.1 },
    { value: "200cm", label: "2.00 m", probability: 0.05 },
    { value: "210cm", label: "2.10 m", probability: 0.01 },
  ],
  income: [
    { value: "no_matter", label: "No matter", probability: 1.0 },
    { value: "50k", label: "$50,000 per year", probability: 0.5 },
    { value: "100k", label: "$100,000 per year", probability: 0.2 },
    { value: "250k", label: "$250,000 per year", probability: 0.1 },
    { value: "500k", label: "$500,000 per year", probability: 0.05 },
    { value: "1m", label: "$1,000,000 per year", probability: 0.01 },
    { value: "2.5m", label: "$2,500,000 per year", probability: 0.005 },
    { value: "5m", label: "$5,000,000 per year", probability: 0.001 },
  ],
  car: [
    { value: "no_matter", label: "No matter", probability: 1.0 },
    { value: "any_car", label: "Owns any car", probability: 0.7 },
    { value: "compact", label: "Owns a compact car", probability: 0.4 },
    { value: "suv", label: "Owns an SUV", probability: 0.2 },
    { value: "luxury", label: "Owns a luxury car (Mercedes, BMW, Audi)", probability: 0.05 },
    { value: "toyota", label: "Owns a Toyota", probability: 0.15 },
    { value: "vw_golf", label: "Owns a VW Golf", probability: 0.03 },
    { value: "electric", label: "Owns an electric car (Tesla, etc.)", probability: 0.02 },
  ],
  physique: [
    { value: "no_matter", label: "No matter", probability: 1.0 },
    { value: "sedentary", label: "Sedentary", probability: 0.5 },
    { value: "average", label: "Average shape", probability: 0.4 },
    { value: "sometimes_gym", label: "Goes to the gym sometimes", probability: 0.3 },
    { value: "regular_gym", label: "Regular gym-goer", probability: 0.2 },
    { value: "good_shape", label: "Good physical shape", probability: 0.15 },
    { value: "athletic", label: "Athletic build", probability: 0.1 },
    { value: "competes", label: "Competes in sports / fitness events", probability: 0.05 },
  ],
  marital: [
    { value: "no_matter", label: "No matter", probability: 1.0 },
    { value: "single", label: "Single", probability: 0.4 },
    { value: "divorced", label: "Divorced", probability: 0.15 },
    { value: "widowed", label: "Widowed", probability: 0.05 },
    { value: "separated", label: "Separated", probability: 0.08 },
    { value: "open_relationship", label: "In an open relationship", probability: 0.03 },
    { value: "never_married_no_kids", label: "Never married, no kids", probability: 0.2 },
    { value: "never_married_with_kids", label: "Never married, with kids", probability: 0.1 },
  ],
  marriage: [
    { value: "no_matter", label: "No matter", probability: 1.0 },
    { value: "definitely", label: "Yes, definitely", probability: 0.3 },
    { value: "someday", label: "Yes, someday", probability: 0.4 },
    { value: "open", label: "Open to it, but not a priority", probability: 0.5 },
    { value: "undecided", label: "Undecided", probability: 0.6 },
    { value: "not_interested", label: "Not interested", probability: 0.2 },
    { value: "avoids", label: "Actively avoids marriage", probability: 0.1 },
    { value: "engaged", label: "Already engaged", probability: 0.05 },
  ],
  education: [
    { value: "no_matter", label: "No matter", probability: 1.0 },
    { value: "high_school", label: "High school", probability: 0.7 },
    { value: "technical", label: "Technical degree", probability: 0.5 },
    { value: "university", label: "University degree", probability: 0.3 },
    { value: "masters", label: "Master's degree", probability: 0.15 },
    { value: "phd", label: "PhD", probability: 0.05 },
    { value: "self_taught", label: "Self-taught genius", probability: 0.1 },
    { value: "figuring_out", label: "Still figuring it out 😅", probability: 0.2 },
  ],
  kids: [
    { value: "no_matter", label: "No matter", probability: 1.0 },
    { value: "no_kids", label: "No kids", probability: 0.5 },
    { value: "one_child", label: "Has 1 child", probability: 0.2 },
    { value: "two_children", label: "Has 2 children", probability: 0.15 },
    { value: "three_plus", label: "Has 3 or more children", probability: 0.1 },
    { value: "wants_kids", label: "Wants kids in the future", probability: 0.4 },
    { value: "doesnt_want", label: "Doesn't want kids", probability: 0.3 },
    { value: "undecided", label: "Undecided about kids", probability: 0.2 },
  ],
  religion: [
    { value: "no_matter", label: "No matter", probability: 1.0 },
    { value: "catholic", label: "Catholic", probability: 0.3 },
    { value: "christian", label: "Christian (other)", probability: 0.25 },
    { value: "jewish", label: "Jewish", probability: 0.05 },
    { value: "muslim", label: "Muslim", probability: 0.1 },
    { value: "spiritual", label: "Spiritual but not religious", probability: 0.2 },
    { value: "atheist", label: "Atheist / Agnostic", probability: 0.15 },
    { value: "open_minded", label: "Open-minded about religion", probability: 0.4 },
  ],
  smoking: [
    { value: "no_matter", label: "No matter", probability: 1.0 },
    { value: "non_smoker", label: "Non-smoker", probability: 0.7 },
    { value: "occasional", label: "Smokes occasionally", probability: 0.15 },
    { value: "regular", label: "Smokes regularly", probability: 0.2 },
    { value: "vapes", label: "Vapes", probability: 0.1 },
    { value: "social", label: "Social smoker only", probability: 0.15 },
    { value: "quitting", label: "Trying to quit", probability: 0.08 },
    { value: "open_quit", label: "Smoker but open to quitting", probability: 0.1 },
  ],
  pets: [
    { value: "no_matter", label: "No matter", probability: 1.0 },
    { value: "dogs", label: "Loves dogs", probability: 0.4 },
    { value: "cats", label: "Loves cats", probability: 0.3 },
    { value: "both", label: "Loves both dogs and cats", probability: 0.25 },
    { value: "has_pets", label: "Has pets", probability: 0.4 },
    { value: "dislikes", label: "Doesn't like pets", probability: 0.15 },
    { value: "allergic", label: "Allergic to pets", probability: 0.1 },
    { value: "activist", label: "Animal rights activist", probability: 0.05 },
  ],
  languages: [
    { value: "no_matter", label: "No matter", probability: 1.0 },
    { value: "native", label: "Only native language", probability: 0.6 },
    { value: "bilingual", label: "Bilingual", probability: 0.3 },
    { value: "three", label: "Speaks 3 languages", probability: 0.1 },
    { value: "four_plus", label: "Speaks 4 or more languages", probability: 0.05 },
    { value: "english", label: "Fluent in English", probability: 0.4 },
    { value: "spanish", label: "Fluent in Spanish", probability: 0.2 },
    { value: "other", label: "Fluent in French / Italian / German / Mandarin (etc.)", probability: 0.15 },
  ],
  politics: [
    { value: "no_matter", label: "No matter", probability: 1.0 },
    { value: "left", label: "Left-leaning", probability: 0.25 },
    { value: "center_left", label: "Center-left", probability: 0.2 },
    { value: "centrist", label: "Centrist", probability: 0.15 },
    { value: "center_right", label: "Center-right", probability: 0.2 },
    { value: "right", label: "Right-leaning", probability: 0.25 },
    { value: "apolitical", label: "Apolitical", probability: 0.1 },
    { value: "open", label: "Open to dialogue", probability: 0.3 },
  ],
  cooking: [
    { value: "no_matter", label: "No matter", probability: 1.0 },
    { value: "cant_cook", label: "Can't cook at all", probability: 0.2 },
    { value: "pasta", label: "Can make pasta without burning it", probability: 0.4 },
    { value: "basic", label: "Knows basic recipes", probability: 0.5 },
    { value: "good", label: "Good home cook", probability: 0.3 },
    { value: "excellent", label: "Excellent cook", probability: 0.15 },
    { value: "professional", label: "Professional chef", probability: 0.02 },
    { value: "bbq", label: "BBQ master / Asador", probability: 0.1 },
  ],
}

// Country options
const COUNTRIES = [
  "Argentina",
  "USA",
  "Mexico",
  "Brazil",
  "Spain",
  "Colombia",
  "Chile",
  "Peru",
  "Canada",
  "Germany",
  "France",
  "Italy",
  "UK",
  "Australia",
]

type CalculatorProps = {
  onCalculate: (probability: number, criteria: string[]) => void
}

export function Calculator({ onCalculate }: CalculatorProps) {
  const [country, setCountry] = useState("")
  const [selectedCriteria, setSelectedCriteria] = useState<Record<string, string>>({
    height: "no_matter",
    income: "no_matter",
    car: "no_matter",
    physique: "no_matter",
    marital: "no_matter",
    marriage: "no_matter",
    education: "no_matter",
    kids: "no_matter",
    religion: "no_matter",
    smoking: "no_matter",
    pets: "no_matter",
    languages: "no_matter",
    politics: "no_matter",
    cooking: "no_matter",
  })

  const handleCriterionChange = (category: string, value: string) => {
    setSelectedCriteria({
      ...selectedCriteria,
      [category]: value,
    })
  }

  const calculateProbability = () => {
    // Calculate the combined probability
    let finalProbability = 1
    const selectedLabels: string[] = []

    // Process standard criteria
    Object.entries(selectedCriteria).forEach(([category, value]) => {
      const option = CRITERIA_OPTIONS[category as keyof typeof CRITERIA_OPTIONS].find((opt) => opt.value === value)
      if (option && option.value !== "no_matter") {
        finalProbability *= option.probability
        selectedLabels.push(`${option.label}`)
      }
    })

    // Convert to percentage
    const percentageProbability = finalProbability * 100

    onCalculate(percentageProbability, selectedLabels)
  }

  // Update the JSX with the new typography classes
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-bold text-[20px] md:text-[24px] leading-snug text-[#1F1F1F] mb-4">Select your criteria</h2>
        <p className="font-normal text-[16px] leading-relaxed text-[#555555] mb-6">
          Choose the characteristics you're looking for in your dream guy, and we'll calculate how rare he is!
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="country" className="font-semibold text-[16px] leading-relaxed text-[#333333] block mb-2">
            Country
          </Label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger id="country" className="w-full font-normal text-[16px] leading-relaxed text-[#222222]">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          <h3 className="font-bold text-[18px] md:text-[20px] leading-snug text-[#1F1F1F]">Choose your criteria</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Height */}
            <div>
              <Label htmlFor="height" className="font-semibold text-[16px] leading-relaxed text-[#333333] block mb-2">
                Height
              </Label>
              <Select value={selectedCriteria.height} onValueChange={(value) => handleCriterionChange("height", value)}>
                <SelectTrigger id="height" className="w-full font-normal text-[16px] leading-relaxed text-[#222222]">
                  <SelectValue placeholder="Select height" />
                </SelectTrigger>
                <SelectContent>
                  {CRITERIA_OPTIONS.height.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Income */}
            <div>
              <Label htmlFor="income" className="font-semibold text-[16px] leading-relaxed text-[#333333] block mb-2">
                Annual Income
              </Label>
              <Select value={selectedCriteria.income} onValueChange={(value) => handleCriterionChange("income", value)}>
                <SelectTrigger id="income" className="w-full font-normal text-[16px] leading-relaxed text-[#222222]">
                  <SelectValue placeholder="Select income" />
                </SelectTrigger>
                <SelectContent>
                  {CRITERIA_OPTIONS.income.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Car */}
            <div>
              <Label htmlFor="car" className="font-semibold text-[16px] leading-relaxed text-[#333333] block mb-2">
                Car Ownership
              </Label>
              <Select value={selectedCriteria.car} onValueChange={(value) => handleCriterionChange("car", value)}>
                <SelectTrigger id="car" className="w-full font-normal text-[16px] leading-relaxed text-[#222222]">
                  <SelectValue placeholder="Select car ownership" />
                </SelectTrigger>
                <SelectContent>
                  {CRITERIA_OPTIONS.car.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Physical Shape */}
            <div>
              <Label htmlFor="physique" className="font-semibold text-[16px] leading-relaxed text-[#333333] block mb-2">
                Physical Shape
              </Label>
              <Select
                value={selectedCriteria.physique}
                onValueChange={(value) => handleCriterionChange("physique", value)}
              >
                <SelectTrigger id="physique" className="w-full font-normal text-[16px] leading-relaxed text-[#222222]">
                  <SelectValue placeholder="Select physical shape" />
                </SelectTrigger>
                <SelectContent>
                  {CRITERIA_OPTIONS.physique.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Marital Status */}
            <div>
              <Label htmlFor="marital" className="font-semibold text-[16px] leading-relaxed text-[#333333] block mb-2">
                Marital Status
              </Label>
              <Select
                value={selectedCriteria.marital}
                onValueChange={(value) => handleCriterionChange("marital", value)}
              >
                <SelectTrigger id="marital" className="w-full font-normal text-[16px] leading-relaxed text-[#222222]">
                  <SelectValue placeholder="Select marital status" />
                </SelectTrigger>
                <SelectContent>
                  {CRITERIA_OPTIONS.marital.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Marriage */}
            <div>
              <Label htmlFor="marriage" className="font-semibold text-[16px] leading-relaxed text-[#333333] block mb-2">
                Wants to Get Married
              </Label>
              <Select
                value={selectedCriteria.marriage}
                onValueChange={(value) => handleCriterionChange("marriage", value)}
              >
                <SelectTrigger id="marriage" className="w-full font-normal text-[16px] leading-relaxed text-[#222222]">
                  <SelectValue placeholder="Select marriage preference" />
                </SelectTrigger>
                <SelectContent>
                  {CRITERIA_OPTIONS.marriage.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Education */}
            <div>
              <Label
                htmlFor="education"
                className="font-semibold text-[16px] leading-relaxed text-[#333333] block mb-2"
              >
                Level of Education
              </Label>
              <Select
                value={selectedCriteria.education}
                onValueChange={(value) => handleCriterionChange("education", value)}
              >
                <SelectTrigger id="education" className="w-full font-normal text-[16px] leading-relaxed text-[#222222]">
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  {CRITERIA_OPTIONS.education.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Kids */}
            <div>
              <Label htmlFor="kids" className="font-semibold text-[16px] leading-relaxed text-[#333333] block mb-2">
                Has Kids
              </Label>
              <Select value={selectedCriteria.kids} onValueChange={(value) => handleCriterionChange("kids", value)}>
                <SelectTrigger id="kids" className="w-full font-normal text-[16px] leading-relaxed text-[#222222]">
                  <SelectValue placeholder="Select kids status" />
                </SelectTrigger>
                <SelectContent>
                  {CRITERIA_OPTIONS.kids.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Religion */}
            <div>
              <Label htmlFor="religion" className="font-semibold text-[16px] leading-relaxed text-[#333333] block mb-2">
                Religion / Spirituality
              </Label>
              <Select
                value={selectedCriteria.religion}
                onValueChange={(value) => handleCriterionChange("religion", value)}
              >
                <SelectTrigger id="religion" className="w-full font-normal text-[16px] leading-relaxed text-[#222222]">
                  <SelectValue placeholder="Select religion" />
                </SelectTrigger>
                <SelectContent>
                  {CRITERIA_OPTIONS.religion.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Smoking */}
            <div>
              <Label htmlFor="smoking" className="font-semibold text-[16px] leading-relaxed text-[#333333] block mb-2">
                Smoking Habits
              </Label>
              <Select
                value={selectedCriteria.smoking}
                onValueChange={(value) => handleCriterionChange("smoking", value)}
              >
                <SelectTrigger id="smoking" className="w-full font-normal text-[16px] leading-relaxed text-[#222222]">
                  <SelectValue placeholder="Select smoking habits" />
                </SelectTrigger>
                <SelectContent>
                  {CRITERIA_OPTIONS.smoking.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Pets */}
            <div>
              <Label htmlFor="pets" className="font-semibold text-[16px] leading-relaxed text-[#333333] block mb-2">
                Pet Lover
              </Label>
              <Select value={selectedCriteria.pets} onValueChange={(value) => handleCriterionChange("pets", value)}>
                <SelectTrigger id="pets" className="w-full font-normal text-[16px] leading-relaxed text-[#222222]">
                  <SelectValue placeholder="Select pet preference" />
                </SelectTrigger>
                <SelectContent>
                  {CRITERIA_OPTIONS.pets.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Languages */}
            <div>
              <Label
                htmlFor="languages"
                className="font-semibold text-[16px] leading-relaxed text-[#333333] block mb-2"
              >
                Languages Spoken
              </Label>
              <Select
                value={selectedCriteria.languages}
                onValueChange={(value) => handleCriterionChange("languages", value)}
              >
                <SelectTrigger id="languages" className="w-full font-normal text-[16px] leading-relaxed text-[#222222]">
                  <SelectValue placeholder="Select languages" />
                </SelectTrigger>
                <SelectContent>
                  {CRITERIA_OPTIONS.languages.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Politics */}
            <div>
              <Label htmlFor="politics" className="font-semibold text-[16px] leading-relaxed text-[#333333] block mb-2">
                Political Views
              </Label>
              <Select
                value={selectedCriteria.politics}
                onValueChange={(value) => handleCriterionChange("politics", value)}
              >
                <SelectTrigger id="politics" className="w-full font-normal text-[16px] leading-relaxed text-[#222222]">
                  <SelectValue placeholder="Select political views" />
                </SelectTrigger>
                <SelectContent>
                  {CRITERIA_OPTIONS.politics.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Cooking */}
            <div>
              <Label htmlFor="cooking" className="font-semibold text-[16px] leading-relaxed text-[#333333] block mb-2">
                Cooking Skills
              </Label>
              <Select
                value={selectedCriteria.cooking}
                onValueChange={(value) => handleCriterionChange("cooking", value)}
              >
                <SelectTrigger id="cooking" className="w-full font-normal text-[16px] leading-relaxed text-[#222222]">
                  <SelectValue placeholder="Select cooking skills" />
                </SelectTrigger>
                <SelectContent>
                  {CRITERIA_OPTIONS.cooking.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <Button
          onClick={calculateProbability}
          disabled={!country}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-6"
        >
          <CalculatorIcon className="mr-2 h-5 w-5" />{" "}
          <span className="font-bold text-[18px] tracking-[0.5px] uppercase text-white">Calculate Your Chances</span>
        </Button>
      </div>
    </div>
  )
}
