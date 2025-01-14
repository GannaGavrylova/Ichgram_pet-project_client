import { jwtDecode } from "jwt-decode";
import { setUserId } from "../redux/slices/userSlice.js";

export const initializeUser = (store) => {
  const token = localStorage.getItem("token"); // Получение токена из localStorage
  if (token) {
    try {
      const decode = jwtDecode(token); // Декодируем токен
      const userId = decode.id; // Извлекаем ID пользователя
      store.dispatch(setUserId(userId)); // Сохраняем ID в Redux
    } catch (error) {
      console.error("Ошибка при декларировании токена:", error);
    }
  }
};
