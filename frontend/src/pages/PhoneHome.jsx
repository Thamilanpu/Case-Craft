import React from 'react'
import Hero from '../components/phoneHome/Hero'
import CategoryShowcase from '../components/phoneHome/CategoryShowcase'
import FeaturedProducts from '../components/phoneHome/FeaturedProducts'
import Testimonials from '../components/phoneHome/Testimonials'
import PetFAQ from '../components/phoneHome/PetFAQ'
import PhoneModelSelector from '../components/phoneHome/PhoneModelSelector'
import GallerySection from '../components/phoneHome/GallerySection'

const PhoneHome = () => {
  return (
    <div>
        <Hero/>
            <PhoneModelSelector/>
              <FeaturedProducts/>
              <Testimonials/>
              <GallerySection/>
              <PetFAQ/>
    </div>
  )
}

export default PhoneHome