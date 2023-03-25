import { useState, useEffect } from "react";
import "./showProfileInfo.css";

const ShowProfileInfo = ({ update }) => {
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    // Add the "show" class to trigger the animation
    const profileInfoElement = document.querySelector(".showProfileInfo");
    profileInfoElement.classList.add("show");

    // Remove the "show" class after the animation completes
    const animationEndHandler = () => {
      profileInfoElement.classList.remove("show");
      setRenderCount(renderCount + 1); // Increment the render count
    };
    profileInfoElement.addEventListener("animationend", animationEndHandler);

    return () => {
      // Clean up the event listener
      profileInfoElement.removeEventListener(
        "animationend",
        animationEndHandler
      );
    };
  }, [renderCount, update]);

  return (
    <div className="showProfileInfo">
      <div>hello</div>
    </div>
  );
};

export default ShowProfileInfo;
