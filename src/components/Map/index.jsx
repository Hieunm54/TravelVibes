import { Map as Mapbox, NavigationControl } from "react-map-gl";
import Marker from "./Marker";

const Map = ({ waypoints, onMouseEnter, onMouseLeave }) => {
  <Mapbox
    ref={mapRef}
    mapLib={mapboxgl}
    mapboxAccessToken="pk.eyJ1IjoiaGFycnluMTIzIiwiYSI6ImNscWIwdGE5MjFzbXYya2t6ZTZrcnFpcW4ifQ.aP1eiMiQHgIi6RsGFa0djA"
    mapStyle="mapbox://styles/mapbox/streets-v9"
    maxZoom={16}
    initialViewState={{
      latitude: 21.0286669,
      longitude: 105.8521484,
      zoom: 17,
    }}
    onMouseEnter={(e) => console.log(e)}
  >
    <NavigationControl className="navigation-control" showCompass={true} />
    {waypoints.map((waypoint, index) => (
      <div key={waypoint.id}>
        {waypoint.shownOnMap && (
          <Popup
            longitude={waypoint.location.longitude}
            latitude={waypoint.location.latitude}
            anchor="right"
            offset={10}
            closeButton={false}
            closeOnClick={false}
          >
            <h4>{attraction.name}</h4>
            <address>{attraction.address}</address>
            <div className="flex items-center space-x-2 mt-2">
              <FontAwesomeIcon icon={faPenToSquare} />
              <button>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={() => {
                    // TODO: Call API
                    waypoints.splice(index, 1);
                    setAttractions([...attractions]);
                  }}
                />
              </button>
            </div>
          </Popup>
        )}
        <Marker
          latitude={attraction.location.latitude}
          longitude={attraction.location.longitude}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      </div>
    ))}
    {coordinates && (
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
            "line-color": "rgb(3, 170, 238)",
            "line-width": 5,
          }}
        />
      </Source>
    )}
  </Mapbox>;
};

export default Map;
