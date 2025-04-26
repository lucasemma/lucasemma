import { Sparkles } from "lucide-react"

export function UnicornHeader() {
  return (
    <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 md:p-8 text-white text-center">
      <h1 className="font-extrabold text-[32px] md:text-[40px] leading-tight tracking-[-0.5px] text-white flex items-center justify-center gap-2">
        <Sparkles className="h-8 w-8" />
        Find Your Unicorn
        <Sparkles className="h-8 w-8" />
      </h1>
      <p className="font-semibold text-[18px] md:text-[20px] leading-relaxed text-white mt-2">
        How Rare Is Your Dream Guy?
      </p>
    </div>
  )
}
