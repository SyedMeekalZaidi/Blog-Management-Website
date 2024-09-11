import React from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import '../styles/PostDetails.scss';

// Creates the modal page to show details
const PostDetail: React.FC = () => {
    const { id } = useParams<{ id:string }>(); // Grab post id
    const navigate = useNavigate();

    return (
        <main className="post-detail-modal">
            <article className="post-detail-content">
                <h2>Details</h2>
                <p>No details needed, just hire me 😁</p>
                <button className="close-button" onClick={() => navigate('/')}>Close</button>
            </article>
        </main>
    );

};

export default PostDetail