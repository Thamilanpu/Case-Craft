import React from 'react'
import Hero from '../components/petHome/Hero'
import CategoryShowcase from '../components/petHome/CategoryShowcase'
import FeaturedProducts from '../components/petHome/FeaturedProducts'
import Testimonials from '../components/petHome/Testimonials'
import PetFAQ from '../components/petHome/PetFAQ'

const PetHome = () => {
  return (
    <div>
        <Hero/>
            <CategoryShowcase/>
              <FeaturedProducts/>
              <Testimonials/>
              <PetFAQ/>
    </div>
  )
}

export default PetHome