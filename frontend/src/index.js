import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import ShopContextProvider from './components/Context/ShopContext.jsx';

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <ShopContextProvider>
    <App />
    </ShopContextProvider>
  </React.StrictMode>
)
