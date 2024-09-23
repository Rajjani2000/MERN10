import axios from "axios";

const getHeader = () => {
  return { headers: { authorization: 'Bearer ' + localStorage.getItem("token") } }
}

export const createUser = async (userData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users`,
      userData
    );

    if (response.status === 201) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/users/login`,
      credentials
    );

    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// posts functions
export const createPost = async (postData) => {
  try {
    const token = localStorage.getItem('token');

    // Check if the token is present
    if (!token) {
      console.error('User is not logged in. Please log in to create a post.');
      return null;
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/posts`,
      {
        ...postData,
        createdBy: decodedToken.userId, // Change this line
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201) {
      console.log('New post created:', response.data);
      return response.data;
    }

    return null;
  } catch (err) {
    console.error('Error frontendfuntion post:', err.message);
    return null;
  }
};

// Get all posts
export const getPosts = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/posts`, getHeader());

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

// Get a post by ID this is the next one to fix 
export const getPostsByRole = async (postId) => {
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
      commentData,
      getHeader()
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
      reportData,
      getHeader()
    );

    if (response.status === 200) {
      return response.data;
    }
    return null;
  }
  catch (err) {
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

