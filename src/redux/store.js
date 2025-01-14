import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/slices/userSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer, // Подключаем userSlice
  },
});

export default store;
