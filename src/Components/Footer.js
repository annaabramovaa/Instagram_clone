import React, { useState, useEffect, useRef } from "react";
import UploadWidget from "./UploadWidget";
import "./Footer.css"; // Add your styles if needed

const Footer = ({ onAddPhoto }) => {
  const [loggedInUser, setLoggedInUser] = useState(
    sessionStorage.getItem("loggedInUser")
  );
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const widgetRef = useRef();

  const handleAddPhotoClick = () => {
    if (!widgetRef.current) {
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: "djx0lbw5o",
          uploadPreset: "higllu2x",
        },
        function (error, result) {
          if (!error && result && result.event === "success") {
            if (typeof onAddPhoto === "function") {
              onAddPhoto(result.info.secure_url);
            }
          }
        }
      );
    }

    widgetRef.current.open();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (typeof onAddPhoto === "function") {
        onAddPhoto(selectedFile);
      } else {
        console.error("onAddPhoto is not a function");
      }
    }
  };

  const handleScroll = () => {
    const isAtBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;

    setIsButtonVisible(isAtBottom);
  };

  useEffect(() => {
    const userFromSessionStorage = sessionStorage.getItem("loggedInUser");
    setLoggedInUser(userFromSessionStorage);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`footer_btn ${isButtonVisible ? "visible" : ""}`}>
      {loggedInUser && (
        <footer className="footer">
          <button className="plus" onClick={handleAddPhotoClick}>
            +
          </button>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <UploadWidget onAddPhoto={onAddPhoto} />
        </footer>
      )}
    </div>
  );
};

export default Footer;
