import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";

type ProductsProps = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    handler: () => void;
  };

const ProductCard = ({productId,photo,name,price,stock,handler}:ProductsProps) => {//BY using type we only define type of variable else are same
   console.log(`${server}/${photo}`);
  return (
    <div className='product-card'>
      
        <img src={`${server}/${photo}`} alt="" />
        <p>{name}</p>
        <span>₹{price}</span>
        <div>
            <button onClick={()=>handler()}><FaPlus /></button>
        </div>

    </div>
  )
}

export default ProductCard