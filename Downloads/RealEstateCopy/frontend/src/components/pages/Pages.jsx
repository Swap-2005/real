import React from "react"
import Header from "../common/header/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "../home/Home"
import Footer from "../common/footer/Footer"
import About from "../about/About"
import Blog from "../blog/Blog"
import Services from "../services/Services"
import Contact from "../contact/Contact"
import Login from "../Login"
import Signup from '../Signup'
import Plots from "../plots/plots"
// import Plotpage from '../Plotpage/Plotpage';
import Listing from "../ListingDisplay/Listing";
import cart from "../Cart/Cart";

const Pages = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/services' component={Services} />
          <Route exact path='/blog' component={Blog} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/allplots/:location/:category' component={Plots}/>
          <Route exact path='/plot/:id' component={Listing}/>
          <Route exact path='/cart' component={cart}/>
        </Switch>
        <Footer />
      </Router>
    </>
  )
}

export default Pages
