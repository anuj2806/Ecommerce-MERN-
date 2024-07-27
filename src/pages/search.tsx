import {useEffect, useState } from "react";
import ProductCard from "../components/product-card";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import { server } from "../redux/store";
import Loader from "../components/loader";

const Search = () => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [maxPrice, setMaxPrice] = useState(1000000);
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const {isLoading:productLoading,data:searchData} = useSearchProductsQuery({search,page,price:maxPrice,sort,category})
    const isPrevPage = page>1;
    const isNextPage= page<4;
    const addToCartHandler=()=>{}
    const {data,error,isError} = useCategoriesQuery("");
    if (isError) {
        const err = error as CustomError;
        toast.error(err.data.message);
    }
  return (
    <div className="product-search-page">
        <aside>
            <h4>Filters</h4>
            <div>
                <h4>Sort</h4>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="">None</option>
                    <option value="asc">Price (Low to High)</option>
                    <option value="dsc">Price (High to Low)</option>
                </select>
            </div>
            <div>
                <h4>Max Price: {maxPrice || ""}</h4>
                <input
                    type="range"
                    min={100}
                    max={1000000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
            </div>

            <div>
                <h4>Category</h4>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">ALL</option>
                    {
                        data?.categories.map((i:string)=>(
                            <option key={i} value={i}>{i.toUpperCase()}</option>
                        ))  
                    }
                    
                </select>
            </div>
        </aside>
        <main>
            <h1>Product</h1>
            <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="search-product-list">
                { 
                    productLoading?<Loader/>:
                    (
                        searchData?.products.map((i)=>(
                            <ProductCard
                            key={i._id}
                            productId={i._id}
                            photo={i.photo}
                            price={i.price} 
                            name={i.name}
                            stock={i.stock} 
                            handler={addToCartHandler}/>
                        ))
                    )
                }
                
            </div>
            <article>
                <button disabled={!isPrevPage} onClick={()=>setPage((prev)=>prev-1)}>Prev</button>
                <span>{page} of 4</span>
                <button disabled={!isNextPage} onClick={()=>setPage((prev)=>prev+1)}>Next</button>
            </article>
        </main>
    </div>
  )
}

export default Search