import axios from "axios";
import API from "../utils/app.js"; // Ваш API клиент для запросов

/**
 * Функция для лайка поста.
 * @param {string} postId - ID поста, который нужно лайкнуть.
 * @param {string} userId - ID пользователя, который ставит лайк.
 * @returns {Promise<object>} - Результат выполнения запроса.
 */
export const likePost = async (postId, userId) => {
  try {
    // Проверка наличия необходимых параметров
    if (!postId || !userId) {
      throw new Error("Post ID and User ID are required");
    }

    // Отправляем запрос на сервер
    const response = await API.post(`/api/likes/${postId}/like/${userId}`, {
      postId,
      userId,
    });
    if (response.status === 201) {
      return {
        success: true,
        data: response.data,
        message: "Post liked successfully",
      };
    }
    return {
      success: false,
      message: response.data?.error || "Failed to like the post",
    };
  } catch (error) {
    console.error("Error liking the post:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred",
    };
  }
};

export const unLikePost = async (postId, userId) => {
  try {
    const response = await API.delete(`/api/likes/${postId}/unlike/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error unliking the post: ", error);
    throw error;
  }
};
