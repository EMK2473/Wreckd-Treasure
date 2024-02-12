// function to generate a random hex color
export const generateRandomHexColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // haversine formula: d = 2 * R * arcsin(sqrt(sin^2((φ2 - φ1) / 2) + cos(φ1) * cos(φ2) * sin^2((λ2 - λ1) / 2)))
  // function to calc distance between 2 coordinates
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371e3; // earth's radius in meters
    var φ1 = (lat1 * Math.PI) / 180; // latitude of first point in radians
    var φ2 = (lat2 * Math.PI) / 180; // latitude of second point in radians
    var Δφ = ((lat2 - lat1) * Math.PI) / 180; // difference in latitude in radians
    var Δλ = ((lon2 - lon1) * Math.PI) / 180; // difference in longitude in radians

    // calcs squared difference in lat and lng
    var a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    // calc acrtangent formula
    // calcs angular distance between two points using haversine formula
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // calc angular distance in radians
    // returns distance between in meters
    var distance = R * c;

    return distance;
  }

  // function to calculate total distance of selected tour
  export const calculateTotalDistance = (selectedArray)=> {
    var totalDistance = 0;
    selectedArray.forEach(function (shipwreck, index) {
      if (index > 0) {
        var prevShipwreck = selectedArray[index - 1];
        var distance = calculateDistance(
          shipwreck.coordinates.lat,
          shipwreck.coordinates.lng,
          prevShipwreck.coordinates.lat,
          prevShipwreck.coordinates.lng
        );
        totalDistance += distance;
      }
    });
    return totalDistance;
  }

  // function to calculate price based on total distance
  // price per kilometer in USD
  export const calculatePrice = (totalDistance)=> {
    const basePrice = 0;
    const pricePerKilometer = 1 / 1000;

    return (basePrice + totalDistance * pricePerKilometer).toFixed(2);
  }

  // function to format number values with commas to every hundredth
  export const numberWithCommas = (number)=> {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // function to convert meters into miles
  export const metersToMiles = (meters) => {
    return (meters * 0.000621371).toFixed(2);
  }