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
            We focus on premium quality, comfort, and timeless style while
            reducing environmental impact at every step of the journey — from
            sourcing to packaging.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold">
          Sustainable Fashion For All
          </h2>
          <p className="text-gray-700">
          At Eco Clothing India, we celebrate India and its heritage. We endeavour to bring all that 
          we love about our country to the people worldwide. Our vision is to provide customers 
          with hand crafted products which help support and encourage good craftsmanship.

               We work closely with the artisans by providing various inputs including design, quality 
          control, access to raw materials and production coordination. The employment generated through 
          these skilled labour jobs provide to the daily livelihoods of our artisans.
          </p>
          <p className="text-gray-700">
            Each purchase made contributes to the livelihood of at least 15 artisans.
             We have artists from all over the villages of Rajasthan working with us. 
             They specialise in different types of hand block printing art forms which 
             have been practiced in their families from many generations. Their expertise 
             in art and design is totally commendable.

          If you like our prints, please leave a note so that we can convey your message directly to the 
          artisan. After all, who doesn’t love compliments.
          </p>
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
        {/* Why Choose Us - Image and Features */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left - Image */}
            <div className="flex justify-center">
              <img 
                src="/images/fabric.jpg" 
                alt="Handcrafted Fabric" 
                className="rounded-lg w-full h-auto object-cover max-w-sm"
              />
            </div>

            {/* Right - Features */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold">
                100% Handcrafted<br />in India
              </h2>

              {/* Feature 1 */}
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <div className="text-2xl mt-1">☁️</div>
                  <div>
                    <h3 className="text-lg font-semibold">Soft Natural Fabric</h3>
                    <p className="text-gray-600">
                      We used the best quality internationally certified organic cotton fabric that is extremely soft in nature. It's not processed with any harsh chemicals.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <div className="text-2xl mt-1">🍃</div>
                  <div>
                    <h3 className="text-lg font-semibold">Breathable & Lightweight</h3>
                    <p className="text-gray-600">
                      Our fabrics are very breathable and lightweight providing all day comfort especially in hot and humid climates. Our clothes are designed keeping in mind the Indian climate.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <div className="text-2xl mt-1">🌸</div>
                  <div>
                    <h3 className="text-lg font-semibold">Toxic Chemical Free</h3>
                    <p className="text-gray-600">
                      We use toxic-chemical-free dyes and colors in our garments that are soft on the skin and do not cause any irritation or rashes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Bottom Note */}
        <section className="border rounded-3xl p-6 md:p-8 bg-gray-50">
          <h3 className="text-xl font-semibold">Thank you</h3>
          <p className="text-gray-700 mt-2">
            Thank you for supporting sustainable fashion. When you choose EcoStore,
            you’re choosing comfort, quality, and a better future.
          </p>
        </section>
      </div>
    </div>
  );
}
