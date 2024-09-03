import "./Posts.css";
import Button from "../../Button/Button";
import { Link } from "react-router-dom";
import { unfollow } from "../../../servicesFunctions.js";

export default function Post({ post, userId }) {
  function handleUnfollow() {
    unfollow(Number(userId), Number(post.authorId));
    console.log("Unfollow from=" + userId + " to=" + post.authorId);
  }

  return (
    <div className="post-container">
      <div className="post-header">
        <div className="post-header__author">
          <Link
            className="post-header__author-link"
            to={"/user/" + post.authorId}
          >
            {post.authorName !== null ? post.authorName : post.authorId}
          </Link>

          <div className="circle"></div>

          <div className="post-header__date-of-writing">
            {new Date(post.updatedAt).toLocaleDateString()}
          </div>
        </div>

        <div className="post-header__actions">
          <Button onClick={handleUnfollow}>Unfollow</Button>
        </div>
      </div>

      <hr />

      <div className="post-content">
        <div className="post-content__text">{post.text}</div>
      </div>
    </div>
  );
}
