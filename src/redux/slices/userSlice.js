import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null, // Идентификатор пользователя
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload; // Устанавливаем ID пользователя
    },
    clearUserId: (state) => {
      state.userId = null; // Очищаем ID пользователя при выходе
    },
  },
});

export const { setUserId, clearUserId } = userSlice.actions;

export default userSlice.reducer;
