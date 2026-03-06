// src/components/Header.jsx
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
  const { items } = useSelector(state => state.cart);

  return (
    <header>
      <Link to="/" className="logo">
        <h1>Магазин одежды</h1>
      </Link>
      <nav>
        <Link to="/cart" className="cart-link">
          Корзина: {items.length} {items.length === 1 ? 'товар' : 'товаров'}
        </Link>
      </nav>
    </header>
  );
}

export default Header;