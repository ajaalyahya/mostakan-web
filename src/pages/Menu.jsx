import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import ryal from "../assets/images/ryal.png";
import menuLogo from "../assets/images/menuLogo.png";
import header from "../assets/images/drinks/menuWall.jpg";
import Footer from "../components/layout/Footer";

import karkadieh from "../assets/images/drinks/karkadieh.webp";
import kho5 from "../assets/images/drinks/5o5.webp";
import lemon from "../assets/images/drinks/lemon.png";
import qory from "../assets/images/drinks/qory-tea.webp";
import whiteTea from "../assets/images/drinks/whiteTea.webp";
import karak from "../assets/images/drinks/karak.webp";
import qoryKarak from "../assets/images/drinks/qory-karak.webp";
import tea from "../assets/images/drinks/tea.webp";
import matcha from "../assets/images/drinks/matcha3.jpg";
import karka1 from "../assets/images/drinks/karkaWall.webp";

import cake from "../assets/images/food/cake.webp";
import cheseCake from "../assets/images/food/cheseCake.webp";
import choclete from "../assets/images/food/choclete.webp";
import nuts from "../assets/images/food/nuts.webp";
import senabon from "../assets/images/food/senabon.webp";
import tart from "../assets/images/food/tart2.webp";
import z3tr from "../assets/images/food/z3tr2.webp";
import cakeWall from "../assets/images/food/cakeWall.webp";
import baked from "../assets/images/food/baked.webp";

const categories = [
  { id: null, name: "القائمة" },
  { id: "cold", name: "شاي مثلج" },
  { id: "hot", name: "شاي ساخن" },
  { id: "food", name: "مأكولات" },
  { id: "offers", name: "شاي مختص" },
];

const items = {
  cold: [
    {
      id: 1,
      name: "شاي الكركديه المثلج",
      desc: "شاي كركديه بارد ومنعش",
      price: 19,
      calories: 81,
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
    {
      id: 3,
      name: "شاي الليمون المثلج",
      desc: "شاي ليمون بارد ومنعش",
      price: 19,
      calories: 89,
      img: lemon,
    },
    {
      id: 4,
      name: "ماتشا لاتيه",
      desc: "مذاق الماتشا الأصلي",
      price: 22,
      calories: 150,
      img: matcha,
    },
  ],
  offers: [
    {
      id: 5,
      name: "الشاي الأبيض",
      desc: "شاي أبيض عضوي",
      price: 12,
      calories: 2,
      img: whiteTea,
    },
    {
      id: 6,
      name: "الشاي الأخضر",
      desc: "شاي أخضر عضوي",
      price: 12,
      calories: 1,
      img: whiteTea,
    },
  ],
  matcha: [
  ],
  hot: [
    {
      id: 7,
      name: "قوري شاي",
      desc: "شاي خادر يقدم بقوري",
      price: 29,
      calories: 5,
      img: qory,
    },
    {
      id: 8,
      name: "شاي",
      desc: "شاي خادر بنكهته الأصيلة",
      price: "6 / 8 / 10",
      calories: 1,
      img: tea,
    },
    {
      id: 9,
      name: "قوري كرك",
      desc: "كرك يقدم بقوري",
      price: 35,
      calories: 1000,
      img: qoryKarak,
    },
    {
      id: 10,
      name: "كرك ",
      desc: "كرك غني بنكهته الأصلية",
      price: "10 / 12",
      calories: 250,
      img: karak,
    },
  ],
  food: [
    {
      id: 11,
      name: "تارت اللوز",
      desc: "تارت اللوز بلمسة متقنة ونكهة متوازنة",
      price: 18,
      calories: 400,
      img: tart,
    },
    {
      id: 13,
      name: " براونيز ",
      desc: "شوكلاتة بطعمها الفريد",
      price: 17,
      calories: 320,
      img: choclete,
    },
    {
      id: 14,
      name: "سكونز",
      desc: "بسكوت بريطاني بالجبن والمربى",
      price: 14,
      calories: 230,
      img: cake,
    },
    {
      id: 15,
      name: " سينامون بايتس",
      desc: "سينامون طري يُحضَّر بإتقان ليكمل لحظاتكم المميزة ",
      price: 25,
      calories: 460,
      img: senabon,
    },
    {
      id: 16,
      name: "مخبوزات",
      desc: "زعتر، لبنة، لبنة زعتر، لبنة عسل، جبن",
      price: 9,
      calories: 350,
      img: baked,
    },
    {
      id: 17,
      name: "كيكة الزعتر",
      desc: "كيكة زعتر بحشوة الجبن",
      price: 9,
      calories: 140,
      img: z3tr,
    },
    {
      id: 18,
      name: "مكسرات",
      desc: "مكسرات مشكلة",
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
          <Link to="/" className="inline-block transition">
            <img
            src={menuLogo}
            alt="menu logo"
            loading="lazy"
            className="w-20 rounded-full sm:w-24 md:w-28 object-contain"
          />
          </Link>

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
                      {item.calories} سعرة حرارية
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
                        {item.calories}  سعرة حرارية
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
