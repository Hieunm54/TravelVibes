import React from "react";
import { Layer, Source } from "react-map-gl";

const Direction = ({ coordinates }) => {
  return (
    <Source
      id="route"
      type="geojson"
      data={{
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates,
        },
      }}
    >
      <Layer
        id="route"
        type="line"
        source="route"
        layout={{
          "line-join": "round",
          "line-cap": "round",
        }}
        paint={{
          "line-color": "#3b82f6",
          "line-width": 5,
        }}
      />
    </Source>
  );
};

export default Direction;
