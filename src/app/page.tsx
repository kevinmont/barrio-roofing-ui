import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Features Grid Preview */}
      <section className="py-24 bg-white">
        <div className="container px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="heading-lg mb-4">Complete Roofing Solutions</h2>
            <p className="text-lead mx-auto">
              From minor repairs to full replacements, we handle every aspect of your roofing needs with precision and care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Roof Replacement',
                desc: 'Full tear-off and installation of high-quality roofing systems with lifetime warranties.',
                icon: '🏠'
              },
              {
                title: 'Expert Repairs',
                desc: 'Fast and reliable repairs for leaks, storm damage, and wear-and-tear.',
                icon: '🛠️'
              },
              {
                title: 'Gutter Services',
                desc: 'Seamless gutter installation and cleaning to protect your home foundation.',
                icon: '🌧️'
              }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                <div className="text-4xl mb-6 bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="heading-md mb-3">{feature.title}</h3>
                <p className="text-slate-500 mb-6">{feature.desc}</p>
                <div className="text-orange-600 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center gap-2 cursor-pointer">
                  Learn More <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
