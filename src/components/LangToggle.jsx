// src/components/LangToggle.jsx
import { useLang } from "../context/LanguageContext";

export default function LangToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <button
      onClick={toggleLang}
      title={lang === "ar" ? "Switch to English" : "تبديل للعربية"}
      className="
        fixed bottom-6 left-6 z-[9999]
        w-12 h-12 rounded-full
        bg-[var(--secColor)] text-[var(--trdColor)]
        font-bold text-sm
        shadow-lg border-2 border-[var(--trdColor)]/30
        flex items-center justify-center
        transition hover:scale-110 active:scale-95
      "
    >
      {lang === "ar" ? "EN" : "ع"}
    </button>
  );
}
