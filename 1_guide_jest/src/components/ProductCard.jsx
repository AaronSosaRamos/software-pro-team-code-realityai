import React from "react";

function ProductCard({ product }) {
  if (!product) {
    return <div>No product available.</div>;
  }

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
    </div>
  );
}

export default ProductCard;
