import React from "react";
import { useProducts } from "../context/ProductProvider";
import ProductCard from "../components/ProductCard";

const Cart = () => {
  const { state: { products, loading, error, cart } } = useProducts();
  // console.log(data);
  let content;
  if (loading) {
    content = <p>Loading...</p>
  }
  if (error) {
    content = <p>Something went wrong</p>
  }
  if (!loading && !error && products.length) {
    content = cart.map(product => <ProductCard product={product} key={product._id}></ProductCard>)
  }
  if (!loading && !error && products.length === 0) {
    content = <p>Nothing to show, Product List is empty</p>
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10'>
      {content}
    </div>
  );
};

export default Cart;
