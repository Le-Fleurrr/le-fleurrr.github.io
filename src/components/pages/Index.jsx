import { Nav } from '../Nav'
import { Hero } from '../Hero'
import { GenreSection } from '../GenreSection'
import { FeaturedAlbums } from '../FeaturedAlbums'
import { Footer } from '../Footer'
import { Newsletter } from '../Newsletter'
import { PromoBanner } from '../PromoBanner'
import '../../index.css'

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />

      <div className='min-h-screen bg-background'>
        <Nav />
        <Hero />
        <FeaturedAlbums />
        <GenreSection />
        <Newsletter />
        <Footer />
      </div>
    </div>
  )
}

export default Index