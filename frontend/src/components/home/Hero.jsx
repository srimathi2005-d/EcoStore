import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="w-full">
      {/* ✅ FULL WIDTH BANNER */}
      <div className="relative w-full h-[420px] sm:h-[450px] md:h-[620px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/eco1.jpg"
          alt="EcoStore Banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* ✅ Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

        {/* ✅ Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-xl text-white">
            <p className="text-xs sm:text-sm tracking-widest uppercase text-white/80">
              Sustainable • Minimal • Premium
            </p>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mt-4">
              Eco-friendly clothing
              <br />
              made for everyday comfort
            </h1>

            <p className="text-white/90 mt-4 text-sm sm:text-base md:text-lg leading-relaxed">
              Build a wardrobe you feel proud of. Premium fabrics, ethical
              sourcing, and timeless design.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                to="/sale"
                className="px-7 py-3 rounded-2xl bg-white text-black text-sm font-semibold hover:bg-gray-100 text-center"
              >
                Shop Sale
              </Link>

              <Link
                to="/shop"
                className="px-7 py-3 rounded-2xl border border-white/70 text-white text-sm font-semibold hover:bg-white/10 text-center"
              >
                Explore Collection
              </Link>
            </div>

            {/* Features */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-xs sm:text-sm text-white/85">
              <div>
                <p className="font-semibold text-white">Premium</p>
                <p className="text-white/75">Fabric quality</p>
              </div>
              <div>
                <p className="font-semibold text-white">Eco</p>
                <p className="text-white/75">Conscious</p>
              </div>
              <div>
                <p className="font-semibold text-white">Fast</p>
                <p className="text-white/75">Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
