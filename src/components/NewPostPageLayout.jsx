import React, { useState, useEffect } from "react";
import { NavigationControl, Popup } from "react-map-gl";
import VisitingLocationPopUpInfo from "../components/VisitingLocationPopUpInfo";
import MapMarker from "../components/MapMarker";
import Direction from "./Map/Direction";
import { useDispatch, useSelector } from "react-redux";
import Mapbox from "./Mapbox";
import { useMap } from "../hooks/map";
import { removeAttraction } from "../store/attractions";

const PostPageLayout = ({ children }) => {
  const dispatch = useDispatch();
  const attractions = useSelector((state) => state.attractions);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const { coordinates, mapRef, updateBounds } = useMap(attractions, (e) =>
    toast.error("Unable to retrieve attractions!")
  );

  const handlePopUpDelete = (index) => {
    dispatch(removeAttraction(index));
    setHoveredMarker(null);
  };

  const handlePopUpClose = () => {
    console.log(hoveredMarker);
    setHoveredMarker(null);
  };

  const handlePopUpOpen = (attraction, index) => {
    setHoveredMarker({ attraction, index });
  };

  useEffect(() => {
    if (!mapRef) return;
    updateBounds();
  }, [attractions, mapRef]);

  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden">
      <section className="col-span-4 border-r-2 border-gray-300">
        {children}
      </section>
      <section className="col-span-8">
        <Mapbox ref={mapRef}>
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
                onDelete={() => handlePopUpDelete(hoveredMarker.index)}
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
