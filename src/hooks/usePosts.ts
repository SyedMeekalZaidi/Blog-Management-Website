// Purpose: Fetching post data from API

// useState: manages state | useEffect: manage side effects like data fetching
import { useState, useEffect } from 'react';

/* Custome Interfaces */

interface Author {
  name: string;
  avatar: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  publishDate: string;
  author: Author;
  summary: string;
  categories: Category[];
}

/* Fetch posts from API */
const usePosts = () => {
  // State to store posts data
  const [posts, setPosts] = useState<Post[]>([]);

  // State to track loading
  const [loading, setLoading] = useState<boolean>(true);

  // State to store errors
  const [error, setError] = useState<string | null>(null);

  // Data fetching logic
  useEffect(() => {
    // async function to fetch posts data
    const fetchPosts = async () => {
      try {
        // fetch data from the mock API endpoint
        const response = await fetch('/api/posts');

        // If not ok then throw error
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        // Parse the JSON data from the response
        const data = await response.json();

        setPosts(data.posts);
      } catch (error) {
        // If error, update error state
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        // Loading complete
        setLoading(false);
      }
    };

    // Fetch the posts
    fetchPosts();
  }, []);

  // return the states
  return { posts, loading, error };
};

export default usePosts;
