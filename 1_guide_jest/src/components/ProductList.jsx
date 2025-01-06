import React, { useState } from "react";
import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([
    { id: 1, name: "Product A", price: 50 },
    { id: 2, name: "Product B", price: 100 },
  ]);

  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  const addProduct = () => {
    if (!newProduct.name || newProduct.price === "") return;

    const id = products.length ? products[products.length - 1].id + 1 : 1;
    setProducts([...products, { id, ...newProduct }]);
    setNewProduct({ name: "", price: "" });
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updatedFields } : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div>
      <h1>Product List</h1>
      <div>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
          }
        />
        <button onClick={addProduct}>Add Product</button>
      </div>
      {products.length === 0 ? (
        <div>No product available.</div>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
              <div>
                <button onClick={() => updateProduct(product.id, { price: product.price + 10 })}>
                  Increase Price by $10
                </button>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
