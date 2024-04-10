import React, { useEffect, } from 'react'
import ProductCard from '../components/ProductCard'
import {useDispatch,useSelector} from "react-redux"
import { getAllProducts } from '../redux/actions/products';
import Loader from "../components/Loader"
import toast from "react-hot-toast"
import { loginUser } from '../redux/actions/users';
const Home = () => {
  const dispatch = useDispatch()
  const {products,loading,error} = useSelector((state)=> state.productSlice);
  useEffect(() => {
    dispatch(getAllProducts())
    if(error){
      toast.error(error.message)
    }
  }, [dispatch])
  return (
    <main className='homeSection'>
      <section className="heroSec">
        <h1>Welcome To Ecommerce</h1>
        <h3>Find Amazing Products With Discounts</h3>
        <div className="button">
          <button>Explore Now</button>
        </div>
      </section>
      <section className="productsSection">
        <h1>Latest Products</h1>
        <hr />
        <div className="productContainer">
        {
          loading?<Loader/>: 
          products.map((product)=>{
            return <ProductCard product={product} key={product._id}/>
          })
        }
        </div>
      </section>
    </main>
  )
}

export default Home