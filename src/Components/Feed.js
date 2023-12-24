import React, { useState, useEffect } from "react";
import { getPhotos } from "../Services/PhotoService";
import PhotoCard from "./PhotoCard";

const Feed = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const fetchedPhotos = await getPhotos();
        setPhotos(fetchedPhotos);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className="feed">
      <h2>Photo Feed</h2>
      <div className="photo-list">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
