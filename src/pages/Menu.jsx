import { useState } from "react";
import ryal from "../assets/images/ryal.png";
import Footer from "../components/layout/Footer";

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
      img: "https://picsum.photos/400/300?5",
    },
  ],
  offers: [
    {
      id: 2,
      name: "الشاي الأبيض",
      desc: "شاي باي مو تان",
      price: 12,
      calories: 1,
      img: "https://picsum.photos/400/300?1",
    },
    {
      id: 3,
      name: "الشاي الأخضر",
      desc: "شاي أخضر عضوي",
      price: 12,
      calories: 1,
      img: "https://picsum.photos/400/300?1",
    },
  ],
  matcha: [
    {
      id: 4,
      name: "ماتشا لاتيه",
      desc: "ماتشا كريمي مع حليب",
      price: 22,
      calories: 150,
      img: "https://picsum.photos/400/300?2",
    },
  ],
  hot: [
    {
      id: 5,
      name: "كرك مستكن",
      desc: "كرك غني بنكهة الهيل",
      price: "10 / 12",
      calories: 250,
      img: "https://picsum.photos/400/300?6",
    },
    {
      id: 6,
      name: "قوري كرك",
      desc: "كرك يقدم بقوري",
      price: 35,
      calories: 1000,
      img: "https://picsum.photos/400/300?7",
    },
    {
      id: 7,
      name: "قوري شاي",
      desc: "شاي أسود يقدم بقوري",
      price: 29,
      calories: 5,
      img: "https://picsum.photos/400/300?7",
    },
    {
      id: 8,
      name: "شاي",
      desc: "شاي كلاسيك",
      price: "6 / 8 / 10",
      calories: 1,
      img: "https://picsum.photos/400/300?7",
    },
  ],
  food: [
    {
      id: 9,
      name: "مخبوزات",
      desc: "زعتر، لبنة، لبنة زعتر، لبنة عسل، جبن",
      price: 9,
      calories: 350,
      img: "https://picsum.photos/400/300?4",
    },
    {
      id: 10,
      name: "سكونز",
      desc: "سكونز طازج بالزبدة",
      price: 14,
      calories: 140,
      img: "https://picsum.photos/400/300?4",
    },
    {
      id: 11,
      name: "مكسرات",
      desc: "مكسرات محمصة مشكلة",
      price: 8,
      calories: 160,
      img: "https://picsum.photos/400/300?4",
    },
    {
      id: 12,
      name: "كيكة الزعتر",
      desc: "كيكة زعتر منزلية",
      price: 9,
      calories: 140,
      img: "https://picsum.photos/400/300?4",
    },
    {
      id: 13,
      name: "تارت اللوز",
      desc: "تارت اللوز",
      price: 9,
      calories: 140,
      img: "https://picsum.photos/400/300?4",
    },
    {
      id: 14,
      name: "سينابون مستكن",
      desc: "سينابون مستكن",
      price: 9,
      calories: 140,
      img: "https://picsum.photos/400/300?4",
    },
  ],
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="relative h-40 sm:h-48 md:h-56 w-full">
        <img
          src="https://picsum.photos/1200/500"
          className="h-full w-full object-cover"
          alt="menu header"
        />
        <h1 className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl font-bold text-white">
          قائمة طعام مستكن
        </h1>
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
          /* كامل المنيو */
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
                    src={items[cat.id][0].img}
                    alt={cat.name}
                    className="h-28 sm:h-32 md:h-36 w-full object-cover"
                  />
                  <div className="p-3 text-center font-semibold text-sm sm:text-base">
                    {cat.name}
                  </div>
                </button>
              ))}
          </div>
        ) : (
          <>
            {/* ===== الجوال فقط ===== */}
            <div className="grid grid-cols-2 gap-4 sm:hidden">
              {items[activeCategory]?.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl bg-white shadow"
                >
                  <img
                    src={item.img}
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
                      <img src={ryal} alt="SAR" className="h-3 w-3" />
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {item.calories} سعرة
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ===== التابلت + الدسكتوب ===== */}
            <div className="hidden sm:grid grid-cols-2 gap-4 lg:grid-cols-3">
              {items[activeCategory]?.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl bg-white shadow"
                >
                  <img
                    src={item.img}
                    className="h-36 sm:h-40 md:h-44 w-full object-cover"
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
                        <img src={ryal} alt="SAR" className="h-4 w-4" />
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
