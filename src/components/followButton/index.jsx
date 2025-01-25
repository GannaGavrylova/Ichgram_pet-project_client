// import styles from "./followButton.module.css";
// import { useState } from "react";
// import API from "../../utils/app.js";
// import { useSelector } from "react-redux";

// function FollowButton({ isInitiallyFollowing, onFollowChange, targetUserId }) {
//   const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing);
//   const [isLoading, setIsLoading] = useState(false);
//   const currentUserId = useSelector((state) => state.user.userId);

//   console.log("Butto following not: ", isFollowing);

//   const handleFollowing = async () => {
//     if (isLoading) return;

//     setIsLoading(true);
//     console.log(isFollowing);

//     try {
//       const response = await API.post(`/api/follow/${targetUserId}/follow`, {
//         userId: currentUserId,
//       });
//       console.log("Follow successful:", response.data);
//       if (response.data.success) {
//         setIsFollowing(true);
//         if (onFollowChange) {
//           onFollowChange(targetUserId, true);
//         }
//       }
//     } catch (error) {
//       console.error(
//         "Error followers user: ",
//         error.response?.data || error.message
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <button
//         className={`${styles.followBtn} ${
//           isFollowing ? styles.following : styles.follow
//         }`}
//         type="button"
//         onClick={handleFollowing}
//         disabled={isFollowing || isLoading}
//         // style={{
//         //   cursor: isFollowing ? "not-allowed" : "pointer",
//         //   opacity: isFollowing ? 0.6 : 1,
//         // }}
//       >
//         {isFollowing ? "Following" : isLoading ? "Loading..." : "Follow"}
//       </button>
//     </div>
//   );
// }

// export default FollowButton;

import styles from "./followButton.module.css";
import { useState } from "react";
import API from "../../utils/app.js";
import { useSelector } from "react-redux";

function FollowButton({ isInitiallyFollowing, onFollowChange, targetUserId }) {
  const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing);
  const [isLoading, setIsLoading] = useState(false);
  const currentUserId = useSelector((state) => state.user.userId);

  const handleFollowing = async () => {
    if (isLoading || isFollowing) {
      console.log("Action skipped: isLoading or isFollowing is true");
      return;
    }
    console.log("Starting follow request...");
    setIsLoading(true);
    try {
      const response = await API.post(`/api/follow/${targetUserId}/follow`, {
        userId: currentUserId,
      });

      if (!response.data.success) {
        setIsFollowing(true);

        if (onFollowChange) {
          console.log("Calling onFollowChange with:", targetUserId, true);
          onFollowChange(targetUserId, true);
        } else {
          console.warn("onFollowChange is undefined!");
        }
      }
    } catch (error) {
      console.error(
        "Error following user: ",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`${styles.followBtn} ${
        isFollowing ? styles.following : styles.follow
      }`}
      type="button"
      onClick={() => {
        handleFollowing();
      }}
      disabled={isLoading || isFollowing}
    >
      {isFollowing ? "Following" : isLoading ? "Loading..." : "Follow"}
    </button>
  );
}

export default FollowButton;
