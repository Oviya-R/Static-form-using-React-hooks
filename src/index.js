import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const initialState = {
  cart: []
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex >= 0) {
        const updatedCart = state.cart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, cart: updatedCart };
      } else {
        return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    default:
      return state;
  }
};

const ShoppingCart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItemToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItemFromCart = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };

  const updateItemQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const calculateTotalPrice = () => {
    return state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <ul>
        {state.cart.map(item => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <span className="cart-item-name">{item.name}</span>
              <span>Price: ${item.price}</span>
              <span>Quantity: {item.quantity}</span>
              <span>Total: ${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <div className="item-controls">
              <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
              <button onClick={() => removeItemFromCart(item)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="total-price">Total Price: ${calculateTotalPrice()}</h3>
      <div className="add-items">
        <h3>Add Items</h3>
        <button onClick={() => addItemToCart({ id: 1, name: 'Apple', price: 1.5, image: 'https://cdn.pixabay.com/photo/2017/09/26/13/31/apple-2788616_1280.jpg' })}>
          Add Apple ($1.50)
        </button>
        <button onClick={() => addItemToCart({ id: 2, name: 'Banana', price: 0.9, image: 'https://cdn.pixabay.com/photo/2018/09/24/20/12/bananas-3700718_1280.jpg' })}>
          Add Banana ($0.90)
        </button>
        <button onClick={() => addItemToCart({ id: 3, name: 'Orange', price: 1.2, image: 'https://cdn.pixabay.com/photo/2019/11/19/13/10/fruit-4637398_1280.jpg' })}>
          Add Orange ($1.20)
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(<ShoppingCart />, document.getElementById('root'));

