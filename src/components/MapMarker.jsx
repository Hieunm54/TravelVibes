import React from "react";
import { Marker } from "react-map-gl";
import LocationMarker from "./Map/LocationMarker";

const MapMarker = ({ longitude, latitude, onClick }) => {
  return (
    <Marker longitude={longitude} latitude={latitude} onClick={onClick}>
      <LocationMarker />
    </Marker>
  );
};

export default MapMarker;
