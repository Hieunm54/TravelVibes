import mapboxgl from "mapbox-gl";
import React, { forwardRef } from "react";
import { Map } from "react-map-gl";

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

const Mapbox = forwardRef((props, ref) => {
  const { children, ...otherProps } = props;
  return (
    <Map ref={ref} {...mapConfig} {...otherProps}>
      {children}
    </Map>
  );
});

export default Mapbox;
