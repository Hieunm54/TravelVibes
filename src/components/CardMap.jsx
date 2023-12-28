import React, { useEffect } from "react";
import Mapbox from "./Mapbox";
import { NavigationControl } from "react-map-gl";

import MapMarker from "./MapMarker";
import Direction from "./Map/Direction";
import { useMap } from "../hooks/map";

const CardMap = ({ attractions }) => {
  const { coordinates, mapRef, updateBounds } = useMap(attractions, (e) =>
    toast.error("Unable to retrieve direction")
  );

  useEffect(() => {
    if (!mapRef) return;
    updateBounds();
  }, [mapRef]);

  return (
    <div className="h-56 mt-5">
      <Mapbox ref={mapRef} style={{ borderRadius: "6px" }}>
        <NavigationControl className="navigation-control" showCompass={true} />
        {attractions.map((attraction) => (
          <MapMarker
            longitude={attraction.coordinates[0]}
            latitude={attraction.coordinates[1]}
            key={attraction._id}
          />
        ))}
        {coordinates && <Direction coordinates={coordinates} />}
      </Mapbox>
    </div>
  );
};

export default CardMap;
