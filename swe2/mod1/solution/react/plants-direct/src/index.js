import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import data from './products.json'

const initialState = createSlice({
  name: 'plants-direct',
  initialState: {
    cart: [],
    products: data.products
  },
  reducers: {
    addToCart: (state, action) => {
      const index = state.products.findIndex(p => p.productId === action.payload.productId)
      const inCart = state.cart.findIndex(p => p.productId === action.payload.productId)

      if (inCart > -1) {
        state.products[index].addedToCart = false
        state.cart.splice(index, 1)
      } else {
        state.products[index].addedToCart = true
        state.cart.push(action.payload)
      }
    }
  }
})

export const { addToCart } = initialState.actions

const store = configureStore(initialState)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
