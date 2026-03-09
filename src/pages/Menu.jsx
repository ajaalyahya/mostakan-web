// src/pages/Menu.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useLang } from "../context/LanguageContext";
import { tr } from "../i18n/translations";

import ryal from "../assets/images/ryal.png";
import menuLogo from "../assets/images/mostakanMain.png";
import header from "../assets/images/menuHeader2.mp4";
import Footer from "../components/layout/Footer";

import karkadieh from "../assets/images/drinks/karkadieh.webp";
import kho5       from "../assets/images/drinks/5o5.webp";
import lemon      from "../assets/images/drinks/lemon.png";
import qory       from "../assets/images/drinks/qory-tea.webp";
import whiteTea   from "../assets/images/drinks/whiteTea.webp";
import karak      from "../assets/images/drinks/karak.webp";
import tea        from "../assets/images/drinks/tea.webp";
import matcha     from "../assets/images/drinks/matcha3.jpg";
import karka1     from "../assets/images/drinks/karkaWall.webp";
import cake       from "../assets/images/food/cake.webp";
import choclete   from "../assets/images/food/choclete.webp";
import nuts       from "../assets/images/food/nuts.webp";
import senabon    from "../assets/images/food/senabon.webp";
import tart       from "../assets/images/food/tart2.webp";
import z3tr       from "../assets/images/food/z3tr2.webp";
import cakeWall   from "../assets/images/food/cakeWall.webp";
import baked      from "../assets/images/food/baked.webp";

// ── ترجمة أسماء الأصناف ──
const catNameMap = {
  "شاي مثلج": "cat_cold",
  "شاي ساخن": "cat_hot",
  "مأكولات":  "cat_food",
  "شاي مختص": "cat_offers",
};

// ── ترجمة المنتجات ──
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
  { id: "cold",   name: "شاي مثلج", imageUrl: karka1   },
  { id: "hot",    name: "شاي ساخن", imageUrl: qory     },
  { id: "food",   name: "مأكولات",  imageUrl: cakeWall },
  { id: "offers", name: "شاي مختص", imageUrl: whiteTea },
];

const staticItems = {
  "شاي مثلج": [
    { id: "s1", name: "شاي الكركديه المثلج", desc: "شاي كركديه بارد ومنعش",     price: 19,           cal: 81,  img: karkadieh },
    { id: "s2", name: "شاي الخوخ المثلج",    desc: "شاي خوخ بارد ومنعش",       price: 19,           cal: 75,  img: kho5      },
    { id: "s3", name: "شاي الليمون المثلج",  desc: "شاي ليمون بارد ومنعش",     price: 19,           cal: 89,  img: lemon     },
    { id: "s4", name: "ماتشا لاتيه",         desc: "مذاق الماتشا الأصلي",       price: 22,           cal: 150, img: matcha    },
  ],
  "شاي مختص": [
    { id: "s5", name: "الشاي الأبيض",  desc: "شاي أبيض عضوي",  price: 12, cal: 2, img: whiteTea },
    { id: "s6", name: "الشاي الأخضر", desc: "شاي أخضر عضوي", price: 12, cal: 1, img: whiteTea },
  ],
  "شاي ساخن": [
    { id: "s7",  name: "قوري شاي", desc: "شاي خادر يقدم بقوري",     price: 29,           cal: 5,   img: qory  },
    { id: "s8",  name: "شاي",      desc: "شاي خادر بنكهته الأصيلة", price: "6 / 8 / 10", cal: 1,   img: tea   },
    { id: "s10", name: "كرك",      desc: "كرك غني بنكهته الأصلية",  price: "10 / 12",    cal: 250, img: karak },
  ],
  "مأكولات": [
    { id: "s11", name: "تارت اللوز",     desc: "تارت اللوز بلمسة متقنة ونكهة متوازنة",                  price: 18, cal: 400, img: tart    },
    { id: "s13", name: "براونيز",        desc: "شوكلاتة بطعمها الفريد",                                 price: 17, cal: 320, img: choclete},
    { id: "s14", name: "سكونز",          desc: "بسكوت بريطاني بالجبن والمربى",                          price: 14, cal: 230, img: cake    },
    { id: "s15", name: "سينامون بايتس", desc: "سينامون طري يُحضَّر بإتقان ليكمل لحظاتكم المميزة",      price: 25, cal: 460, img: senabon },
    { id: "s16", name: "مخبوزات",       desc: "زعتر، لبنة، لبنة زعتر، لبنة عسل، جبن",                 price: 9,  cal: 350, img: baked   },
    { id: "s17", name: "كيكة الزعتر",   desc: "كيكة زعتر بحشوة الجبن",                                 price: 9,  cal: 140, img: z3tr    },
    { id: "s18", name: "مكسرات",        desc: "مكسرات مشكلة",                                           price: 8,  cal: 160, img: nuts    },
  ],
};

export default function Menu() {
  const { lang } = useLang();
  const [activeCategory, setActiveCategory] = useState(null);
  const [fbCategories, setFbCategories] = useState([]);
  const [fbProducts, setFbProducts]   = useState({});
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catsSnap = await getDocs(collection(db, "categories"));
        const catsData = catsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        catsData.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

        const prodsSnap = await getDocs(collection(db, "products"));
        const prodsData = prodsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

        const grouped = {};
        catsData.forEach((cat) => {
          grouped[cat.name] = prodsData
            .filter((p) => p.category === cat.name)
            .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
        });

        setFbCategories(catsData);
        setFbProducts(grouped);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ── دمج الأصناف ──
  const allCategories = fbCategories.map((fbCat) => {
    const staticCat = staticCategories.find((s) => s.name === fbCat.name);
    return { ...fbCat, imageUrl: fbCat.imageUrl || staticCat?.imageUrl || "" };
  });
  const fbCatNames  = fbCategories.map((c) => c.name);
  const extraStatic = staticCategories.filter((c) => !fbCatNames.includes(c.name));
  allCategories.push(...extraStatic);

  // ── دمج المنتجات ──
  const allProducts = {};
  allCategories.forEach((cat) => {
    const staticProds   = staticItems[cat.name] || [];
    const fbProds       = fbProducts[cat.name]  || [];
    const fbNames       = fbProds.map((p) => p.name);
    const filteredStatic= staticProds.filter((p) => !fbNames.includes(p.name));
    allProducts[cat.name] = [...filteredStatic, ...fbProds];
  });

  // ── ترجمة اسم الصنف ──
  const catLabel = (cat) => {
    const key = catNameMap[cat.name];
    return key ? tr(key, lang) : cat.name;
  };

  // ── ترجمة اسم / وصف المنتج ──
  const prodName = (item) => {
    const map = prodTransMap[item.name];
    return map ? tr(map.nameKey, lang) : item.name;
  };
  const prodDesc = (item) => {
    const map = prodTransMap[item.name];
    return map ? tr(map.descKey, lang) : item.desc;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-[var(--secColor)] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* Header */}
      <div className="relative h-40 sm:h-48 md:h-56 w-full overflow-hidden">
        <video
          src={header}
          className="h-full w-full object-cover object-top scale-105 transition-transform duration-[20000ms] ease-in-out"
          autoPlay loop muted playsInline
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
          <Link to="/" className="inline-block transition">
            <img src={menuLogo} alt="menu logo" loading="lazy" className="w-20 rounded-full sm:w-24 md:w-28 object-contain" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {tr("menu_title", lang)}
          </h1>
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
      <div className="py-4 px-4 pb-10">
        {activeCategory === null ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className="overflow-hidden rounded-2xl bg-white shadow"
              >
                <img src={cat.imageUrl} loading="lazy" alt={catLabel(cat)} className="h-28 sm:h-32 md:h-56 w-full object-cover" />
                <div className="p-3 text-center font-semibold text-sm sm:text-base">
                  {catLabel(cat)}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <>
            {/* الجوال */}
            <div className="grid grid-cols-2 gap-4 sm:hidden">
              {(allProducts[activeCategory] || []).map((item) => (
                <div key={item.id} className="overflow-hidden rounded-2xl bg-white shadow flex flex-col">
                  <img src={item.img} loading="lazy" alt={prodName(item)} className="h-28 w-full object-cover" />
                  <div className="p-3 text-center space-y-1 flex flex-col flex-1">
                    <h3 className="font-semibold text-sm">{prodName(item)}</h3>
                    <p className="text-[11px] text-gray-500 line-clamp-2 flex-1">{prodDesc(item)}</p>
                    <div className="mt-auto space-y-1">
                      <div className="flex justify-center items-center gap-1 font-bold text-[var(--secColor)]">
                        {item.price}
                        <img src={ryal} loading="lazy" alt="SAR" className="h-3 w-3" />
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {item.cal} {tr("menu_calories", lang)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* التابلت + الدسكتوب */}
            <div className="hidden sm:grid grid-cols-2 gap-4 lg:grid-cols-3">
              {(allProducts[activeCategory] || []).map((item) => (
                <div key={item.id} className="overflow-hidden rounded-2xl bg-white shadow">
                  <img src={item.img} loading="lazy" className="h-36 sm:h-40 md:h-56 w-full object-cover" alt={prodName(item)} />
                  <div className="p-4 space-y-1 text-right">
                    <h3 className="font-semibold text-sm sm:text-base">{prodName(item)}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">{prodDesc(item)}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="font-bold text-lg sm:text-xl text-[var(--secColor)] flex items-center gap-1">
                        {item.price}
                        <img src={ryal} loading="lazy" alt="SAR" className="h-4 w-4" />
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

      <Footer />
    </div>
  );
}
