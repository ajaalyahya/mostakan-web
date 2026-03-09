// src/components/home/Hero.jsx
import heroBg from "../../assets/images/hero3.png";
import { Link } from "react-router-dom";
import { useLang } from "../../context/LanguageContext";
import { tr } from "../../i18n/translations";

function Hero() {
  const { lang } = useLang();

  return (
    <section
      id="home"
      className="h-screen bg-center bg-cover relative bg-scroll md:bg-fixed overflow-x-hidden"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="relative z-10 flex items-center justify-center min-h-[100svh] px-6 text-white text-center">
        <div>
          <h1 className="font-bold mb-4 text-3xl sm:text-4xl md:text-5xl">
            {tr("hero_title", lang)}
          </h1>
          <p className="mb-6 text-sm sm:text-base md:text-lg bg-[#243C2C]/50 px-3 rounded-full">
            {tr("hero_desc", lang)}
          </p>
          <Link
            to="/menu"
            className="
              inline-block
              bg-[var(--trdColor)]
              text-[var(--secColor)]
              font-bold
              px-8 py-2
              rounded-full
              transition
              hover:bg-[var(--secColor)]
              hover:text-[var(--trdColor)]
            "
          >
            {tr("hero_btn", lang)}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
