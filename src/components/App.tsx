import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom'; // Correct imports // Imports for client side routing
import usePosts from '../hooks/usePosts';
import PostList from './PostList';
import Filter from './filter';
import PostDetail from './PostDetail';
import '../styles/index.scss'; // Import the main SCSS file for styling
import '../styles/mainPage.scss';

// Convert a query string to an object
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};  

const App: React.FC = () => {

  const post_count = 12;

  // Use the custom hook to fetch posts and manage loading and error states
  const { posts, loading, error } = usePosts();
  // State of categories selected (list)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // State of filtered posts
  const [filteredPosts, setFilteredPosts] = useState(posts);
  // Pagination state
  const [visiblePosts, setVisiblePosts] = useState(post_count);
  // Animation state
  const [animate, setAnimate] = useState(false);

  // Manage query strings
  const query = useQuery(); 
  const navigate = useNavigate();

  // Use Effect for persistent filtering
  useEffect(() => {
    const categoriesFromQuery = query.get('categories');
    if (categoriesFromQuery) {
      setSelectedCategories(categoriesFromQuery.split(','));
    }
  }, []);


  // Use Effect for posts
  useEffect(() => {
    // No Categories selected    
    if (selectedCategories.length == 0) {
      setFilteredPosts(posts); // Show all posts
    } else {
      // Get the list of posts that match the categories
      setFilteredPosts(
        posts.filter((post) =>
          post.categories.some((category) => selectedCategories.includes(category.name))
        )
      );
    }   
    
    setVisiblePosts(post_count); // when filtering, reset to default post count (12) 

  }, [posts, selectedCategories]);

  const handleFilterChange = (category: string) => {

    setAnimate(true); // Start animation whenever filter chosen
    const updatedCategories = selectedCategories.includes(category) 
      ? selectedCategories.filter((cat) => cat !== category) 
      : [...selectedCategories, category];
    
    setSelectedCategories(updatedCategories);

    // Update the URL with the new selected categories
    const newQueryString = updatedCategories.length > 0 
      ? `?categories=${updatedCategories.join(',')}` 
      : '';

    navigate({
      pathname: '/',
      search: newQueryString
    }, { replace: true });

    setTimeout(() => setAnimate(true), 10); // Create a delay
    setAnimate(false); // Close animation
  };

  // Load more posts
  const handleLoadMore = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 12);
  };


  // Display a loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display an error message if there's an issue fetching the data
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Get the unique list of categories
  const allCategories = Array.from(
    new Set(posts.flatMap(
      (post) => post.categories.map(category => category.name)
    ))
  );

  // Once data is loaded, render the PostList component with the posts data
  return (
    <>
      <header className='main-header'>
        <h1>Gwitter</h1> 
        <p>G for gibberish</p>
      </header>

      <main className="main-layout">
        <aside className="sidebar">
          <Filter
            categories={allCategories}
            selectedCategories={selectedCategories}
            onFilterChange={handleFilterChange}
          />
        </aside>

        <article className={`content-container ${animate ? 'float-in' : ''}`}>
          <Routes>
            {/* Client Side routing for details page */}
            <Route
              path="/"
              element={
                <>
                  <PostList posts={filteredPosts.slice(0, visiblePosts)} />
                  {visiblePosts < filteredPosts.length && (
                    <div className='load-more-container'>
                      <button className='load-more-button' onClick={handleLoadMore}>
                        Load More
                      </button>
                    </div>
                  )}
                </>
              }
            />
            <Route path="/post/:id" element={<PostDetail />} /> 
          </Routes>
        </article>
      </main>
    </>
  );
};

export default App;
