import { Link } from 'react-router-dom';
import { SearchX, Upload, HandHeart, Search as SearchIcon, ArrowRight, Compass, ShieldCheck, Zap } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import Carousel from '@/components/Carousel';
import ItemCard from '@/components/ItemCard';
import { useApp } from '@/context/AppContext';
import { campusImg } from '@/data/sampleData';

export default function HomePage() {
  const { items } = useApp();
  const recentItems = items.slice(0, 8);
  const lostCount = items.filter((i) => i.type === 'lost').length;
  const foundCount = items.filter((i) => i.type === 'found').length;
  const resolvedCount = items.filter((i) => i.status === 'resolved' || i.status === 'claimed').length;

  return (
    <div className="bg-cream-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream-100 via-cream-50 to-cream-50" />
        <div
          className="absolute right-0 top-0 w-1/2 h-full opacity-10 bg-cover bg-center hidden lg:block"
          style={{ backgroundImage: `url(${campusImg})` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-sand-200 rounded-full mb-6 animate-fadeIn">
              <Compass className="w-4 h-4 text-sand-500" />
              <span className="text-xs font-medium text-sand-600 tracking-wide">University Campus Platform</span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-charcoal-800 leading-[1.1] text-balance animate-fadeInUp">
              Lost Something?
              <br />
              <span className="text-sand-600 italic">Let's Find It.</span>
            </h1>
            <p className="mt-6 text-lg text-charcoal-400 max-w-xl leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              Report lost items, post found belongings, and browse listings across campus. FindIt
              connects students to reunite them with what matters.
            </p>

            <div className="mt-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <SearchBar variant="hero" />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <Link
                to="/report?type=lost"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-charcoal-800 text-cream-50 font-medium rounded-xl hover:bg-charcoal-700 transition-all hover:scale-[1.02] shadow-md"
              >
                <SearchX className="w-5 h-5" />
                Report Lost Item
              </Link>
              <Link
                to="/report?type=found"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-charcoal-700 font-medium rounded-xl border border-charcoal-200 hover:border-sand-400 hover:text-sand-600 transition-all hover:scale-[1.02] shadow-sm"
              >
                <HandHeart className="w-5 h-5" />
                Report Found Item
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div className="text-center sm:text-left">
              <div className="font-display text-4xl font-semibold text-charcoal-800">{lostCount}</div>
              <div className="text-sm text-charcoal-400 mt-1">Items Lost</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="font-display text-4xl font-semibold text-charcoal-800">{foundCount}</div>
              <div className="text-sm text-charcoal-400 mt-1">Items Found</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="font-display text-4xl font-semibold text-sand-600">{resolvedCount}</div>
              <div className="text-sm text-charcoal-400 mt-1">Reunited</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Reported Items */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal-800">
                Recently Reported
              </h2>
              <p className="text-charcoal-400 mt-2">Latest lost and found items across campus</p>
            </div>
            <Link
              to="/browse"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-sand-600 hover:text-sand-700 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <Carousel>
            {recentItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </Carousel>
          <div className="mt-6 sm:hidden">
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 text-sm font-medium text-sand-600"
            >
              View All Items
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 lg:py-24 bg-white border-y border-charcoal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-medium text-sand-600 uppercase tracking-wide">Simple Process</span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal-800 mt-2">
              How It Works
            </h2>
            <p className="text-charcoal-400 mt-3">
              Three easy steps to report, find, and reclaim your belongings on campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: SearchIcon,
                step: '01',
                title: 'Report Your Item',
                description:
                  'Lost something or found an item? Create a report with details, photos, and location in under two minutes.',
              },
              {
                icon: Upload,
                step: '02',
                title: 'Browse Listings',
                description:
                  'Search through reported items by category, location, or keyword. Swipe through photos to identify your belongings.',
              },
              {
                icon: HandHeart,
                step: '03',
                title: 'Reclaim & Reunite',
                description:
                  'Found a match? Submit a claim request and coordinate with the reporter to get your item back safely.',
              },
            ].map((step, i) => (
              <div
                key={i}
                className="relative group"
              >
                <div className="bg-cream-50 border border-charcoal-100 rounded-2xl p-8 h-full transition-all hover:shadow-lg hover:border-sand-300">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-charcoal-800 flex items-center justify-center text-cream-50 group-hover:bg-sand-600 transition-colors">
                      <step.icon className="w-7 h-7" />
                    </div>
                    <span className="font-display text-4xl font-semibold text-charcoal-100 group-hover:text-sand-200 transition-colors">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-charcoal-800 mb-3">{step.title}</h3>
                  <p className="text-charcoal-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 px-5 py-4 bg-cream-50 rounded-xl border border-charcoal-100">
              <ShieldCheck className="w-6 h-6 text-sand-500 shrink-0" />
              <span className="text-sm text-charcoal-500">Verified student platform</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-4 bg-cream-50 rounded-xl border border-charcoal-100">
              <Zap className="w-6 h-6 text-sand-500 shrink-0" />
              <span className="text-sm text-charcoal-500">Quick and easy reporting</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-4 bg-cream-50 rounded-xl border border-charcoal-100">
              <Compass className="w-6 h-6 text-sand-500 shrink-0" />
              <span className="text-sm text-charcoal-500">Campus-wide coverage</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-charcoal-800 rounded-3xl p-10 lg:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-cover bg-center" style={{ backgroundImage: `url(${campusImg})` }} />
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-cream-50">
                Have something to report?
              </h2>
              <p className="text-cream-100/70 mt-4 max-w-xl mx-auto">
                Whether you've lost an item or found one on campus, help build a community where
                belongings find their way home.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/report?type=lost"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-cream-50 text-charcoal-800 font-medium rounded-xl hover:bg-cream-100 transition-all"
                >
                  <SearchX className="w-5 h-5" />
                  Report Lost Item
                </Link>
                <Link
                  to="/report?type=found"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-sand-600 text-cream-50 font-medium rounded-xl hover:bg-sand-500 transition-all"
                >
                  <HandHeart className="w-5 h-5" />
                  Report Found Item
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
