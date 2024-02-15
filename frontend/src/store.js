import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import productsReducer from "./slices/productsSlice";
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';
import messageReducer from './slices/messageSlice';
import channelReducer from './slices/channelSlice';
import layoutReducer from './slices/layoutSlice';

const reducer = combineReducers({
  productsState: productsReducer,
  productState: productReducer,
  authState: authReducer,
  cartState: cartReducer,
  orderState: orderReducer,
  userState: userReducer,
  messageState: messageReducer,
  channelState: channelReducer,
  layoutState: layoutReducer,
})


const store = configureStore({
  reducer,
  middleware: [thunk]
})

export default store;