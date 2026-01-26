import { FaInstagram, FaMapMarkerAlt } from "react-icons/fa"

function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[var(--secColor)] text-white pt-12 md:pt-16 pb-8"
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center md:text-right">

        {/* عن المحل */}
        <div>
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
            عن مستكن
          </h3>
          <p className="text-gray-200 leading-relaxed text-sm md:text-base">
            مستكن يقدم تجربة قهوة مختلفة تجمع بين الجودة، الذوق، والاهتمام بالتفاصيل.
          </p>
        </div>

        {/* معلومات التواصل */}
        <div>
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
            تواصل معنا
          </h3>

          <div className="flex justify-center md:justify-start items-center gap-1">
            <FaInstagram />
            <a
              href="https://www.instagram.com/mostakan.tea?igsh=c3BoMHJrcWw2djdo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline font-mono text-sm md:text-base "
            >
              mostakan.tea
            </a>
          </div>
        </div>

        {/* الموقع */}
        <div>
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
            موقعنا
          </h3>

          <div className="flex justify-center md:justify-start items-start gap-0 text-sm md:text-base">
            <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
            <a
              className="text-gray-200 leading-relaxed"
              href="https://maps.app.goo.gl/TFbbRP5vY7L4mUQX7"
              target="_blank"
              rel="noopener noreferrer"
            >
              الأحساء – حي الحوراء <br />
              شارع أم المؤمنين خديجة
            </a>
          </div>
        </div>

      </div>

      {/* الخط السفلي */}
      <div className="border-t border-white/20 mt-10 md:mt-12 pt-5 text-center text-xs md:text-sm text-gray-200 px-4">
        © 2022 جميع الحقوق محفوظة — صُنع بإستكنان من{" "}
        <a
          className="font-bold hover:underline"
          href="https://www.instagram.com/takin_info?igsh=MWV0NmduYnpyaWNxZg%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
        >
          تَكِن
        </a>
      </div>
    </footer>
  )
}

export default Footer
