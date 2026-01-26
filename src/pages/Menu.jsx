import { useState } from "react";
import ryal from "../assets/images/ryal.png";
import menuLogo from "../assets/images/menuLogo.png";
import header from "../assets/images/drinks/menuWall.jpg";
import Footer from "../components/layout/Footer";

import karkadieh from "../assets/images/drinks/karkadieh.jpg";
import kho5 from "../assets/images/drinks/5o5.jpg";
import qory from "../assets/images/drinks/qory-tea.jpg";
import whiteTea from "../assets/images/drinks/whiteTea.jpg";
import karak from "../assets/images/drinks/karak.jpg";
import qoryKarak from "../assets/images/drinks/qory-karak.png";
import tea from "../assets/images/drinks/tea.jpeg";
import matcha from "../assets/images/drinks/matcha.PNG";
import karka1 from "../assets/images/drinks/karkaWall.jpg";

import cake from "../assets/images/food/cake.jpg";
import cheseCake from "../assets/images/food/cheseCake.jpg";
import choclete from "../assets/images/food/choclete.jpg";
import nuts from "../assets/images/food/nuts.jpg";
import senabon from "../assets/images/food/senabon.jpg";
import tart from "../assets/images/food/tart2.jpg";
import z3tr from "../assets/images/food/z3tr2.jpg";
import cakeWall from "../assets/images/food/cakeWall.jpg";
import baked from "../assets/images/food/baked.PNG";

const categories = [
  { id: null, name: "كامل المنيو" },
  { id: "cold", name: "شاي مثلج" },
  { id: "offers", name: "شاي مختص" },
  { id: "matcha", name: "ماتشا" },
  { id: "hot", name: "شاي ساخن" },
  { id: "food", name: "مأكولات" },
];

const items = {
  cold: [
    {
      id: 1,
      name: "شاي الكركديه المثلج",
      desc: "شاي كركديه بارد ومنعش",
      price: 19,
      calories: 75,
      img: karkadieh,
    },
    {
      id: 2,
      name: "شاي الخوخ المثلج",
      desc: "شاي خوخ بارد ومنعش",
      price: 19,
      calories: 75,
      img: kho5,
    },
  ],
  offers: [
    {
      id: 3,
      name: "الشاي الأبيض",
      desc: "شاي باي مو تان",
      price: 12,
      calories: 1,
      img: whiteTea,
    },
    {
      id: 4,
      name: "الشاي الأخضر",
      desc: "شاي أخضر عضوي",
      price: 12,
      calories: 1,
      img: whiteTea,
    },
  ],
  matcha: [
    {
      id: 5,
      name: "ماتشا لاتيه",
      desc: "ماتشا كريمي مع حليب",
      price: 22,
      calories: 150,
      img: matcha,
    },
  ],
  hot: [
    {
      id: 6,
      name: "قوري شاي",
      desc: "شاي أسود يقدم بقوري",
      price: 29,
      calories: 5,
      img: qory,
    },
    {
      id: 7,
      name: "شاي",
      desc: "شاي كلاسيك",
      price: "6 / 8 / 10",
      calories: 1,
      img: tea,
    },
    {
      id: 8,
      name: "قوري كرك",
      desc: "كرك يقدم بقوري",
      price: 35,
      calories: 1000,
      img: qoryKarak,
    },
    {
      id: 9,
      name: "كرك مستكن",
      desc: "كرك غني بنكهة الهيل",
      price: "10 / 12",
      calories: 250,
      img: karak,
    },
  ],
  food: [
    {
      id: 14,
      name: "تارت اللوز",
      desc: "تارت اللوز",
      price: 9,
      calories: 140,
      img: tart,
    },
    {
      id: 16,
      name: "تشيزكيك مستكن",
      desc: "تشيزكيك مستكن",
      price: 9,
      calories: 140,
      img: cheseCake,
    },
    {
      id: 17,
      name: "كيكة شوكلت ",
      desc: "شوكلت مستكن",
      price: 9,
      calories: 140,
      img: choclete,
    },
    {
      id: 12,
      name: "سكونز",
      desc: "سكونز طازج بالزبدة",
      price: 14,
      calories: 140,
      img: cake,
    },
    {
      id: 15,
      name: "سينابون مستكن",
      desc: "سينابون مستكن",
      price: 9,
      calories: 140,
      img: senabon,
    },
    {
      id: 11,
      name: "مخبوزات",
      desc: "زعتر، لبنة، لبنة زعتر، لبنة عسل، جبن",
      price: 9,
      calories: 350,
      img: baked,
    },
    {
      id: 13,
      name: "كيكة الزعتر",
      desc: "كيكة زعتر منزلية",
      price: 9,
      calories: 140,
      img: z3tr,
    },
    {
      id: 10,
      name: "مكسرات",
      desc: "مكسرات محمصة مشكلة",
      price: 8,
      calories: 160,
      img: nuts,
    },
  ],
};

const fullMenuImages = {
  cold: karka1,
  offers: whiteTea,
  matcha: matcha,
  hot: qory,
  food: cakeWall,
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="relative h-40 sm:h-48 md:h-56 w-full">
        <img
          src={header}
          className="h-full w-full object-cover"
          alt="menu header"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
          <img
            src={menuLogo}
            alt="menu logo"
            loading="lazy"
            className="w-20 rounded-full sm:w-24 md:w-28 object-contain"
          />

          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            قائمة الطعام
          </h1>
        </div>
      </div>

      {/* Category Bar */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        <div className="flex gap-2 overflow-x-auto px-4 py-3 sm:gap-3 sm:px-6 lg:justify-center lg:overflow-visible no-scrollbar">
          {categories.map((cat) => (
            <button
              key={String(cat.id)}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm sm:px-5 sm:py-2 sm:text-base transition ${
                activeCategory === cat.id
                  ? "bg-[var(--secColor)] text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="py-4 px-4 pb-10">
        {activeCategory === null ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
            {categories
              .filter((c) => c.id !== null)
              .map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="overflow-hidden rounded-2xl bg-white shadow"
                >
                  <img
                    src={fullMenuImages[cat.id]}
                    loading="lazy"
                    alt={cat.name}
                    className="h-28 sm:h-32 md:h-56 w-full object-cover"
                  />
                  <div className="p-3 text-center font-semibold text-sm sm:text-base">
                    {cat.name}
                  </div>
                </button>
              ))}
          </div>
        ) : (
          <>
            {/* الجوال */}
            <div className="grid grid-cols-2 gap-4 sm:hidden">
              {items[activeCategory]?.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl bg-white shadow"
                >
                  <img
                    src={item.img}
                    loading="lazy"
                    alt={item.name}
                    className="h-28 w-full object-cover"
                  />
                  <div className="p-3 text-center space-y-1">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <p className="text-[11px] text-gray-500 line-clamp-2">
                      {item.desc}
                    </p>
                    <div className="flex justify-center items-center gap-1 font-bold text-[var(--secColor)]">
                      {item.price}
                      <img src={ryal} loading="lazy" alt="SAR" className="h-3 w-3" />
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {item.calories} سعرة
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* التابلت + الدسكتوب */}
            <div className="hidden sm:grid grid-cols-2 gap-4 lg:grid-cols-3">
              {items[activeCategory]?.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl bg-white shadow"
                >
                  <img
                    src={item.img}
                    loading="lazy"
                    className="h-36 sm:h-40 md:h-56 w-full object-cover"
                    alt={item.name}
                  />
                  <div className="p-4 space-y-1 text-right">
                    <h3 className="font-semibold text-sm sm:text-base">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {item.desc}
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="font-bold text-lg sm:text-xl text-[var(--secColor)] flex items-center gap-1">
                        {item.price}
                        <img src={ryal} loading="lazy" alt="SAR" className="h-4 w-4" />
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-400">
                        {item.calories} سعرة
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
