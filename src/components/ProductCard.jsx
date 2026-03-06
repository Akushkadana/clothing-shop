import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.price} сом </p>
      <button onClick={() => dispatch(addToCart(product))}>
        В корзину
      </button>
    </div>
  );
}

export default ProductCard;