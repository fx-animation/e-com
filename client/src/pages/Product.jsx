import "../styles/products.css";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import Axios from "../Axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.get("/api/v1/product/filter");
        setProducts(response.data.products || []);
      } catch (error) {
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);
  console.log("Produits reçus:", products);
  return (
    <div>
      <h2>Produits en vente</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product._id} {...product} />
          ))
        ) : (
          <p>Aucun produit disponible.</p>
        )}
      </div>
    </div>
  );
};

export default Product;
