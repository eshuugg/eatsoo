import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../redux/Slicers/LoginSlicer";

const rootReducer = combineReducers({
  loginData: loginReducer,
});

export default rootReducer;