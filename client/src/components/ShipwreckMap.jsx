import React from "react";

const ShipwreckMap = ({ shipwreck }) => {
  const { coordinates } = shipwreck;
  const coordinatesMatch = coordinates.match(/([-+]?\d*\.\d+|\d+)/g);

  if (!coordinatesMatch || coordinatesMatch.length !== 4) {
    console.error("Invalid coordinates:", coordinates);
    return <div>Error: Invalid coordinates</div>;
  }

  const latitude = parseFloat(coordinatesMatch[0] + "." + coordinatesMatch[1]);
  const longitude = parseFloat(coordinatesMatch[2] + "." + coordinatesMatch[3]);

  return (
    <iframe
      width="100%"
      height="100%"
      title={`map-${latitude}-${longitude}`}
      className="absolute inset-0"
      frameBorder={0}
      marginHeight={0}
      marginWidth={0}
      style={{ filter: "opacity(0.7)" }}
      src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyB90p1YPZjlgRQFoft_USPDy7Z6SJHJOHo&center=${latitude},${longitude}&zoom=5`}
    />
  );
};

export default ShipwreckMap;