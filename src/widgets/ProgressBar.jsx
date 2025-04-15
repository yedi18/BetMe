import React from "react";

function ProgressBar({ color, progress,height}) {
    return (

        <div style={{...progressStyles.bar, height: `${height}px`}}>
          <div style={{ ...progressStyles.fill, width: `${progress}%`, backgroundColor: color, height: `${height}px` }}></div>
        </div>
    );
  }
  
  const progressStyles = {
    bar: {
      margin: "5px",
      width: "100%", // Defines the total width of the progress bar
      backgroundColor: "#B0B0B0", // Gray background
      borderRadius: "24px",
      overflow: "hidden", // Prevents overflow of inner fill
    },
    fill: {
      height: "100%", // Makes sure it fills the height of the bar
      borderRadius: "24px", // Matches the border radius of the bar
    },
  };
  
  export default ProgressBar;
  