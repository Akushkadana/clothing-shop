// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartPage from './pages/CartPage';
import { products } from './data/products';

function App() {
  return (
    <div className="app">
      <Header />

      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="products-grid">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            } 
          />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;