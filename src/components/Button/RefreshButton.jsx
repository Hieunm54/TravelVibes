/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import "./RefreshButton.css";

const RefreshButton = ({ onRefresh }) => {
  const [spinning, setSpinning] = useState(false);

  const handleRefresh = async () => {
    setSpinning(true);

    // Your API call logic goes here
    try {
      await onRefresh();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setTimeout(() => {
        setSpinning(false);
      }, 2000);
    }
  };

  return (
    <button
      //   className={`refresh-button ${spinning ? "spin" : ""}`}
      onClick={handleRefresh}
      disabled={spinning}
    >
      <FontAwesomeIcon
        icon={faSync}
        className={`refresh-button ${spinning ? "spin" : ""}`}
      />
    </button>
  );
};

export default RefreshButton;
