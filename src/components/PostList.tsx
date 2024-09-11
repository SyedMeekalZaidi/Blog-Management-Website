import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../hooks/usePosts';
import '../styles/postList.scss';

interface PostListProps {
    posts: Post[];
}

// Apply all styles on post data 
const PostList: React.FC<PostListProps> = ({ posts }) => {
    return (
        <article className="post-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <header>
                <img src={post.author.avatar} alt={post.author.name} className="post-avatar" />
                <div>
                  <h2 className="post-title">{post.title}</h2>
                  <time className="post-date">{new Date(post.publishDate).toLocaleDateString()}</time>
                </div>
              </header>
              <section className="post-summary">{post.summary}</section>
              <footer>
                Categories: {post.categories.map((cat) => cat.name).join(', ')}
              </footer>

              <div className="details-link-container">
                <Link to={'/post/${post.id}'} className="details-link">
                  View Details
                </Link>
              </div>

            </li>
          ))}
        </article>
      );
};

export default PostList