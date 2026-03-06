import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cart/cartSlice';

function Cart() {
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return <div className="cart-empty">Корзина пуста</div>;
  }

  return (
    <div className="cart">
      <h2>Корзина ({items.length})</h2>
      
      {items.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} width={60} />
          <div>
            <h4>{item.title}</h4>
            <p>{item.price} ₽ × {item.quantity}</p>
          </div>
          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Удалить
          </button>
        </div>
      ))}

      <div className="cart-total">
        <strong>Итого: {total} ₽</strong>
        <button onClick={() => dispatch(clearCart())}>Очистить</button>
      </div>
    </div>
  );
}

export default Cart;