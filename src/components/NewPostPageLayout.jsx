import React, { useState, useEffect } from "react";
import { NavigationControl, Popup } from "react-map-gl";
import VisitingLocationPopUpInfo from "../components/VisitingLocationPopUpInfo";
import MapMarker from "../components/MapMarker";
import Direction from "./Map/Direction";
import { useSelector } from "react-redux";
import Mapbox from "./Mapbox";
import { useMap } from "../hooks/map";
import { toast } from "react-toastify";

const PostPageLayout = ({ children }) => {
  const attractions = useSelector((state) => state.attractions);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const { coordinates, mapRef, updateBounds } = useMap(attractions, (e) =>
    toast.error("Unable to retrieve attractions!")
  );

  const handlePopUpClose = () => {
    setHoveredMarker(null);
  };

  const handlePopUpOpen = (attraction, index) => {
    setHoveredMarker({ attraction, index });
  };

  useEffect(() => {
    if (!mapRef) return;
    setHoveredMarker(null);
    updateBounds();
  }, [attractions, mapRef]);

  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden">
      <section className="col-span-6 border-r-2 border-gray-300">
        {children}
      </section>
      <section className="col-span-6">
        <Mapbox ref={mapRef} onLoad={() => updateBounds()}>
          <NavigationControl
            className="navigation-control"
            showCompass={true}
          />
          {hoveredMarker && (
            <Popup
              longitude={hoveredMarker.attraction.coordinates[0]}
              latitude={hoveredMarker.attraction.coordinates[1]}
              onClose={handlePopUpClose}
              anchor="right"
              offset={10}
              closeOnClick={false}
            >
              <VisitingLocationPopUpInfo
                name={hoveredMarker.attraction.name}
                address={hoveredMarker.attraction.address}
              />
            </Popup>
          )}
          {attractions.map((attraction, index) => (
            <MapMarker
              key={attraction._id}
              longitude={attraction.coordinates[0]}
              latitude={attraction.coordinates[1]}
              onClick={() => handlePopUpOpen(attraction, index)}
            />
          ))}
          {coordinates && <Direction coordinates={coordinates} />}
        </Mapbox>
      </section>
    </div>
  );
};

export default PostPageLayout;
