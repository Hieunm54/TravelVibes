import { useRef, useState } from "react";
import { getBounds, getDirectionCoordinates } from "../components/Map/utils";

export const useMap = (waypoints, onGettingDirectionError) => {
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
        onGettingDirectionError
      );

      const { northEast, southWest } = getBounds(
        waypoints.map((attraction) => attraction.coordinates),
        directionCoordinates
      );

      mapRef.current.fitBounds([northEast, southWest], { padding: 100 });

      setCoordinates(directionCoordinates);
    }
  };

  return { coordinates, mapRef, updateBounds };
};
