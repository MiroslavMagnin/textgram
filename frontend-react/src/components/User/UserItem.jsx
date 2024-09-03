import "./UserPage.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { follow, unfollow } from "../../servicesFunctions.js";

export default function Post({ user }) {
  function handleUnfollow() {
    unfollow(Number(userId), Number(post.authorId));
    console.log("Unfollow from=" + userId + " to=" + post.authorId);
  }

  return (
    <div className="user-item">
      <div>{user.name}</div>
    </div>
  );
}
