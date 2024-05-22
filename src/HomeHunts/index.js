import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css'; 

const HomeHunts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://furrl.in/api/products?page=${page}`);
      setProducts((prevProducts) => [...prevProducts, ...response.data.products]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products', error);
      setLoading(false);
    }
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className={styles.container} onScroll={handleScroll}>
      <header className={styles.header}>
        <div className={styles.nav}>
          <a href="https://furrl.in/wishlist" className={styles.wishlist}>Wishlist</a>
          <a href="https://furrl.in/cart" className={styles.cart}>Cart</a>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.productList}>
          {products.map((product) => (
            <div key={product.id} className={styles.product}>
              <a href={`/product/${product.id}`} className={styles.productLink}>
                <img src={product.image} alt={product.name} />
                <div className={styles.productDetails}>
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                </div>
              </a>
              <button
                className={styles.shareButton}
                onClick={() => navigator.share({ url: `/product/${product.id}` })}
              >
                Share
              </button>
            </div>
          ))}
        </div>
        {loading && <div>Loading...</div>}
      </main>
    </div>
  );
};

export default HomeHunts;
