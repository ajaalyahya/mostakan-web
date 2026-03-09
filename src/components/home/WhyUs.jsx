// src/components/home/WhyUs.jsx
import { Link } from "react-router-dom";
import product1 from "../../assets/images/drinks/qorytea.jpg";
import product2 from "../../assets/images/drinks/lemon.png";
import product3 from "../../assets/images/food/senabon2.jpg";
import { useLang } from "../../context/LanguageContext";
import { tr } from "../../i18n/translations";

function WhyUs() {
  const { lang } = useLang();

  const products = [
    { img: product1, nameKey: "whyus_p1_name", descKey: "whyus_p1_desc" },
    { img: product2, nameKey: "whyus_p2_name", descKey: "whyus_p2_desc" },
    { img: product3, nameKey: "whyus_p3_name", descKey: "whyus_p3_desc" },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#fffefb] text-center">
      <h2 className="text-2xl md:text-4xl font-bold mb-10 md:mb-12 text-[var(--firColor)]">
        {tr("whyus_title", lang)}
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-6">
        {products.map((p, i) => (
          <div key={i} className="bg-[var(--trdColor)] shadow-lg rounded-2xl p-5 md:p-6 flex flex-col items-center">
            <img src={p.img} alt={tr(p.nameKey, lang)} className="w-full h-40 object-cover mb-4 rounded-lg" />
            <h3 className="text-lg md:text-xl font-semibold mb-3 text-[var(--firColor)]">
              {tr(p.nameKey, lang)}
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              {tr(p.descKey, lang)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 md:mt-12">
        <Link
          to="/menu"
          className="inline-block bg-[var(--firColor)] text-[var(--trdColor)] font-bold px-8 md:px-10 py-3 md:py-4 rounded-full hover:bg-[var(--secColor)] transition"
        >
          {tr("whyus_btn", lang)}
        </Link>
      </div>
    </section>
  );
}

export default WhyUs;
