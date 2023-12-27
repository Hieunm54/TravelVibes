import React from "react";
import { Popup } from "react-map-gl";

const LocationInfoPopUp = ({ latitude, longitude, children, onClose }) => {
  const [hoveredMarker, setHoveredMarker] = useState(null);

  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      anchor="right"
      offset={10}
      closeOnClick={false}
      onClose={onClose}
    >
      {children}
    </Popup>
  );
};

export default LocationInfoPopUp;
