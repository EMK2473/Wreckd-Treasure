import React, { useState, useEffect } from "react";
import { Layout, Card, Button, Collapse } from "antd";
const { Sider } = Layout;
const { Panel } = Collapse;
import tours from "./ShipWreckData";
import Confetti from "js-confetti";


const SearchTours = () => {
  // state variables and set functions
  const [selectedTour, setSelectedTour] = useState("grandTour");
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedShipwreck, setSelectedShipwreck] = useState(null);
  const [siderVisible, setSiderVisible] = useState(false);
  const [totalsVisible, setTotalsVisible] = useState(false);

  useEffect(() => {
    // apply new background class
    document.body.classList.add("new-background-class-two");
    return () => {
      document.body.classList.remove("new-background-class");
      document.body.classList.remove("login-background-class");
      document.body.classList.remove("signup-background-class");
    };
  }, []);

  useEffect(() => {
    initMap(selectedTour);
  }, [selectedTour]);

  const changeTour = (event) => {
    setSelectedTour(event.target.value);
  };

  // intialize map and display shipwrecks
  function initMap(selectedTour) {
    const selectedArray = tours[selectedTour] || [];
    console.log("Selected Array:", selectedArray);

    // if more than one shipwreck, calc total distance and price
    if (selectedArray.length > 1) {
      // Calculate total distance of selectedArray
      const totalDistance = calculateTotalDistance(selectedArray);

      // state update to total distance and total price state and to hundredths place
      setTotalDistance(totalDistance.toFixed(2));
      setTotalPrice(calculatePrice(totalDistance));
    }
    const handleDetailsClick = (shipwreck) => {
      setSelectedShipwreck(shipwreck);
    };

    // initializes google map
    var map = new google.maps.Map(document.getElementById("map"), {
      center: selectedArray[0].coordinates,
      zoom: 1,
    });

    // iterate over selectedArray to display markers and polylines
    selectedArray.forEach(function (shipwreck, index) {
      var marker;
      if (index === 0) {
        // sets first marker in index to green
        marker = new google.maps.Marker({
          position: shipwreck.coordinates,
          map: map,
          title: shipwreck.name,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            scaledSize: new google.maps.Size(40, 40),
          },
        });
      } else {
        // creates marker for each shipwreck
        marker = new google.maps.Marker({
          position: shipwreck.coordinates,
          map: map,
          title: shipwreck.name,
        });
      }

      // adds shipwreck info window to marker
      var infoWindow = new google.maps.InfoWindow({
        content: `<div class="info-window-content"><b>${shipwreck.name}</b><br>
                Reason for Sinking: ${shipwreck.reasonForSinking}<br>
                Year Sunk: ${shipwreck.yearSunk}<br>
                Country: ${shipwreck.country}<br>
                Body of Water: ${shipwreck.bodyOfWater}<br>
                Casualties: ${shipwreck.casualties}<br>
                ${shipwreck.treasure.join(", ")}</div>
                <img src="${shipwreck.image}" alt="${
          shipwreck.name
        } Image" width="200"></div>`,
      });

      marker.addListener("click", function () {
        infoWindow.open(map, marker);
      });

      // creates marker icon
      var markerIcon = {
        scaledSize: new google.maps.Size(50, 50),
      };

      // loads image asynchronously
      var image = new Image();
      image.onload = function () {
        marker.setIcon(markerIcon);
      };
      image.src = shipwreck.image;

      if (index > 0) {
        // calc polyline coordinates
        var polylineCoordinates = [
          new google.maps.LatLng(
            shipwreck.coordinates.lat,
            shipwreck.coordinates.lng
          ),
          new google.maps.LatLng(
            selectedArray[index - 1].coordinates.lat,
            selectedArray[index - 1].coordinates.lng
          ),
        ];

        // draw polylines with random colors
        var polyline = new google.maps.Polyline({
          path: polylineCoordinates,
          geodesic: true,
          strokeColor: generateRandomHexColor(),
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });

        polyline.setMap(map);
      }
    });

    // calc total distance and total price if more than one shipwreck in array
    if (selectedArray.length > 1) {
      // calculate total distance of selectedArray
      const totalDistance = calculateTotalDistance(selectedArray);

      // state update to total distance and total price
      setTotalDistance(totalDistance.toFixed(2));
      setTotalPrice(calculatePrice(totalDistance));
    }
  }

  // function to generate a random hex color
  const generateRandomHexColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // haversine formula: d = 2 * R * arcsin(sqrt(sin^2((φ2 - φ1) / 2) + cos(φ1) * cos(φ2) * sin^2((λ2 - λ1) / 2)))
  // function to calc distance between 2 coordinates
  function calculateDistance(lat1, lon1, lat2, lon2) {
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
  function calculateTotalDistance(selectedArray) {
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
  function calculatePrice(totalDistance) {
    const basePrice = 0;
    const pricePerKilometer = 1 / 1000;

    return (basePrice + totalDistance * pricePerKilometer).toFixed(2);
  }

  // function to format number values with commas to every hundredth
  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // function to convert meters into miles
  function metersToMiles(meters) {
    return (meters * 0.000621371).toFixed(2);
  }

  return (
    <div className="mt-50" style={{ position: "relative" }}>
      <div
        className="absolute top-0 left-0 right-0 bg-gray-800 text-white py-10 px-5 text-center"
        style={{ marginTop: "100px" }}
      >
        <h1 className="text-3xl mb-5 border border-white border-solid rounded-lg">
          Shipwreck Explorer
        </h1>
        <div className="mb-5 border rounded-lg p-1 flex flex-col md:flex-row justify-between items-center">
          <label htmlFor="tourSelection" className="mb-3 md:mb-0 mr-3">
            Choose a tour:
          </label>
          <select
            id="tourSelection"
            value={selectedTour}
            onChange={changeTour}
            className="px-4 py-2 bg-gray-700 text-black border border-gray-600 rounded mb-3 md:mb-0 md:mr-3"
          >
            <option value="grandTour">Shipwrecks Tour</option>
            <option value="passengerTour">Passenger Tour</option>
            <option value="warTour">War Tour</option>
            <option value="sailboatTour">Sailboat Tour</option>
            <option value="transportTour">Transport Tour</option>
            <option value="highestdeathTour">Highest Death Toll Tour</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-black rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
            Save this tour
          </button>
        </div>
      </div>
      <div
        style={{
          border: "2px solid #F4CB5C",
          borderRadius: "10px",
          padding: "10px",
          width: "600px",
          height: "350px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          id="map"
          style={{ height: "300px", width: "550px", borderRadius: "10px" }}
        ></div>
      </div>

      <div
        style={{
          position: "fixed",
          top: "100px",
          right: "10px",
          borderRadius: "5px",
          marginRight: "5px" 
        }}
      >
        {siderVisible ? (
          <div style={{ position: "relative" }}>
            <Sider
              theme="light"
              width={250}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                height: "calc(100vh - 100px)",
                overflowY: "auto",
              }}
            >
              <div className="mt-10" style={{ marginTop: "25px" }}>
                <p
                  style={{
                    color: "white",
                    marginBottom: "10px",
                    border: "1px solid #F4CB5C",
                    borderRadius: "5px",
                    padding: "10px",
                    marginTop: "50px",
                  }}
                >
                  Rate: <span style={{ color: "#F4CB5C" }}>$1.01 USD</span> for
                  every
                  <span style={{ color: "#F4CB5C" }}> 10 miles.</span>
                </p>
                <p
                  style={{
                    color: "white",
                    marginBottom: "10px",
                    border: "1px solid #F4CB5C",
                    borderRadius: "5px",
                    padding: "10px",
                    marginTop: "15px",
                  }}
                >
                  Total Distance:{" "}
                  <span style={{ color: "#F4CB5C" }}>
                    {numberWithCommas(metersToMiles(totalDistance))} miles
                  </span>
                </p>
                <p
                  style={{
                    color: "white",
                    marginBottom: "10px",
                    border: "1px solid #F4CB5C",
                    borderRadius: "5px",
                    padding: "10px",
                    marginTop: "15px",
                  }}
                >
                  Total Price:{" "}
                  <span style={{ color: "#F4CB5C" }}>
                    $
                    {typeof totalPrice === "number"
                      ? numberWithCommas(totalPrice.toFixed(2))
                      : numberWithCommas(totalPrice)}{" "}
                    USD
                  </span>
                </p>
                {tours[selectedTour]?.map((shipwreck, index) => (
                  <Card key={index} style={{ marginBottom: "10px", background: "linear-gradient(to bottom, #D6A565, #73513F, #73513F )", borderColor: "#F4CB5C", borderWidth: "2px" }}>
                    <div >
                      <h3>{shipwreck.name}</h3>
                      <img
                        src={shipwreck.image}
                        alt={shipwreck.name}
                        style={{ maxWidth: "100%", height: "auto", border: "2px solid #F4CB5C", borderRadius: "10px" }}
                      />
                    </div>
                    <Collapse style={{ borderRadius: "10px", background: "linear-gradient(to bottom, #D6A565, #73513F, #73513F )"}}>
                      <Panel style={{ borderRadius: "10px", background: "linear-gradient(to bottom, #D6A565, #73513F, #73513F )"}} header="Details" key="1">
                      <div >
                        <p>Reason for Sinking: {shipwreck.reasonForSinking}</p>
                        <p>Year Sunk: {shipwreck.yearSunk}</p>
                        <p>Country: {shipwreck.country}</p>
                        <p>Body of Water: {shipwreck.bodyOfWater}</p>
                        <p>Casualties: {shipwreck.casualties}</p>
                        <p>{shipwreck.treasure.join(", ")}</p>
                        </div>
                      </Panel>
                    </Collapse>
                  </Card>
                ))}
              </div>
            </Sider>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setSiderVisible(false)}
                style={{
                  cursor: "pointer",
                  backgroundColor: "white",
                  color: "black",
                  padding: "10px",
                  borderRadius: "5px 5px 5px 5px",
                  border: "none",
                  width: "160px",
                  textAlign: "center",
                }}
              >
                Close Tour Details
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setSiderVisible(!siderVisible)}
            style={{
              cursor: "pointer",
              backgroundColor: "white",
              color: "black",
              padding: "10px",
              borderRadius: "5px 5px 5px 5px",
              width: "160px",
              textAlign: "center",
            }}
          >
            Show Tour Details
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchTours;
