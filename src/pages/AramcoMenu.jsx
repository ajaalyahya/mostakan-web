// src/pages/AramcoMenu.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useLang } from "../context/LanguageContext";
import { tr } from "../i18n/translations";

import ryal    from "../assets/images/ryal.png";
import menuLogo  from "../assets/images/mostakanMain.png";
import header    from "../assets/images/menuHeader2.mp4";
import Footer    from "../components/layout/Footer";

// قاموس مسببات الحساسية للعملاء (محدث بالكامل ليطابق لوحة التحكم)
const ALLERGEN_DICT = {
  dairy: { icon: "🥛", label: "Dairy" },
  nuts: { icon: "🥜", label: "Nuts" },
  peanuts: { icon: "🥜", label: "Peanuts" },
  soy: { icon: "🫘", label: "Soy" },
  grains: { icon: "🌾", label: "Grains" },
  sesame: { icon: "⚪", label: "Sesame" },
  eggs: { icon: "🥚", label: "Eggs" },
  gluten: { icon: "🌾", label: "Gluten" },
};

export default function AramcoMenu() {
  const { lang, setLang } = useLang();
  const [activeCategory, setActiveCategory] = useState(null);
  const [fbCategories, setFbCategories]     = useState([]);
  const [fbProducts, setFbProducts]         = useState({});
  const [loading, setLoading]               = useState(true);

  useEffect(() => {
    if (setLang) {
      setLang("en");
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const catsSnap = await getDocs(collection(db, "categories"));
        const catsData = catsSnap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((c) => c.branch === "aramco" || c.branch === "both" || !c.branch);
        catsData.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

        const prodsSnap = await getDocs(collection(db, "products"));
        const prodsData = prodsSnap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((p) => p.branch === "aramco" || p.branch === "both" || !p.branch);

        const grouped = {};
        catsData.forEach((cat) => {
          grouped[cat.name] = prodsData
            .filter((p) => p.category === cat.name || p.categoryId === cat.id)
            .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
        });

        if (isMounted) {
          setFbCategories(catsData);
          setFbProducts(grouped);
        }
      } catch (e) {
        console.error("Error fetching Firestore menu data:", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const catLabel = (cat) => {
    return lang === "ar"
      ? cat.nameAr || cat.name || cat.nameEn
      : cat.nameEn || cat.name || cat.nameAr;
  };

  const prodName = (item) => {
    return lang === "ar"
      ? item.nameAr || item.name || item.nameEn
      : item.nameEn || item.name || item.nameAr;
  };

  const prodDesc = (item) => {
    return lang === "ar"
      ? item.descAr || item.desc || item.descEn
      : item.descEn || item.desc || item.descAr;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-[var(--secColor)] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full relative min-h-screen">
      {/* Header */}
      <div className="relative h-52 sm:h-60 md:h-64 w-full overflow-hidden">
        <video
          src={header}
          className="h-full w-full object-cover object-top scale-105 transition-transform duration-[20000ms] ease-in-out"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 z-10 p-2">
          <Link to="/" className="inline-block transition">
            <img
              src={menuLogo}
              alt="menu logo"
              loading="lazy"
              className="w-16 sm:w-20 md:w-24 rounded-full object-contain"
            />
          </Link>

          <span className="text-sm sm:text-base font-bold text-white bg-black/50 backdrop-blur-md px-4 py-1 rounded-full border border-white/20 shadow-lg">
            {lang === "ar" ? "القائمة لفرع أرامكو" : "Aramco Branch Menu"}
          </span>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 mt-1 text-xs font-bold text-[#4a3525] bg-[#f5e6d3] hover:bg-[#e8d5c4] px-4 py-1.5 rounded-full shadow-md border border-[#e2cfb9] transition-all duration-200 active:scale-95"
          >
            <span>{lang === "ar" ? "الانتقال للقائمة الرئيسية" : "Switch to Main Menu"}</span>
          </Link>
        </div>
      </div>

      {/* Category Bar */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        <div className="flex gap-2 overflow-x-auto px-4 py-3 sm:gap-3 sm:px-6 lg:justify-center lg:overflow-visible no-scrollbar">
          <button
            onClick={() => setActiveCategory(null)}
            className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm sm:px-5 sm:py-2 sm:text-base transition ${
              activeCategory === null
                ? "bg-[var(--secColor)] text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tr("menu_all", lang)}
          </button>
          {fbCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm sm:px-5 sm:py-2 sm:text-base transition ${
                activeCategory === cat.name
                  ? "bg-[var(--secColor)] text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {catLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="py-4 px-4 pb-28 sm:pb-10">
        {activeCategory === null ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
            {fbCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className="overflow-hidden rounded-2xl bg-white shadow"
              >
                <img
                  src={cat.imageUrl || cat.img}
                  loading="lazy"
                  alt={catLabel(cat)}
                  className="h-28 sm:h-32 md:h-56 w-full object-cover"
                />
                <div className="p-3 text-center font-semibold text-sm sm:text-base">
                  {catLabel(cat)}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(fbProducts[activeCategory] || []).map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl bg-white shadow flex flex-col"
                >
                  <img
                    src={item.img || item.imageUrl}
                    loading="lazy"
                    alt={prodName(item)}
                    className="h-28 sm:h-40 md:h-56 w-full object-cover"
                  />
                  <div className="p-3 text-center space-y-1 flex flex-col flex-1">
                    <h3 className="font-semibold text-sm sm:text-base">{prodName(item)}</h3>
                    <p className="text-[11px] sm:text-sm text-gray-500 line-clamp-2 flex-1">
                      {prodDesc(item)}
                    </p>
                    <div className="mt-auto space-y-1">
                      <div className="flex justify-center items-center gap-1 font-bold text-[var(--secColor)] text-base sm:text-xl">
                        {item.price}
                        <img
                          src={ryal}
                          loading="lazy"
                          alt="SAR"
                          className="h-3 w-3 sm:h-4 sm:w-4"
                        />
                      </div>
                      {item.cal && (
                        <div className="text-[10px] sm:text-xs text-gray-400">
                          {item.cal} {tr("menu_calories", lang)}
                        </div>
                      )}

                      {/* البيانات الرياضية والصحية */}
                      {(Boolean(item.walkMinutes) || Boolean(item.runMinutes) || Boolean(item.caffeine)) && (
                        <div className="flex flex-wrap justify-center items-center gap-1.5 pt-1 mt-1 border-t border-gray-100 text-[10px] sm:text-xs text-gray-600 font-medium">
                          {Boolean(item.walkMinutes) && <span>🚶‍♂️ {item.walkMinutes} min walk</span>}
                          {Boolean(item.runMinutes) && <span>🏃‍♂️ {item.runMinutes} min run</span>}
                          {Boolean(item.caffeine) && <span>☕ {item.caffeine} mg caffeine</span>}
                        </div>
                      )}

                      {/* شريط عرض مسببات الحساسية بتصميم مرتب ومتناسق */}
                      {item.allergens && item.allergens.length > 0 && (
                        <div className="flex flex-wrap justify-center items-center gap-1 pt-1 mt-1 border-t border-gray-100 text-[10px]">
                          {item.allergens.map((algId) => {
                            const alg = ALLERGEN_DICT[algId];
                            if (!alg) return null;
                            return (
                              <span
                                key={algId}
                                className="bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded-md border border-amber-200/50 flex items-center gap-1"
                                title={`Contains ${alg.label}`}
                              >
                                <span>{alg.icon}</span>
                                <span className="font-medium text-[9px]">{alg.label}</span>
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {(fbProducts[activeCategory] || []).length === 0 && (
              <div className="text-center text-gray-400 py-16">
                {tr("menu_empty", lang)}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}