import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import webFont from "webfontloader"
import Header from "./components/Header";


const Home = lazy(() => import("./pages/Home"));
const Products = lazy(()=>import("./pages/Products"))
const About = lazy(()=>import("./pages/About"))
const Contact = lazy(()=>import("./pages/Contact"))
const Search = lazy(()=>import("./pages/Search"))
const Login = lazy(()=>import("./pages/Login"))
const Cart = lazy(()=>import("./pages/Cart"))

const App = () => {
  useEffect(() => {
   webFont.load({
    google:{
      families:["Roboto","Droid Sans","Chilanka"]
    }
   })
  }, [])
  
  return (
    <Router>
      <Header/>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
