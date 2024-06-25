import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"

const  Home = () => {
    const addToCartHandler=()=>{}
  return (
    <div className="home">
        <section></section>
        <h1>Latest Products<Link to={'/search'} className="findmore">More</Link></h1>
        <main>
            <ProductCard productId="DFG" photo="71jG+e7roXL._SX679_.jpg" price={1000} name="MacBook" stock={1} handler={addToCartHandler}/>
        </main>
    </div>
  )
}

export default Home