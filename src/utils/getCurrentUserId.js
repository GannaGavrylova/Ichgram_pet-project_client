import { jwtDecode } from "jwt-decode";

function getCurrentUserId() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.id;
  } catch (error) {
    console.error("Invalid token other", error);
  }
}

export default getCurrentUserId;
