import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

// // Создаём контекст
// export const UserContext = createContext();

// // Создаём провайдер

// export const UserProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/users/677f993c76339da23959f584")
//       .then((response) => {
//         setUserData(response.data);
//       })
//       .catch((error) => {
//         console.error("Ошибка при загрузке данных пользователя:", error);
//       });
//   }, []);
//   console.log(userData);
//   return (
//     <UserContext.Provider value={{ userData, setUserData }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
// // Добавляем валидацию пропсов
// UserProvider.propTypes = {
//   children: PropTypes.node.isRequired, // Ожидаем, что children будут React-узлами
// };
// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [userId, setUserId] = useState("677f993c76339da23959f584");

//   return (
//     <UserContext.Provider value={{ userId, setUserId }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// Добавляем валидацию пропсов
UserProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ожидаем, что children будут React-узлами
};
