"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Facebook, RefreshCw, Twitter, RainbowIcon as UnicornIcon, PhoneIcon as WhatsApp } from "lucide-react"
import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

type ResultsProps = {
  probability: number
  selectedCriteria: string[]
  onReset: () => void
}

export function Results({ probability, selectedCriteria, onReset }: ResultsProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Trigger confetti if probability is very low (unicorn territory)
    if (probability < 1) {
      setShowConfetti(true)
      const end = Date.now() + 3 * 1000

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#ff49db", "#9b59b6", "#3498db"],
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#ff49db", "#9b59b6", "#3498db"],
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()
    }
  }, [probability])

  // Format the probability to a nice string
  const formattedProbability = probability < 0.01 ? "< 0.01" : probability.toFixed(probability < 1 ? 2 : 1)

  // Get the message based on the probability
  const getMessage = () => {
    if (probability > 20) return "You're picky, but it's doable!"
    if (probability > 5) return "Rare but possible — good luck out there!"
    if (probability > 1) return "Almost unicorn territory… Stay strong!"
    return "Congratulations, you're officially dating Bigfoot."
  }

  // Get emoji and color based on probability
  const getEmojiAndColor = () => {
    if (probability > 20) return { emoji: "🙂", color: "text-green-500" }
    if (probability > 5) return { emoji: "😐", color: "text-yellow-500" }
    if (probability > 1) return { emoji: "😬", color: "text-orange-500" }
    return { emoji: "🦄", color: "text-purple-600" }
  }

  const { emoji, color } = getEmojiAndColor()

  // Share functionality with updated URL
  const shareText = `I found out my dream guy is ${formattedProbability}% rare! ${getMessage()} Check your chances: https://play-date.club/`

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, "_blank")
  }

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://play-date.club/")}&quote=${encodeURIComponent(shareText)}`,
      "_blank",
    )
  }

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank")
  }

  return (
    <div className="space-y-8 text-center">
      <div>
        <h2 className="font-bold text-[20px] md:text-[24px] leading-snug text-[#1F1F1F] text-center mb-6">
          Your Results
        </h2>

        <Card className="p-8 mb-6 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="font-extrabold text-[40px] md:text-[60px] leading-none text-[#1F1F1F] text-center mb-4">
            <span className={color}>{formattedProbability}%</span>
          </div>

          <div className="font-semibold text-[20px] leading-snug text-[#555555] text-center mb-4 flex items-center justify-center gap-2">
            {emoji} {getMessage()} {emoji}
          </div>

          {probability < 1 && (
            <div className="flex justify-center mt-4">
              <UnicornIcon className="h-16 w-16 text-purple-500" />
            </div>
          )}
        </Card>

        <div className="font-normal text-[16px] leading-relaxed text-[#555555] mt-6">
          <p className="mb-2">Based on your selected criteria:</p>
          <ul className="list-disc list-inside text-left max-w-md mx-auto">
            {selectedCriteria.map((criterion, index) => (
              <li key={index}>{criterion}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-[16px] leading-relaxed text-[#333333] text-center">Share your results</h3>
        <div className="flex justify-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={shareOnTwitter}
            className="rounded-full h-12 w-12 bg-[#1DA1F2] text-white hover:bg-[#1a91da]"
          >
            <Twitter className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={shareOnFacebook}
            className="rounded-full h-12 w-12 bg-[#4267B2] text-white hover:bg-[#3b5998]"
          >
            <Facebook className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={shareOnWhatsApp}
            className="rounded-full h-12 w-12 bg-[#25D366] text-white hover:bg-[#22c35e]"
          >
            <WhatsApp className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Button variant="outline" onClick={onReset} className="mt-6">
        <RefreshCw className="mr-2 h-4 w-4" /> <span className="font-medium">Try Again</span>
      </Button>
    </div>
  )
}
