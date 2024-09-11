import "./UserPage.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { follow, unfollow, checkIsFollow } from "../../servicesFunctions.js";
import { useEffect, useState } from "react";
import ProfileIcon from "../../assets/icons/ProfileIcon";
import GoToLinkIcon from "../../assets/icons/GoToLinkIcon";

export default function Post({ authUser, user }) {
  function handleUnfollow() {
    unfollow(Number(userId), Number(post.authorId));
    console.log("Unfollow from=" + userId + " to=" + post.authorId);
  }

  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    // Check the auth user is follow to this user
    const getResponse = checkIsFollow(authUser.userId, user.userId);
    getResponse.then(function (response) {
      setIsFollow(response.message.includes("doesn't") ? false : true);
    });
  }, []);

  return (
    <div className="user-item">
      <div className="user-left">
        <Link className="user-left__item-a" to={"/user/" + user.userId}>
          <div className="user-left__item-icon">
            <ProfileIcon fillColor={"white"} size="15" />
          </div>
          <span className="user-left__item-label">{user.name}</span>
        </Link>
      </div>

      <div className="user-right">
        <div className="follow-button">
          {isFollow ? (
            <>
              <Button>Unfollow</Button>
            </>
          ) : (
            <>
              <Button>Follow</Button>
            </>
          )}
        </div>

        <Link className="user-left__item-a" to={"/user/" + user.userId}>
          <div className="user-left__item-icon">
            <GoToLinkIcon fillColor={"white"} size="15" />
          </div>
        </Link>
      </div>
    </div>
  );
}
