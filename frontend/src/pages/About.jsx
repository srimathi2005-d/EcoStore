export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          About Us
        </h1>
        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Thoughtfully designed. Sustainably made. Built for everyday comfort.
        </p>
      </div>

      {/* Divider */}
      <div className="mt-10 border-t" />

      {/* Content */}
      <div className="mt-10 space-y-10 leading-relaxed text-gray-800">
        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Who We Are</h2>
          <p className="text-gray-700">
            EcoStore is a sustainable clothing brand built on one simple belief:
            clothing should feel good — and do good. We create everyday essentials
            using eco-friendly materials, responsible manufacturing practices and
            clean minimal design.
          </p>
          <p className="text-gray-700">
            We focus on premium quality, comfort, and timeless style while
            reducing environmental impact at every step of the journey — from
            sourcing to packaging.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Why Sustainable Fashion?
          </h2>
          <p className="text-gray-700">
            The fashion industry is one of the world’s largest polluters. We
            started EcoStore to offer a better alternative — a modern wardrobe
            built with respect for people and the planet.
          </p>
          <p className="text-gray-700">
            Our goal is to help you make mindful choices without compromising on
            style. Every piece is made to last, so you can buy less and wear
            more.
          </p>
        </section>

        {/* Values grid */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card */}
            <div className="border rounded-3xl p-6 bg-white">
              <h3 className="text-lg font-semibold">🌱 Eco-friendly Materials</h3>
              <p className="text-gray-700 mt-2">
                We use sustainable materials like organic cotton and low-impact
                fabrics to reduce our footprint.
              </p>
            </div>

            <div className="border rounded-3xl p-6 bg-white">
              <h3 className="text-lg font-semibold">🤝 Ethical Production</h3>
              <p className="text-gray-700 mt-2">
                Fair working conditions and responsible sourcing are at the core
                of everything we do.
              </p>
            </div>

            <div className="border rounded-3xl p-6 bg-white">
              <h3 className="text-lg font-semibold">♻️ Minimal Waste</h3>
              <p className="text-gray-700 mt-2">
                We aim for low-waste processes, smart inventory planning, and
                recyclable packaging.
              </p>
            </div>

            <div className="border rounded-3xl p-6 bg-white">
              <h3 className="text-lg font-semibold">🖤 Timeless Design</h3>
              <p className="text-gray-700 mt-2">
                Minimal essentials that never go out of style — wear them for
                years, not seasons.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Our Mission</h2>
          <p className="text-gray-700">
            Our mission is to make sustainable fashion accessible and effortless.
            We design premium everyday clothing that supports conscious living
            and helps reduce the impact of fast fashion.
          </p>
        </section>

        {/* Bottom Note */}
        <section className="border rounded-3xl p-6 md:p-8 bg-gray-50">
          <h3 className="text-xl font-semibold">Thank you 💛</h3>
          <p className="text-gray-700 mt-2">
            Thank you for supporting sustainable fashion. When you choose EcoStore,
            you’re choosing comfort, quality, and a better future.
          </p>
        </section>
      </div>
    </div>
  );
}
