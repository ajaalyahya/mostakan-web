import { FaInstagram, FaTwitter } from "react-icons/fa"

import mostakan from "../../assets/images/mostakan.jpg"
import nature from "../../assets/images/tabieah.jpg"
import tech from "../../assets/images/takin.jpg"
import { FaXTwitter } from "react-icons/fa6"

function Partners() {
  return (
    <section id="partners" className="py-20 bg-amber-50">
      {/* العنوان */}
      <div className="text-center mb-16 px-6">
        <h2 className="text-[var(--firColor)] text-3xl md:text-4xl font-bold mb-4">
          شركاء النجاح
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          نعتز بشراكتنا مع علامات مميزة تشاركنا نفس الرؤية والجودة
        </p>
      </div>

      {/* الشركات */}
      <div className="max-w-5xl mx-auto flex flex-col gap-6 md:gap-8 px-6">

        {/* شركة 2 */}
        <div className="bg-white flex flex-col md:flex-row items-center gap-4 md:gap-6 border rounded-lg p-6 shadow-sm hover:shadow-md transition text-center md:text-right">
          <img
            src={nature}
            alt="طبيعة"
            className="w-20 h-20 object-contain flex-shrink-0"
          />

          <div className="flex-1">
            <h3 className="text-[#1B3220] text-lg md:text-xl font-bold mb-1">
              طبيعة
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              خبراء في زراعة ورعاية الحدائق, نحو جودة حياة أفضل.
            </p>
          </div>

          <a
            href="https://www.instagram.com/tabieah?igsh=dTdrYjhvbWU3NXA3"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-gray-200 hover:text-[#1B3220] text-2xl mt-2 md:mt-0"
          >
            <FaInstagram />
            <span className="text-gray-200 text-sm md:text-base mt-1">
              tabieah
            </span>
          </a>
        </div>

        {/* شركة 3 */}
        <div className="bg-[#1D2D4F] flex flex-col md:flex-row items-center gap-4 md:gap-6 border rounded-lg p-6 shadow-sm hover:shadow-md transition text-center md:text-right">
          <img
            src={tech}
            alt="تكن"
            className="w-20 h-20 object-contain flex-shrink-0 rounded-full"
          />

          <div className="flex-1">
            <h3 className="text-[var(--trdColor)] text-lg md:text-xl font-bold mb-1">
              تَكِن
            </h3>
            <p className="text-gray-200 text-sm md:text-base">
              تَكِن موجود لنطور مواقع تعكس هوية مشروعك.
            </p>
          </div>

          <a
            href="https://x.com/Takin_info"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-gray-200 hover:text-[var(--trdColor)] text-2xl mt-2 md:mt-0"
          >
            <FaXTwitter />
            <span className="text-gray-200 text-sm md:text-base mt-1">
              takin_info
            </span>
          </a>

        </div>

      </div>
    </section>
  )
}

export default Partners
