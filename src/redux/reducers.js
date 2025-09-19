import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../redux/Slicers/LoginSlicer";
import cartReducer from "../redux/Slicers/cartSlicer"

const rootReducer = combineReducers({
  loginData: loginReducer,
  cartDetails: cartReducer
});

export default rootReducer;