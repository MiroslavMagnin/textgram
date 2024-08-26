import axios from "axios";

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
    console.log(user);
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
    console.log(user);

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

    return [];
    // setError(error.response ? error.response.data : error.message);
  }
}
