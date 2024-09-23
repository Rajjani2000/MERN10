import axios from "axios";



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

//posts functions
// Create a new post
export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/posts`, postData);

    if (response.status === 201) {
      console.log("New post created:", response.data);
      return response.data;
    }
    return null;
  } catch (err) {
    console.error("Error creating post:", err.message);
    return null;
  }
};


const userIdFromToken = 'yourUserId';

const postData = {
  title: 'Your Post Title',
  content: 'Your Post Content',
  createdBy: userIdFromToken,
};

const createdPost = await createPost(postData);

if (createdPost) {
  // Post created successfully
  console.log('Post created:', createdPost);
} else {
  // Error creating post
  console.error('Failed to create post');
}


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

