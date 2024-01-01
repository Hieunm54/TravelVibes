import React, { useEffect, useState } from "react";
import Mapbox from "./Mapbox";
import { NavigationControl, Popup } from "react-map-gl";

import MapMarker from "./MapMarker";
import Direction from "./Map/Direction";
import { useMap } from "../hooks/map";
import VisitingLocationPopUpInfo from "./VisitingLocationPopUpInfo";

const PostMap = ({ attractions, style }) => {
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const { coordinates, mapRef, updateBounds } = useMap(attractions, (e) =>
    toast.error("Unable to retrieve direction")
  );

  const handlePopUpClose = () => {
    setHoveredMarker(null);
  };

  const handlePopUpOpen = (attraction) => {
    setHoveredMarker(attraction);
  };

  useEffect(() => {
    if (!mapRef) return;
    updateBounds();
  }, [attractions, mapRef]);

  return (
    <Mapbox style={style} ref={mapRef}>
      <NavigationControl className="navigation-control" showCompass={true} />
      {hoveredMarker && (
        <Popup
          longitude={hoveredMarker.coordinates[0]}
          latitude={hoveredMarker.coordinates[1]}
          onClose={handlePopUpClose}
          anchor="right"
          offset={10}
          closeOnClick={false}
        >
          <VisitingLocationPopUpInfo
            name={hoveredMarker.name}
            address={hoveredMarker.address}
          />
        </Popup>
      )}
      {attractions.map((attraction) => (
        <MapMarker
          longitude={attraction.coordinates[0]}
          latitude={attraction.coordinates[1]}
          onClick={() => handlePopUpOpen(attraction)}
          key={attraction._id}
        />
      ))}
      {coordinates && <Direction coordinates={coordinates} />}
    </Mapbox>
  );
};

export default PostMap;
