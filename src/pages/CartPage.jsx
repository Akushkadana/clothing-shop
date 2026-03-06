// src/pages/CartPage.jsx
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';

function CartPage() {
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="cart-empty-page">
        <h2>Ваша корзина пуста</h2>
        <p>Добавьте товары из каталога!</p>
        <Link to="/" className="back-to-shop">
          Вернуться в магазин
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Корзина</h1>
      <div className="cart-items-list">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} width={80} />
            <div className="item-info">
              <h3>{item.title}</h3>
              <p>{item.price} сом × {item.quantity}</p>
              <p className="subtotal">
                Подытог: {item.price * item.quantity} сом
              </p>
            </div>
            <button 
              className="remove-btn"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="total">
          <strong>Итого: {total} сом</strong>
        </div>
        <div className="cart-actions">
          <button 
            className="clear-btn"
            onClick={() => dispatch(clearCart())}
          >
            Очистить корзину
          </button>
          <button className="checkout-btn">
            Оформить заказ
          </button>
        </div>
      </div>

      <Link to="/" className="continue-shopping">
        Продолжить покупки
      </Link>
    </div>
  );
}

export default CartPage;