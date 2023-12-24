import React, { useState, useEffect } from "react";
import "./PhotoCard.css";

const PhotoCard = ({ photo, username }) => {
  const [likes, setLikes] = useState(photo.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(hasUserLikedPhoto(username));
  }, [username, photo.likes]);

  // Method to check if the user liked the photo
  const hasUserLikedPhoto = (username) => {
    return photo.likes.includes(username);
  };

  // Method to toggle like/unlike on the photo
  const handleLikeToggle = () => {
    const likedByUser = hasUserLikedPhoto(username);

    if (likedByUser) {
      // User has already liked the photo, so unlike it
      const updatedLikes = photo.likes.filter(
        (likedBy) => likedBy !== username
      );
      setLikes(updatedLikes.length);
      setIsLiked(false);
    } else {
      // User has not liked the photo, so like it
      const updatedLikes = [...photo.likes, username];
      setLikes(updatedLikes.length);
      setIsLiked(true);
    }
  };

  return (
    <div className="photo-card">
      <img
        src={process.env.PUBLIC_URL + photo.path}
        alt={`Posted by ${photo.postedby}`}
      />
      <div className="photo-details">
        <p>Posted by: {photo.postedby}</p>
        <p>Likes: {likes}</p>
        <button
          className={`like-button ${isLiked ? "liked" : ""}`}
          onClick={handleLikeToggle}
        >
          {isLiked ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
