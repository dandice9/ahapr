import React, { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Navigation from '~components/navigation'
import Footer from '~components/footer'
import BannerSection from '~components/sections/banner_section';
import BannerContentSection from '~components/sections/banner_content_section';
import DashboardComponent from '~components/dashboard';

export default function Dashboard() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div className='text-center'>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  useEffect(() => {
    if(!user){
      window.localStorage.removeItem('username')
    }
  })

  return (
    <div>
      <Navigation user={user} isLoading={isLoading} />
      <BannerSection title={`Hello, ${user?.nickname}`} />
      <BannerContentSection>
        <div className='px-8 py-20'>
          <DashboardComponent></DashboardComponent>
        </div>
      </BannerContentSection>
      <Footer />
    </div>)
}