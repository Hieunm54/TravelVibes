import { useEffect, useRef, useState } from "react";
import { Map as Mapbox, Marker, NavigationControl } from "react-map-gl";
import mapboxgl from "mapbox-gl";

import Direction from "./Direction";
import { getBounds, getDirectionCoordinates } from "./utils";
import CustomMarker from "./CustomMarker";

const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map = ({ waypoints, onDeleteWaypoint }) => {
  const [coordinates, setCoordinates] = useState(null);
  const mapRef = useRef(null);

  const updateBounds = async () => {
    if (waypoints.length > 0 && waypoints.length <= 1) {
      setCoordinates(null);

      mapRef.current.flyTo({
        center: waypoints[0].coordinates,
        zoom: 17,
      });
    } else if (waypoints.length > 1) {
      if (coordinates === "") return;

      const directionCoordinates = await getDirectionCoordinates(
        waypoints,
        (e) => toast.error("Can't get the direction!")
      );
      const { northEast, southWest } = getBounds(
        waypoints.map((waypoint) => waypoint.coordinates),
        directionCoordinates
      );
      mapRef.current.fitBounds([northEast, southWest], { padding: 100 });

      setCoordinates(directionCoordinates);
    }
  };

  useEffect(() => {
    if (!mapRef) return;
    updateBounds();
  }, [waypoints, mapRef]);

  return (
    <Mapbox
      ref={mapRef}
      mapLib={mapboxgl}
      mapboxAccessToken={mapboxToken}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      maxZoom={16}
      initialViewState={{
        latitude: 21.0286669,
        longitude: 105.8521484,
        zoom: 17,
      }}
    >
      <NavigationControl className="navigation-control" showCompass={true} />
      <CustomMarker waypoints={waypoints} onDelete={onDeleteWaypoint} />
      {coordinates && <Direction coordinates={coordinates} />}
    </Mapbox>
  );
};

export default Map;
