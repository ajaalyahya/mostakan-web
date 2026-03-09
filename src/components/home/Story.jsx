// src/components/home/Story.jsx
import { useEffect, useRef } from "react";
import teaCup from "../../assets/images/gptea.png";
import mint1 from "../../assets/images/mint1.png";
import mint2 from "../../assets/images/mint2.png";
import { useLang } from "../../context/LanguageContext";
import { tr } from "../../i18n/translations";

const mints = [
  { image: mint1, radius: 120, angle: 30,  speed: 0.2,  size: 25 },
  { image: mint2, radius: 150, angle: 90,  speed: 0.18, size: 26 },
  { image: mint2, radius: 135, angle: 130, speed: 0.2,  size: 30 },
  { image: mint1, radius: 110, angle: 150, speed: 0.22, size: 22 },
  { image: mint2, radius: 170, angle: 210, speed: 0.19, size: 30 },
  { image: mint1, radius: 140, angle: 300, speed: 0.21, size: 24 },
  { image: mint1, radius: 95,  angle: 60,  speed: 0.17, size: 21 },
  { image: mint2, radius: 145, angle: 120, speed: 0.2,  size: 22 },
  { image: mint1, radius: 120, angle: 240, speed: 0.18, size: 30 },
  { image: mint2, radius: 160, angle: 330, speed: 0.21, size: 20 },
  { image: mint1, radius: 130, angle: 270, speed: 0.19, size: 18 },
  { image: mint1, radius: 110, angle: 15,  speed: 0.2,  size: 20 },
  { image: mint2, radius: 140, angle: 75,  speed: 0.18, size: 18 },
  { image: mint1, radius: 155, angle: 135, speed: 0.22, size: 22 },
  { image: mint2, radius: 165, angle: 195, speed: 0.19, size: 30 },
  { image: mint1, radius: 175, angle: 255, speed: 0.21, size: 20 },
  { image: mint1, radius: 180, angle: 315, speed: 0.17, size: 18 },
  { image: mint2, radius: 125, angle: 45,  speed: 0.2,  size: 22 },
  { image: mint1, radius: 115, angle: 105, speed: 0.18, size: 35 },
  { image: mint2, radius: 150, angle: 225, speed: 0.21, size: 25 },
  { image: mint1, radius: 165, angle: 285, speed: 0.19, size: 24 },
  { image: mint1, radius: 145, angle: 235, speed: 0.14, size: 23 },
];

function StoryParallax() {
  const cupRef       = useRef(null);
  const mintRefs     = useRef([]);
  const containerRef = useRef(null);
  mintRefs.current   = [];

  const addMintRef = (el) => {
    if (el && !mintRefs.current.includes(el)) mintRefs.current.push(el);
  };

  const { lang } = useLang();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !cupRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const cupRect       = cupRef.current.getBoundingClientRect();

      // مركز الاستكانة داخل الـ container
      const cupCenterX = cupRect.left - containerRect.left + cupRect.width  / 2;
      const cupCenterY = cupRect.top  - containerRect.top  + cupRect.height / 2;

      const scrollY  = window.scrollY;
      const isMobile = containerRect.width < 420;

      mintRefs.current.forEach((mint) => {
        const radius      = parseFloat(mint.dataset.radius);
        const angle       = parseFloat(mint.dataset.angle);
        const speed       = parseFloat(mint.dataset.speed);
        const finalRadius = radius * (isMobile ? 0.7 : 1);

        const newAngle = angle + scrollY * speed;
        const rad      = (newAngle * Math.PI) / 180;
        const x        = finalRadius * Math.cos(rad);
        const y = finalRadius * Math.sin(rad) - scrollY * 0.06 + (isMobile ? 40 : 0);

        mint.style.left      = `${cupCenterX}px`;
        mint.style.top       = `${cupCenterY}px`;
        mint.style.transform = `translate(${x}px, ${y}px) rotate(${newAngle}deg)`;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="story" className="py-12 px-6 md:px-40 bg-amber-50 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-26 items-center">

        {/* النص */}
        <div className="bg-white mr-50 p-8 md:p-10 rounded-2xl shadow-lg z-10 mx-auto text-center md:text-right">
          <h2 className="text-3xl text-[var(--firColor)] font-bold mb-6">
            {tr("story_title", lang)}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {tr("story_desc", lang)}
          </p>
          <a
            href="https://maps.app.goo.gl/WQ7NThBALGYSNnTt9"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-[var(--firColor)] hover:bg-[var(--secColor)] text-[var(--trdColor)] font-semibold px-6 py-2 rounded-lg transition"
          >
            {tr("story_btn", lang)}
          </a>
        </div>

        {/* الاستكانة والنعناع */}
        <div
          ref={containerRef}
          className="relative h-[360px] md:h-[420px] flex items-center justify-center md:justify-end"
        >
          <img
            ref={cupRef}
            src={teaCup}
            className="w-64 md:w-96 z-10 translate-x-[0] md:translate-x-[-30px] translate-y-[-20px]"
            alt="استكانة شاي"
          />

          {mints.map((mint, idx) => (
            <img
              key={idx}
              ref={addMintRef}
              src={mint.image}
              data-radius={mint.radius}
              data-angle={mint.angle}
              data-speed={mint.speed}
              className="absolute z-20 will-change-transform"
              style={{
                width: `${mint.size}px`,
                top: "50%",
                left: "50%",
                transform: `translate(${mint.radius}px, 0) rotate(${mint.angle}deg)`,
                transformOrigin: "center center",
              }}
              alt=""
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default StoryParallax;