import React from 'react'
import Intro from '../../../Components/Intro/Intro'
import PartnersCarousel from '../../../Components/PartnersCarousel/PartnersCarousel'
import StatsGrid from '../../../Components/StatsGrid/StatsGrid'
import UniversitiesGrid from '../../../Components/UniversitiesGrid/UniversitiesGrid'
import NewsSection from '../../../Components/NewsSection/NewsSection'
import TestimonialsCarousel from '../../../Components/TestimonialsCarousel/TestimonialsCarousel'
import Footer from '../../../Components/Footer/Footer'

export default function Home() {
  return (
    <>
        <Intro />
        <PartnersCarousel />
        <StatsGrid />
        <UniversitiesGrid />
        <NewsSection />
        <TestimonialsCarousel />
        <Footer />
    </>
  )
}