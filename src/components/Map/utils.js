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

export { getBounds };
