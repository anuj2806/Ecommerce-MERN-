import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"
import { useLatestProductQuery } from "../redux/api/productAPI"
import Loader from "../components/loader"
import toast from "react-hot-toast"


const  Home = () => {
    const addToCartHandler=()=>{}
    const {data,isLoading,isError} = useLatestProductQuery("");
    console.log(data);
    if(isError) toast.error("Can't fetch the products")
  return (
    <div className="home">
        <section></section>
        <h1>Latest Products<Link to={'/search'} className="findmore">More</Link></h1>
        <main>
            {isLoading?<Loader/>:(
              data?.products.map((i)=>(
                <ProductCard
                  key={i._id} 
                  productId={i._id}
                  photo={i.photo}
                  price={i.price} 
                  name={i.name} 
                  stock={i.stock} 
                  handler={addToCartHandler}
                />
              ))
            )
            }
        </main>
    </div>
  )
}

export default Home