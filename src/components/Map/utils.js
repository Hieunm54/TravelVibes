const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function getBounds(waypoints, directionCoordinates) {
  const lngs = waypoints.map((waypoint) => waypoint[0]);
  const lats = waypoints.map((waypoint) => waypoint[1]);
  if (directionCoordinates) {
    lngs.push(...directionCoordinates.map((coordinate) => coordinate[0]));
    lats.push(...directionCoordinates.map((coordinate) => coordinate[1]));
  }

  return {
    southWest: [Math.min(...lngs), Math.min(...lats)],
    northEast: [Math.max(...lngs), Math.max(...lats)],
  };
}

async function getDirectionCoordinates(waypoints, errorHandler) {
  try {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${waypoints
        .map((waypoint) => waypoint.coordinates)
        .join(";")}?geometries=geojson&access_token=${mapboxToken}`,
      { method: "GET" }
    );
    const response = await query.json();
    return response.routes[0].geometry.coordinates;
  } catch (e) {
    errorHandler(e);
  }
}

export { getBounds, getDirectionCoordinates };
