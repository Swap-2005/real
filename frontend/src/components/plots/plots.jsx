import React from "react"
// import Heading from "../../common/Heading"
import "./plots.css"
import Plotscard from "./plotscard"
import { useParams } from 'react-router-dom';

const Recent = () => {

    const { location, category } = useParams();
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          {/* <Heading title='All Plots' subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' /> */}
          <Plotscard location={location} category={category}/>
        </div>
      </section>
    </>
  )
}

export default Recent
