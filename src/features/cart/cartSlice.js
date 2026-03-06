// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Функция для безопасной загрузки корзины из localStorage
const loadCartFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('cart');
    if (!saved) return { items: [], total: 0 };
    
    const parsed = JSON.parse(saved);
    // Простая проверка структуры (на случай повреждённых данных)
    if (
      parsed &&
      Array.isArray(parsed.items) &&
      typeof parsed.total === 'number'
    ) {
      return parsed;
    }
  } catch (error) {
    console.error('Ошибка при чтении корзины из localStorage:', error);
  }
  
  // Если что-то пошло не так → возвращаем пустую корзину
  return { items: [], total: 0 };
};

// Начальное состояние — либо из localStorage, либо пустое
const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      // Пересчитываем total
      state.total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

      // Сразу сохраняем в localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);

      // Пересчитываем total
      state.total = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

      // Сохраняем
      localStorage.setItem('cart', JSON.stringify(state));
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;

      // При очистке удаляем и из localStorage
      localStorage.removeItem('cart');
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;