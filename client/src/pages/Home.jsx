import React from 'react'

const Home = () => {
  return (
    <main className='homeSection'>
      <section className="heroSec">
        <h1>Welcome To Ecommerce</h1>
        <h3>Find Amazing Products With Discounts</h3>
        <div className="button">
          <button>Explore Now</button>
        </div>
      </section>
      <section className="products"></section>
    </main>
  )
}

export default Home