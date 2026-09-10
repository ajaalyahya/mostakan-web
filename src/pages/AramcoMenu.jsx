// src/pages/AramcoMenu.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useLang } from "../context/LanguageContext";
import { tr } from "../i18n/translations";

import ryal      from "../assets/images/ryal.png";
import menuLogo  from "../assets/images/mostakanMain.png";
import header    from "../assets/images/menuHeader2.mp4";
import Footer    from "../components/layout/Footer";

import karkadieh from "../assets/images/drinks/karkadieh.webp";
import kho5      from "../assets/images/drinks/5o5.webp";
import lemon     from "../assets/images/drinks/lemon.png";
import qory      from "../assets/images/drinks/qory-tea.webp";
import whiteTea  from "../assets/images/drinks/whiteTea.webp";
import karak     from "../assets/images/drinks/karak.webp";
import tea       from "../assets/images/drinks/tea.webp";
import matcha    from "../assets/images/drinks/matcha3.jpg";
import karka1    from "../assets/images/drinks/karkaWall.webp";
import cake      from "../assets/images/food/cake.webp";
import choclete  from "../assets/images/food/choclete.webp";
import nuts      from "../assets/images/food/nuts.webp";
import senabon   from "../assets/images/food/senabon.webp";
import tart      from "../assets/images/food/tart2.webp";
import z3tr      from "../assets/images/food/z3tr2.webp";
import cakeWall  from "../assets/images/food/cakeWall.webp";
import baked     from "../assets/images/food/baked.webp";

const catNameMap = {
  "شاي مثلج": "cat_cold",
  "شاي ساخن": "cat_hot",
  "مأكولات": "cat_food",
  "شاي مختص": "cat_offers",
};

const prodTransMap = {
  "شاي الكركديه المثلج": { nameKey: "prod_karkadieh", descKey: "desc_karkadieh" },
  "شاي الخوخ المثلج":    { nameKey: "prod_kho5",      descKey: "desc_kho5"      },
  "شاي الليمون المثلج":  { nameKey: "prod_lemon",     descKey: "desc_lemon"     },
  "ماتشا لاتيه":         { nameKey: "prod_matcha",    descKey: "desc_matcha"    },
  "الشاي الأبيض":        { nameKey: "prod_whiteTea",  descKey: "desc_whiteTea"  },
  "الشاي الأخضر":        { nameKey: "prod_greenTea",  descKey: "desc_greenTea"  },
  "قوري شاي":            { nameKey: "prod_qory",      descKey: "desc_qory"      },
  "شاي":                 { nameKey: "prod_tea",       descKey: "desc_tea"       },
  "كرك":                 { nameKey: "prod_karak",     descKey: "desc_karak"     },
  "تارت اللوز":          { nameKey: "prod_tart",      descKey: "desc_tart"      },
  "براونيز":             { nameKey: "prod_brownies",  descKey: "desc_brownies"  },
  "سكونز":               { nameKey: "prod_scones",    descKey: "desc_scones"    },
  "سينامون بايتس":       { nameKey: "prod_cinnamon",  descKey: "desc_cinnamon"  },
  "مخبوزات":             { nameKey: "prod_baked",     descKey: "desc_baked"     },
  "كيكة الزعتر":         { nameKey: "prod_zatar",     descKey: "desc_zatar"     },
  "مكسرات":              { nameKey: "prod_nuts",      descKey: "desc_nuts"      },
};

const staticCategories = [
  { id: "cold",   name: "شاي مثلج", imageUrl: karka1,   branch: "aramco" },
  { id: "hot",    name: "شاي ساخن", imageUrl: qory,     branch: "aramco" },
  { id: "food",   name: "مأكولات",  imageUrl: cakeWall, branch: "aramco" },
  { id: "offers", name: "شاي مختص", imageUrl: whiteTea, branch: "aramco" },
];

export default function AramcoMenu() {
  const { lang, setLang, toggleLang } = useLang();
  const [activeCategory, setActiveCategory] = useState(null);
  const [fbCategories, setFbCategories]     = useState([]);
  const [fbProducts, setFbProducts]         = useState({});
  const [loading, setLoading]               = useState(true);

  // ضبط اللغة الافتراضية للإنجليزية عند تحميل المكون لمرة واحدة فقط
  useEffect(() => {
    if (setLang) {
      setLang("en");
    }
  }, []); // مصروفة مصفوفة الاعتماد فارغة لتجنب التكرار اللانهائي

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const catsSnap = await getDocs(collection(db, "categories"));
        const catsData = catsSnap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((c) => c.branch === "aramco" || c.branch === "both");
        catsData.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

        const prodsSnap = await getDocs(collection(db, "products"));
        const prodsData = prodsSnap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((p) => p.branch === "aramco" || p.branch === "both");

        const grouped = {};
        catsData.forEach((cat) => {
          grouped[cat.name] = prodsData
            .filter((p) => p.category === cat.name)
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

  const fbCatNames    = fbCategories.map((c) => c.name);
  const allFbCats     = fbCategories.map((fbCat) => {
    const staticCat = staticCategories.find((s) => s.name === fbCat.name);
    return { ...fbCat, imageUrl: fbCat.imageUrl || staticCat?.imageUrl || "" };
  });
  const extraStatic   = staticCategories.filter((c) => !fbCatNames.includes(c.name));
  const allCategories = [...allFbCats, ...extraStatic];

  const allProducts = {};
  allCategories.forEach((cat) => {
    allProducts[cat.name] = fbProducts[cat.name] || [];
  });

  const catLabel = (cat) => {
    if (cat.nameAr || cat.nameEn) {
      return lang === "ar"
        ? cat.nameAr || cat.nameEn
        : cat.nameEn || cat.nameAr;
    }
    const k = catNameMap[cat.name];
    return k ? tr(k, lang) : cat.name;
  };

  const prodName = (item) => {
    if (item.nameAr || item.nameEn) {
      return lang === "ar"
        ? item.nameAr || item.nameEn
        : item.nameEn || item.nameAr;
    }
    const m = prodTransMap[item.name];
    return m ? tr(m.nameKey, lang) : item.name;
  };

  const prodDesc = (item) => {
    if (item.descAr || item.descEn) {
      return lang === "ar"
        ? item.descAr || item.descEn
        : item.descEn || item.descAr;
    }
    const m = prodTransMap[item.name];
    return m ? tr(m.descKey, lang) : item.desc;
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
      <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            {tr("menu_title", lang)}
          </h1>

          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/90 bg-black/50 backdrop-blur-sm px-3.5 py-1 rounded-full border border-white/20 shadow-sm">
  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
     Aramco Branch
</span>

          <Link
            to="/menu"
            className="hidden sm:inline-flex items-center gap-1.5 mt-1 text-[11px] text-white/70 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 transition-all duration-200"
          >
            <span>🏛️</span>
            <span>Main Branch</span>
            <span className="rtl:rotate-180 text-[9px] opacity-70">➔</span>
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
          {allCategories.map((cat) => (
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
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className="overflow-hidden rounded-2xl bg-white shadow"
              >
                <img
                  src={cat.imageUrl}
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
            {/* Mobile View */}
            <div className="grid grid-cols-2 gap-4 sm:hidden">
              {(allProducts[activeCategory] || []).map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl bg-white shadow flex flex-col"
                >
                  <img
                    src={item.img}
                    loading="lazy"
                    alt={prodName(item)}
                    className="h-28 w-full object-cover"
                  />
                  <div className="p-3 text-center space-y-1 flex flex-col flex-1">
                    <h3 className="font-semibold text-sm">{prodName(item)}</h3>
                    <p className="text-[11px] text-gray-500 line-clamp-2 flex-1">
                      {prodDesc(item)}
                    </p>
                    <div className="mt-auto space-y-1">
                      <div className="flex justify-center items-center gap-1 font-bold text-[var(--secColor)]">
                        {item.price}
                        <img
                          src={ryal}
                          loading="lazy"
                          alt="SAR"
                          className="h-3 w-3"
                        />
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {item.cal} {tr("menu_calories", lang)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden sm:grid grid-cols-2 gap-4 lg:grid-cols-3">
              {(allProducts[activeCategory] || []).map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl bg-white shadow"
                >
                  <img
                    src={item.img}
                    loading="lazy"
                    className="h-36 sm:h-40 md:h-56 w-full object-cover"
                    alt={prodName(item)}
                  />
                  <div className="p-4 space-y-1 text-right">
                    <h3 className="font-semibold text-sm sm:text-base">
                      {prodName(item)}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {prodDesc(item)}
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="font-bold text-lg sm:text-xl text-[var(--secColor)] flex items-center gap-1">
                        {item.price}
                        <img
                          src={ryal}
                          loading="lazy"
                          alt="SAR"
                          className="h-4 w-4"
                        />
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-400">
                        {item.cal} {tr("menu_calories", lang)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {(allProducts[activeCategory] || []).length === 0 && (
              <div className="text-center text-gray-400 py-16">
                {tr("menu_empty", lang)}
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating Main Branch Button (Mobile) */}
      <div className="sm:hidden fixed bottom-6 right-6 z-40 w-[45%] max-w-[260px]">
        <Link
          to="/menu"
          className="flex items-center justify-between bg-gray-900/95 text-white backdrop-blur-md px-2.5 py-2 rounded-full shadow-2xl border border-white/20 active:scale-95 transition-all group"
        >
          <div className="flex items-center gap-1.5">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--secColor)] text-white text-xs shadow-sm flex-shrink-0">
              📋
            </span>
            <div className="flex flex-col text-right">
              <span className="text-[11px] font-bold text-white mt-0.5 whitespace-nowrap">
                Main Branch
              </span>
            </div>
          </div>

          <div className="flex items-center gap-0.5 text-[9.5px] font-semibold bg-white/10 px-2 py-0.5 rounded-full flex-shrink-0">
            <span>Move</span>
            <span className="rtl:rotate-0">➔</span>
          </div>
        </Link>
      </div>

      <Footer />
    </div>
  );
}