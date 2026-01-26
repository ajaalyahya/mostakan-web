import heroBg from "../../assets/images/hero.jpg";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      id="home"
      className="h-screen bg-center bg-cover relative bg-scroll md:bg-fixed overflow-x-hidden"

      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[100svh] px-6 text-white text-center">
        <div>
          <h1 className="font-bold mb-4 text-3xl sm:text-4xl md:text-5xl">
            أهلاً بكم
          </h1>

          <p className="mb-6 text-sm sm:text-base md:text-lg">
            تجربة مختلفة
          </p>

          <Link
            to="/menu"
            className="
              inline-block
              bg-[var(--trdColor)]
              text-[var(--secColor)]
              font-bold
              px-8 py-2
              rounded-full
              transition
              hover:bg-[var(--secColor)]
              hover:text-[var(--trdColor)]
            "
          >
            تصفح المنيو
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
