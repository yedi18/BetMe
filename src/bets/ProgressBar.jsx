import React from "react";

function ProgressBar({ color, progress }) {
    return (
      <div style={progressStyles.item}>
        {/* Circle (User/Opponent) */}
        <div style={{ ...progressStyles.circle, backgroundColor: color }}></div>
  
        {/* Progress Bar */}
        <div style={progressStyles.bar}>
          <div style={{ ...progressStyles.fill, width: `${progress}%`, backgroundColor: color }}></div>
        </div>
      </div>
    );
  }
  
  const progressStyles = {
    item: {
      display: "flex", // Aligns items horizontally
      alignItems: "center", // Centers them vertically
      gap: "10px", // Adds space between elements
      marginBottom: "10px",
    },
    circle: {
      width: "60px", 
      height: "60px",
      borderRadius: "50%", // Makes it a circle
    },
    bar: {
      width: "220px", // Defines the total width of the progress bar
      height: "24px", // Defines the thickness of the bar
      backgroundColor: "#ccc", // Gray background
      borderRadius: "24px",
      overflow: "hidden", // Prevents overflow of inner fill
    },
    fill: {
      height: "100%", // Makes sure it fills the height of the bar
      borderRadius: "24px", // Matches the border radius of the bar
    },
  };
  
  export default ProgressBar;
  