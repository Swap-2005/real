import React from "react"
import { footer } from "../../data/Data"
import "./footer.css"

const Footer = () => {
  return (
    <>
      <footer>
        <div className='container'>
          <div className='box'>
            <div className='logo'>
              <img src='../images/logo.png' alt='' />
              <h2>Do You Need Help With Anything?</h2>
              <p>Receive updates, hot deals, tutorials, discounts sent straignt in your inbox every month</p>

              <div className='input flex'>
                <input type='text' placeholder='Email Address' />
                <button>Subscribe</button>
              </div>
            </div>
          </div>

          {footer.map((val) => (
            <div className='box'>
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items) => (
                  <li> {items.list} </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div class="language-selector">
  <p>Select Language</p>
  <div class="flags">
    <span><i class="fa fa-flag-uk"></i></span>
    <span><i class="fa fa-flag-fr"></i></span>
    <span><i class="fa fa-flag-de"></i></span>
    <span><i class="fa fa-flag-in"></i></span>
  </div>
  <select id="language-dropdown">
    <option value="en">English</option>
    <option value="te">Telugu</option>
    <option value="de">Deutsch</option>
    <option value="hi">हिन्दी</option>
  </select>
</div>
      </footer>
      <div className='legal'>
        <span>© 2021 RentUP. Designd By GorkCoder.</span>
      </div>
    </>
  )
}

export default Footer
