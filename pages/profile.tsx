import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image'
import Navigation from '~components/navigation'
import Footer from '~components/footer'
import ProfileSection from '~components/sections/profile_section';
import axios from 'axios';

async function changeUsername(email: string | null | undefined, username: string){
  if(!email)
  {
    alert('please sign in first')
  }
  else if(username.length < 3 || username.length > 12){
    alert('please input username between 3 to 12 characters')
  }
  else {
    try {
      const response = await axios.post('/api/change_username', {
        username, email
      })

      window.localStorage.setItem('username-' + email, username)
      console.log(username);
  
      return true
    } catch (error) {
      return false
    }
  }

  return false
}

export default function Profile() {
  const { user, error, isLoading } = useUser();

  const [ showTextBox, setShowTextBox ] = useState(false)
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const [ username, setUsername ] = useState("")
  const [ usernameDisplay, setUsernameDisplay ] = useState(user?.name)
  
  useEffect(() => {
    const currentUsername = window.localStorage.getItem('username-' + user?.email) || user?.name || "-"
    setUsernameDisplay(currentUsername)
  })

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <Navigation user={user} isLoading={isLoading} />
      <ProfileSection>
      {user && (
            <div className='text-center w-full py-10 text-white pb-20'>
              <Image className='rounded-full' width={96} height={96} src={user?.picture ?? ''} alt={user?.name || 'default'} />
              <h2>
                {!showTextBox ? <div>
                  <span>{usernameDisplay}</span>
                  <span className='ml-2 underline cursor-pointer' onClick={() => setShowTextBox(true)}>edit</span>
                </div> : <div><input type="text" onBlur={e => setUsername(e.target.value)} disabled={isSubmitting} className='border p-2 rounded-full text-black text-center' placeholder='type name' />
                <button disabled={isSubmitting} onClick={async () => {
                  setIsSubmitting(true)
                  const success = await changeUsername(user?.email, username)

                  if(success){
                    setShowTextBox(false)
                  }
                  else {
                    alert('failed to update user name')
                  }

                  setIsSubmitting(false)
                }} className='ml-2 py-1 px-4 border border-black bg-white text-black rounded-full'>{isSubmitting ? 'Saving..' : 'Save'}</button></div>}
              </h2>
              <p>{user?.email}</p>
            </div>
          )}
      </ProfileSection>
      <Footer />
    </div>)
}