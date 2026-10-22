import BrowseBrands from './components/BrowseBrands'
import BrowseCategories from './components/BrowseCategories'
import ContactStrip from './components/ContactStrip'
import FeaturedListings from './components/FeaturedListings'
import FinancingBanner from './components/FinancingBanner'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import SearchPanel from './components/SearchPanel'
import Testimonials from './components/Testimonials'
import WhyBuy from './components/WhyBuy'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <Hero />
        <SearchPanel />
        <FeaturedListings />

        <section className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <BrowseBrands />
          <BrowseCategories />
        </section>

        <WhyBuy />
        <Testimonials />
        <FinancingBanner />
        <ContactStrip />
      </main>

      <Footer />
    </div>
  )
}
