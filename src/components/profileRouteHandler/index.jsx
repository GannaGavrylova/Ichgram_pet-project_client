import { useParams } from "react-router-dom";
import getCurrentUserId from "../../utils/getCurrentUserId";
import MyProfile from "../../pages/myProfile";
import OtherProfile from "../../pages/otherProfile";

function ProfileRouteHandler() {
  const { id } = useParams();
  const currentUserId = getCurrentUserId();

  if (!id) {
    return <p>Error: No user ID provided</p>;
  }

  if (id === currentUserId) {
    return <MyProfile />;
  }
  return <OtherProfile />;
}

export default ProfileRouteHandler;
