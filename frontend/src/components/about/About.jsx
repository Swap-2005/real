import React from "react"
import Back from "../common/Back"
import Heading from "../common/Heading"
import "./about.css"

const About = () => {
  return (
    <>
      <section className='about'>
        <Back  name='About Us' title='About Us - Who We Are?' />
        <div className='container flex mtop'>
          <div className='left row'>
            <Heading title='Our Story' subtitle='Check out our story and work process' />

            <p>Welcome to SAI LEELA REALSTATE, managed by Chandra Shekhar Reddy. We are dedicated to helping you find your perfect property, whether it be open plots, villas, apartments, or individual houses. Our extensive experience and commitment to excellence ensure that we provide you with the best real estate options tailored to your needs.</p>
            <p> With a deep understanding of the local market and a passion for real estate, we are your reliable partner in making informed decisions and achieving your property goals.</p>
          </div>
          <div className='right row'>
            <img className="qwerty" src='./profile.jpg' alt='' />
          </div>
        </div>
      </section>
    </>
  )
}

export default About
