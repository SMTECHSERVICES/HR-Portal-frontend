import React from 'react'
import LoginCommonLayout from '../components/LoginCommonLayout'
import hero from '/hero.jpg'


const header = 'Launch Your Career with the Right Internship and HR support';


const paragraph = 'Build experience, gain industry exposure, and grow professionally with our curated programs. SM Services is your gateway to real-world learning and career success.'

const Home = () => {
  return (
  <>
  <LoginCommonLayout login1={'HR Login'} login2={'Intern Login'} to1={'/hrLogin'} to2={'/internLogin'} heading={header} paragraph={paragraph} hero={hero} />
  </>
  )
}

export default Home
