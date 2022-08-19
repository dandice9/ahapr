import type { NextPage } from 'next'
import HomeSection from '~components/sections/home_section'
import Navigation from '~components/navigation'
import FeatureSection from '~components/sections/feature_section'
import AboutSection from '~components/sections/about_section'
import Footer from '~components/footer'
import PricingSection from '~components/sections/pricing_section'
import FaqSection from '~components/sections/faq_section'
import TestimonialsSection from '~components/sections/testimonials_section'
import TeamSection from '~components/sections/team_section'
import ContactSection from '~components/sections/contact_section'
import { useUser } from '@auth0/nextjs-auth0';

const Home: NextPage = () => {
  // load auth user
  const { user, error, isLoading } = useUser();
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <Navigation user={user} isLoading={isLoading} />
      <HomeSection />
      <FeatureSection />
      <AboutSection />
      <PricingSection />
      <FaqSection />
      <TestimonialsSection />
      <TeamSection />
      <ContactSection />
      <Footer />
      <span
      className="cursor-pointer back-to-top fixed bottom-8 right-8 left-auto z-[999] hidden h-10 w-10 items-center justify-center rounded-md bg-blue-500 text-white shadow-md transition duration-300 ease-in-out hover:bg-black"
      >
        <span
          className="mt-[6px] h-3 w-3 rotate-45 border-t border-l border-white"
        ></span>
      </span>
    </div>)
}

export default Home
