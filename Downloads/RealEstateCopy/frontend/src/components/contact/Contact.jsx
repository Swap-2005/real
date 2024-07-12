import React from "react"
import Back from "../common/Back"
import "./contact.css"

const Contact = () => {
  return (
    <>
      <section className='contact mb'>
        <Back name='Contact Us' title='Get Helps & Friendly Support'  />
        <div className='container'>
          <form className='shadow'>
            <h4>Fillup The Form</h4> <br />
            <div>
              <input type='text' placeholder='Owner Name' />
            </div>
            <div>
              <select className="dropdown" name="propertyType" id="propertyType">
               <option value="Open Plots">Open plots</option>
               <option value="House/Villa">House/Villa</option>
               <option value="Apartment">Apartment</option>
               <option value="Farm/Agricultural Lands">Farm/Agricultural Lands</option>
               <option value="Commercial Properties/Shops">Commercial Properties/Shops</option>
              </select>
            </div>
            
            <input type='text' placeholder='Desciption' />
            <textarea cols='30' rows='10'></textarea>
            <button>Submit Request</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact
