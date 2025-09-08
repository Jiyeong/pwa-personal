import {Languages} from "lucide-react";
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"

export function LanguageButton() {
  const { language, toggleLanguage } = useLanguage();

  const handleClick = () => {

  }

  return (
    <Button
      onClick={toggleLanguage}
      className="flex items-center gap-2 border-0 cursor-pointer"
      size="sm"
    >
      <Languages/>
      <span className="ml-1 text-xs font-bold">
        {language === 'ko' ? 'EN' : 'KO'}
      </span>
    </Button>
  )
}