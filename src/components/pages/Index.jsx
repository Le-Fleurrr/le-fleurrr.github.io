import { Nav } from '../Nav'
import { Hero } from '../Hero'
import { GenreSection } from '../GenreSection'
import { FeaturedAlbums } from '../FeaturedAlbums'
import { Footer } from '../Footer'
import { Newsletter } from '../Newsletter'
import { PromoBanner } from '../PromoBanner'
import { Accessories } from '../Accessories'
import { MerchPromoSection } from '../MerchPromoSection'
import { AccessoriesSection }from '../AccessoriesSection'
import '../../index.css'

const Index = () => {
  return (     

      <div className='min-h-screen bg-background'>
        <PromoBanner />
        <Nav />
        <Hero />
        <FeaturedAlbums />
        <MerchPromoSection />
        <AccessoriesSection />
        <GenreSection />
        <Newsletter />
        <Footer />
      </div>
  )
}

export default Index