import { Link } from "react-router-dom"
import product1 from "../../assets/images/drinks/tea.jpeg"
import product2 from "../../assets/images/drinks/lemon.png"
import product3 from "../../assets/images/food/senabon2.jpg"

function WhyUs() {
  return (
    <section className="py-16 md:py-20 bg-[#fffefb] text-center">
      {/* العنوان */}
      <h2 className="text-2xl md:text-4xl font-bold mb-10 md:mb-12 text-[var(--firColor)]">
        أبرز المنتجات
      </h2>

      {/* الأعمدة */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-6">
        {/* بوكس 1 */}
        <div className="bg-[var(--trdColor)] shadow-lg rounded-2xl p-5 md:p-6 flex flex-col items-center">
          <img
            src={product1}
            alt="منتج 1"
            className="w-full h-40 md:h-40 object-cover mb-4 rounded-lg"
          />
          <h3 className="text-lg md:text-xl font-semibold mb-3 text-[var(--firColor)]">
            قوري شاي 
          </h3>
          <p className="text-sm md:text-base text-gray-600">
            قوري الشاي الخادر بنكهته الأصيلة وجودته المختارة بعناية.
          </p>
        </div>

        {/* بوكس 2 */}
        <div className="bg-[var(--trdColor)] shadow-lg rounded-2xl p-5 md:p-6 flex flex-col items-center">
          <img
            src={product2}
            alt="منتج 2"
            className="w-full h-40 md:h-40 object-cover mb-4 rounded-lg"
          />
          <h3 className="text-lg md:text-xl font-semibold mb-3 text-[var(--firColor)]">
            شاي الليمون المثلج
          </h3>
          <p className="text-sm md:text-base text-gray-600">
            شاي ليمون مثلج و منعش لكل وقت.
          </p>
        </div>

        {/* بوكس 3 */}
        <div className="bg-[var(--trdColor)] shadow-lg rounded-2xl p-5 md:p-6 flex flex-col items-center">
          <img
            src={product3}
            alt="منتج 3"
            className="w-full h-40 md:h-40 object-cover mb-4 rounded-lg"
          />
          <h3 className="text-lg md:text-xl font-semibold mb-3 text-[var(--firColor)]">
            سينامون بايتس 
          </h3>
          <p className="text-sm md:text-base text-gray-600">
            سينامون طري يُحضَّر بإتقان ليكمل لحظاتكم المميزة.
          </p>
        </div>
      </div>

      {/* زر المنيو */}
      <div className="mt-10 md:mt-12">
        <Link
          to="/menu"
          className="inline-block bg-[var(--firColor)] text-[var(--trdColor)] font-bold px-8 md:px-10 py-3 md:py-4 rounded-full hover:bg-[var(--secColor)] transition"
        >
          تصفح القائمة
        </Link>
      </div>
    </section>
  )
}

export default WhyUs
