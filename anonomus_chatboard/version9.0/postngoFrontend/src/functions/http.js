import axios from "axios";
// users functions
export const createUser = async (userData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users`,  // Updated endpoint to use plural "users"
      userData
    );

    if (response.status === 201) {  // Adjusted status check for user creation
      return response.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const getUser = async (
  adminUsername,
  adminpassword,
  classroomname,
  classroompassword
) => {
  try {
    let response;

    if (adminUsername) {
      response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/users?adminusername=${adminUsername}&adminpassword=${adminpassword}&classroomname=${classroomname}&classroompassword=${classroompassword}`
      );
    } else {
      response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`);
    }

    if (response.status === 200) {
      console.log("User(s) retrieved:", response.data);
      return response.data;
    }
    return null;
  } catch (err) {
    console.error("Error getting user:", err.message);
    return null;
  }
};

export const handleLogin = async (credentials) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, credentials);
    const token = response.data.token;

    // Store the token in a secure way (e.g., in a cookie or localStorage)
    localStorage.setItem('authToken', token);

    // Perform any additional actions, such as redirecting the user

    return true; // Indicate successful login
  } catch (error) {
    console.error('Error during login:', error.message);
    return false; // Indicate login failure
  }
};




//posts functions
// Create a new post
export const createPost = async (postData, token) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/posts`, // Update the endpoint
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error("Error creating post:", err.message);
    return null;
  }
};

// Get all posts
export const getPosts = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts`);

    if (response.status === 200) {
      console.log("Posts retrieved:", response.data);
      return response.data;
    }
    return null;
  } catch (err) {
    console.error("Error getting posts:", err.message);
    return null;
  }
};

// Get a post by ID
export const getPostById = async (postId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts/${postId}`);

    if (response.status === 200) {
      console.log("Post retrieved:", response.data);
      return response.data;
    }
    return null;
  } catch (err) {
    console.error("Error getting post:", err.message);
    return null;
  }
};

// Add a comment to a post
export const addCommentToPost = async (postId, commentData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/posts/${postId}/comments`,
      commentData
    );

    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error("Error adding comment to post:", err.message);
    return null;
  }
};

// Report a post
export const reportPost = async (postId, reportData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/posts/${postId}/reports`,
      reportData
    );

    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error("Error reporting post:", err.message);
    return null;
  }
};

// Delete a post by ID
export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/posts/${postId}`);

    if (response.status === 200) {
      console.log("Post deleted successfully");
      return true;
    }
    return false;
  } catch (err) {
    console.error("Error deleting post:", err.message);
    return false;
  }
};

