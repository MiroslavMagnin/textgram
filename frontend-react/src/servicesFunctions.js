import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Check is token expored or not (only check)
export function isAuthorized() {
  let token = localStorage.getItem("token");

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error("Error decoding token: ", error);
    return false;
  }
}

// Check is token expored or not (check and call refreshToken() if a user isn't authorized)
export async function checkAuthorized() {
  const token = localStorage.getItem("token");

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      refreshToken();
    }
  } catch (error) {
    console.error("Error decoding token: ", error);
    refreshToken();
    return false;
  }
}

// Get new token
export async function refreshToken() {
  // TODO: if token is null, the user need to sign in again

  try {
    const response = await axios.post("/auth/refresh-token", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Handle successful
    const tokenData = response.data;
    console.log("TokenData: " + tokenData.accessToken);
    localStorage.setItem("token", tokenData.accessToken);
  } catch (error) {
    // Handle error
    console.error(
      "Refrech token failed: ",
      error.response ? error.response.data : error.message
    );
  }
}

export async function getUserDataByEmail(email) {
  try {
    const response = await axios.get("/user/get-user-by-email/" + email, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Handle successful
    const user = response.data;
    localStorage.setItem("user", JSON.stringify(user));

    console.log(user);
  } catch (error) {
    // Handle error
    console.error(
      "Get user data by email failed:",
      error.response ? error.response.data : error.message
    );
    // setError(error.response ? error.response.data : error.message);
  }
}

export async function getUserDataById(id) {
  const user = localStorage.getItem("user_" + id);
  if (user !== null) {
    return user;
  }

  try {
    const response = await axios.get("/user/get-user-by-id/" + id, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Handle successful
    const user = response.data;
    localStorage.setItem("user_" + response.data.userId, JSON.stringify(user));
    console.log("User from get-request" + user);

    return user;
  } catch (error) {
    // Handle error
    console.error(
      "Get user data by id failed:",
      error.response ? error.response.data : error.message
    );

    return null;
  }
}

export async function getAllFollowingPosts(id) {
  try {
    const response = await axios.get("/post/get-following-posts/" + id, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Handle successful
    const followingPosts = response.data;
    localStorage.setItem("following-posts", JSON.stringify(followingPosts));
    console.log(followingPosts);

    return followingPosts;
  } catch (error) {
    // Handle error
    console.error(
      "Get all following posts failed:",
      error.response ? error.response.data : error.message
    );

    checkAuthorized();

    return [];
  }
}

export async function getAllUserPosts(id) {
  try {
    const response = await axios.get("/post/get-user-posts-by-id/" + id, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // Handle successful
    const posts = response.data;
    localStorage.setItem("posts-user_" + id, JSON.stringify(posts));

    return JSON.stringify(posts);
  } catch (error) {
    // Handle error
    console.error(
      "Get user posts failed: ",
      error.response ? error.response.data : error.message
    );

    checkAuthorized();

    return [];
  }
}

export async function unfollow(from, to) {
  try {
    const response = await axios.delete(
      "/user/unfollow?from=" + from + "&" + "to=" + to,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "Application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // Handle successful
    const res = response.data;

    return res;
  } catch (error) {
    // Handle error
    console.error(
      "Unfollow failed: ",
      error.response ? error.response.data : error.message
    );

    checkAuthorized();

    return "Unfollow failed";
  }
}
