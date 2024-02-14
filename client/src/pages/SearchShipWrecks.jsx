import React, { useState, useEffect } from "react";
import { Layout, Card, Button, Collapse, Modal } from "antd";
const { Sider } = Layout;
const { Panel } = Collapse;
import tours from "./ShipWreckData";
import { BOOK_TOUR } from "../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { getBookedTours, saveBookedTour } from "../utils/localStorage";
import { GET_ME } from "../utils/queries";
import BookedToursList from "../components/BookedToursList";
import {
  generateRandomHexColor,
  calculateDistance,
  calculateTotalDistance,
  calculatePrice,
  numberWithCommas,
  metersToMiles,
} from "../utils/helpers";

const SearchTours = () => {
  // state variables and set functions
  const [selectedTour, setSelectedTour] = useState("grandTour");
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedShipwreck, setSelectedShipwreck] = useState(null);
  const [siderVisible, setSiderVisible] = useState(false);
  const [totalsVisible, setTotalsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [bookTourMutation] = useMutation(BOOK_TOUR);
  const { loading, error, data } = useQuery(GET_ME);
  const [width, setWidth] = useState("100%");

  useEffect(() => {
    const handleResize = () => {
      // Set custom thresholds based on screen size
      if (window.innerWidth <= 768) {
        setWidth(window.innerWidth * 0.6);
      } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
        setWidth(window.innerWidth * 0.7);
      } else {
        setWidth(window.innerWidth * 0.8);
      }
    };
  
    // Call handleResize when the window is resized
    window.addEventListener('resize', handleResize);
  
    // Initial call to set initial width
    handleResize();
  
    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const showAlertModal = () => {
    setAlertModalVisible(true);
  };

  const hideAlertModal = () => {
    setAlertModalVisible(false);
  };

  const changeTour = (event) => {
    setSelectedTour(event.target.value);
  };

  const handleSaveTour = async () => {
    try {
      const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;
      if (!userId) {
        console.error("User ID NOT FOUND!!");
        return;
      }

      const userBookedTours = data?.me?.bookedTours || [];
      const tourExists = userBookedTours.some(
        (tour) => tour.tourName === selectedTour
      );

      if (tourExists) {
        showAlertModal();
        return;
      }

      const { data: bookTourData } = await bookTourMutation({
        variables: {
          tourName: selectedTour,
          shipwrecks: tours[selectedTour],
        },
      });

      saveBookedTour(userId, selectedTour, tours[selectedTour]);

      showModal();
    } catch (error) {
      console.error("Error booking tour:", error);
    }
  };

  // intialize map and display shipwrecks
  function initMap(selectedTour) {
    const selectedArray = tours[selectedTour] || [];

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
        // creates red marker for each other shipwreck
        marker = new google.maps.Marker({
          position: shipwreck.coordinates,
          map: map,
          title: shipwreck.name,
        });
      }

      // adds shipwreck info window to marker
      var infoWindow = new google.maps.InfoWindow({
        content: `<div class="info-window-content"><b style="text-decoration: underline;">${
          shipwreck.name
        }</b><br>
              Reason for Sinking: ${shipwreck.reasonForSinking}<br>
              Year Sunk: ${shipwreck.yearSunk}<br>
              Country: ${shipwreck.country}<br>
              Body of Water: ${shipwreck.bodyOfWater}<br>
              Casualties: ${shipwreck.casualties}<br>
              ${shipwreck.treasure.join(", ")}</div>
              <img src="${shipwreck.image}" alt="${shipwreck.name}"
              Image" width="160" style="padding: 5px;"></div>`,
      });

      marker.addListener("click", function () {
        infoWindow.open(map, marker);
      });

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

  
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: width, maxWidth: "1000px"}}>
        <div
          className="mt-50"
          style={{ position: "relative", padding: "0 10px", width: "100%" }}
        >
          <div className="bg-gray-800 text-white py-5 px-3 text-center mb-5">
            <h1 className="text-3xl mb-3 rounded-lg">Shipwreck Explorer</h1>
            <div className="flex flex-col md:flex-row justify-between items-center mb-5">
              <select
                id="tourSelection"
                value={selectedTour}
                onChange={changeTour}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded mb-3 md:mb-0 md:mr-3 text-lg"
              >
                <option value="grandTour">Grand Tour</option>
                <option value="passengerTour">Passenger Tour</option>
                <option value="warTour">War Tour</option>
                <option value="sailboatTour">Sailboat Tour</option>
                <option value="transportTour">Transport Tour</option>
                <option value="highestdeathTour">Highest Death Toll Tour</option>
              </select>
              <button
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                onClick={handleSaveTour}
                style={{
                  backgroundColor: "#287382",
                  color: "#f4cb5c",
                }}
              >
                Book this tour!
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            border: "2px solid #F4CB5C",
            borderRadius: "10px",
            padding: "10px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <div
            id="map"
            style={{
              height: "600px",
              width: "100%",
              maxWidth: "100%",
              borderRadius: "10px",
            }}
          ></div>
          <Modal
            title={
              <span style={{ color: "green", fontWeight: "bold" }}>
                Tour Booked Successfully
              </span>
            }
            open={modalVisible}
            onOk={() => setModalVisible(false)}
            onCancel={() => setModalVisible(false)}
          >
            <p>Your tour has been booked!</p>
          </Modal>
          <Modal
            title={
              <span style={{ color: "red", fontWeight: "bold" }}>
                Tour Already Booked
              </span>
            }
            open={alertModalVisible}
            onOk={hideAlertModal}
            onCancel={hideAlertModal}
          >
            <p>This tour has already been booked!</p>
          </Modal>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "calc(50% - 5px)",
            marginTop: "20px",
          }}
        >
          <BookedToursList />
          <div
            style={{
              position: "fixed",
              top: "250px",
              right: "10px",
              borderRadius: "5px",
              marginRight: "5px",
            }}
          >
            {siderVisible ? (
              <div style={{ position: "relative" }}>
                <Sider
                  theme="light"
                  width={250}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
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
                        marginTop: "60px",
                        backgroundColor: "#365058",
                      }}
                    >
                      Rate:{" "}
                      <span
                        style={{
                          color: "#F4CB5C",
                          fontFamily: "Arial, sans-serif",
                        }}
                      >
                        $1.01
                      </span>{" "}
                      for every{" "}
                      <span
                        style={{
                          color: "#F4CB5C",
                          fontFamily: "Arial, sans-serif",
                        }}
                      >
                        10 miles.
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
                        backgroundColor: "#365058",
                      }}
                    >
                      Total Distance:{" "}
                      <span
                        style={{
                          color: "#F4CB5C",
                          fontFamily: "Arial, sans-serif",
                        }}
                      >
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
                        backgroundColor: "#365058",
                      }}
                    >
                      Total Price:{" "}
                      <span
                        style={{
                          color: "#F4CB5C",
                          fontFamily: "Arial, sans-serif",
                        }}
                      >
                        $
                        {typeof totalPrice === "number"
                          ? numberWithCommas(totalPrice.toFixed(2))
                          : numberWithCommas(totalPrice)}{" "}
                        USD
                      </span>
                    </p>
                    {tours[selectedTour]?.map((shipwreck, index) => (
                      <Card
                        key={index}
                        style={{
                          marginBottom: "10px",
                          backgroundColor: "#31454F",
                          borderColor: "#ABCAD4",
                          borderWidth: "2px",
                        }}
                      >
                        <div>
                          <h3 style={{ color: "#F4CB5C" }}>{shipwreck.name}</h3>
                          <img
                            src={shipwreck.image}
                            alt={shipwreck.name}
                            style={{
                              maxWidth: "100%",
                              height: "auto",
                              border: "2px solid #ABCAD4",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                        <Collapse
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "#56727D",
                          }}
                        >
                          <Panel
                            style={{ borderRadius: "10px" }}
                            header={
                              <span style={{ color: "#F4CB5C" }}>Details</span>
                            }
                            key="1"
                          >
                            <div>
                              <p>
                                Reason for Sinking:{" "}
                                <span style={{ color: "#F4CB5C" }}>
                                  {shipwreck.reasonForSinking}
                                </span>
                              </p>
                              <p>
                                Year Sunk:{" "}
                                <span style={{ color: "#F4CB5C" }}>
                                  {shipwreck.yearSunk}
                                </span>
                              </p>
                              <p>
                                Country:{" "}
                                <span style={{ color: "#F4CB5C" }}>
                                  {shipwreck.country}
                                </span>
                              </p>
                              <p>
                                Body of Water:{" "}
                                <span style={{ color: "#F4CB5C" }}>
                                  {shipwreck.bodyOfWater}
                                </span>
                              </p>
                              <p>
                                Casualties:{" "}
                                <span style={{ color: "#F4CB5C" }}>
                                  {shipwreck.casualties}
                                </span>
                              </p>
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
                      backgroundColor: "#287382",
                      color: "#f4cb5c",
                      padding: "10px",
                      borderRadius: "5px 5px 5px 5px",
                      borderColor: "#baf0f0",
                      width: "140px",
                      textAlign: "center",
                      marginRight: "20px",
                      fontSize: "18px",
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
                  backgroundColor: "#baf0f0",
                  color: "#062c33",
                  padding: "10px",
                  borderRadius: "5px 5px 5px 5px",
                  border: "solid",
                  borderColor: "#287382",
                  width: "140px",
                  textAlign: "center",
                  marginRight: "20px",
                  fontSize: "18px",
                }}
              >
                Show Tour Details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTours;
