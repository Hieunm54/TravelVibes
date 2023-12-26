import React, { useState, useRef, useEffect, useContext } from "react";
import { Map, NavigationControl, Popup } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import VisitingLocationPopUpInfo from "../components/VisitingLocationPopUpInfo";
import MapMarker from "../components/MapMarker";
import { getBounds, getDirectionCoordinates } from "../components/Map/utils";
import AttractionsContext from "../hooks/attraction";
import Direction from "./Map/Direction";
import { useSelector } from "react-redux";

const mapConfig = {
  mapLib: mapboxgl,
  mapboxAccessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
  mapStyle: "mapbox://styles/mapbox/streets-v9",
  maxZoom: 16,
  initialViewState: {
    latitude: 21.0286669,
    longitude: 105.8521484,
    zoom: 17,
  },
};

const NewPostPageLayout = ({ children }) => {
  const attractions = useSelector((state) => state.attractions);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const mapRef = useRef(null);

  const handlePopUpDelete = (hoveredMarker) => {
    handleDelete(hoveredMarker);
    setHoveredMarker(null);
  };

  const updateBounds = async () => {
    if (attractions.length > 0 && attractions.length <= 1) {
      setCoordinates(null);

      mapRef.current.flyTo({
        center: attractions[0].coordinates,
        zoom: 17,
      });
    } else if (attractions.length > 1) {
      if (coordinates === "") return;

      const directionCoordinates = await getDirectionCoordinates(
        attractions,
        (e) => toast.error("Can't get the direction!")
      );
      const { northEast, southWest } = getBounds(
        attractions.map((attraction) => attraction.coordinates),
        directionCoordinates
      );
      mapRef.current.fitBounds([northEast, southWest], { padding: 100 });

      setCoordinates(directionCoordinates);
    }
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
        <Map ref={mapRef} {...mapConfig}>
          <NavigationControl
            className="navigation-control"
            showCompass={true}
          />
          {hoveredMarker && (
            <Popup
              longitude={hoveredMarker.coordinates[0]}
              latitude={hoveredMarker.coordinates[1]}
              onClose={(e) => setHoveredMarker(null)}
              anchor="right"
              offset={10}
              closeOnClick={false}
            >
              <VisitingLocationPopUpInfo
                name={hoveredMarker.name}
                address={hoveredMarker.address}
                onDelete={() => handlePopUpDelete(hoveredMarker)}
              />
            </Popup>
          )}
          {attractions.map((attraction) => (
            <MapMarker
              longitude={attraction.coordinates[0]}
              latitude={attraction.coordinates[1]}
              onClick={() => setHoveredMarker(attraction)}
            />
          ))}
          {coordinates && <Direction coordinates={coordinates} />}
        </Map>
      </section>
    </div>
  );
};

export default NewPostPageLayout;
