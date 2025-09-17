
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Prdoct.css"
const Product = () => {
  const [productdata, setproductdata] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const responce = await axios.get(`https://dummyjson.com/products`);
        setproductdata(responce.data.products); 
        console.log(responce.data.products);
      } catch (error) {
        console.error(`something went wrong ${error}`);
      }
    };
    fetch();
  }, []); 

  const handleitem = (item) => {
    setSelectedProduct(item); 
  };



return (
  <div className="ProductsParent">
    <div className="product-layout">
      {/* All products */}
      <div className="getallproducts">
        {productdata.length > 0 && (
          <div>
            {productdata.map((item) => (
              <div
                key={item.id}
                onClick={() => handleitem(item)}
                className="product-card"
              >
                <p>Id: {item.id}</p>
                <p>Title: {item.title}</p>
                <p>Description: {item.description}</p>
                <p>Price: ${item.price}</p>
                <p>Rating: {item.rating}</p>
                <p>Brand: {item.brand}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Item details */}
      <div className="iteamsdetails">
        {selectedProduct && (
          <div className="details-card">
            <h3>Selected Product Details</h3>
            <p>Id: {selectedProduct.id}</p>
            <p>Title: {selectedProduct.title}</p>
            <p>Description: {selectedProduct.description}</p>
            <p>Price: ${selectedProduct.price}</p>
            <p>Rating: {selectedProduct.rating}</p>
            <p>Brand: {selectedProduct.brand}</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

};

export default Product;
