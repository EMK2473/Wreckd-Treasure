import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_TOUR } from "../utils/mutations";
import { Collapse, Card, Table, Button } from "antd";
import {
  calculateTotalDistance,
  calculatePrice,
  numberWithCommas,
} from "../utils/helpers";
const { Panel } = Collapse;

const BookedToursList = () => {
  const { loading, error, data } = useQuery(GET_ME);
  const [open, setOpen] = useState(false);
  const [checkoutConfirmed, setCheckoutConfirmed] = useState(false);
  const [removeTourMutation] = useMutation(REMOVE_TOUR, {
    refetchQueries: [{ query: GET_ME }],
  });
  const [buttonColor, setButtonColor] = useState("#baf0f0");
  const [borderColor, setBorderColor] = useState("#287382");
  const [fontColor, setFontColor] = useState("#062c33");

  const handleButtonClick = () => {
    // Toggle button colors on click
    const newButtonColor = buttonColor === "#baf0f0" ? "#287382" : "#baf0f0";
    const newBorderColor = borderColor === "#287382" ? "#baf0f0" : "#287382";
    const newFontColor = fontColor === "#062c33" ? "#F4CB5C" : "#062c33";
    setButtonColor(newButtonColor);
    setBorderColor(newBorderColor);
    setFontColor(newFontColor);

    // Toggle the state of 'open'
    setOpen(!open);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { bookedTours, username } = data.me;

  // Calculate total cost of all booked tours
  const totalCost = bookedTours.reduce((acc, curr) => {
    // Calculate total distance of the tour
    const totalDistance = calculateTotalDistance(curr.shipwrecks);
    // Calculate price for the tour based on distance
    const tourPrice = calculatePrice(totalDistance);
    return acc + parseFloat(tourPrice);
  }, 0);

  // calc tax for the state of Virginia (5%)
  const virginiaTaxRate = 0.05;
  const tax = totalCost * virginiaTaxRate;

  // calc total amount including tax
  const totalAmount = totalCost + tax;

  // grid/column variable for cart
  const columns = [
    {
      title: "Item",
      dataIndex: "tourName",
      key: "tourName",
      ellipsis: true,
    },
    {
      title: "Cost",
      dataIndex: "tourCost",
      key: "tourCost",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => handleRemoveTour(record.tourName)}
          style={{ color: "red" }}
        >
          Remove
        </Button>
      ),
    },
  ];

  // calls REMOVE_TOUR
  const handleRemoveTour = async (tourName) => {
    try {
      await removeTourMutation({
        variables: { tourName },
      });
    } catch (error) {
      console.error("Error removing tour:", error);
    }
  };

  const handleCheckout = () => {
    // display checkout confirmation message for 5 seconds
    setCheckoutConfirmed(true);
    setTimeout(() => {
      setCheckoutConfirmed(false);
    }, 4000);
  };

  // map through booked tours to display cart data
  const dataSource = bookedTours.map((tour, index) => ({
    key: index,
    tourName: tour.tourName,
    tourCost: (
      <span style={{ color: "#F4CB5C" }}>
        $
        {numberWithCommas(
          parseFloat(
            calculatePrice(calculateTotalDistance(tour.shipwrecks).toFixed(2))
          ).toFixed(2)
        )}
      </span>
    ),
  }));

  return (
    <div
      style={{
        position: "fixed",
        top: "250px",
        left: "15px",
        minWidth: "200px",
        zIndex: "3",
      }}
    >
      <Button
        style={{
          cursor: "pointer",
          backgroundColor: buttonColor,
          color: fontColor,
          borderRadius: "5px 5px 5px 5px",
          border: `solid 2px ${borderColor}`,
          width: "120px",
          textAlign: "center",
          marginRight: "20px",
          fontSize: "12px",
          paddingBottom: "30px",
          paddingTop: "10px",
          fontFamily: "Pirata One, sans-serif",
        }}
        onClick={handleButtonClick}
      >
        {open ? `Hide 🛒 Cart` : `Show 🛒 Cart`}
      </Button>
      {open && (
        <Collapse in={open}>
          <Card
            id="collapse-panel"
            style={{
              background: "none",
              boxShadow: "none",
              overflow: "auto",
            }}
          >
            <Collapse>
              <Panel
                header={
                  <span style={{ color: "#F4CB5C", textAlign: "center" }}>
                    {`${username}'s 🛒 Cart`}
                  </span>
                }
                key="1"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#56727D",
                  maxWidth: "400px",
                  width: "100%",
                  overflow: "auto",
                  margin: "0 auto",
                  maxHeight: "70vh",
                }}
              >
                <div className="custom-collapse-body">
                  <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    showHeader={false}
                    scroll={{ y: 200 }}
                  />
                  <div style={{ marginTop: "20px" }}>
                    <p
                      id="tours-cost"
                      style={{ color: "#FFFFFF", fontSize: "18px" }}
                    >
                      Tours Cost:{" "}
                      <span style={{ color: "#F4CB5C" }}>
                        ${numberWithCommas(totalCost.toFixed(2))}
                      </span>
                    </p>
                    <p
                      id="tax-virginia"
                      style={{ color: "#FFFFFF", fontSize: "18px" }}
                    >
                      Tax (Virginia):{" "}
                      <span style={{ color: "#F4CB5C" }}>
                        ${numberWithCommas(tax.toFixed(2))}
                      </span>
                    </p>
                    <p
                      id="total"
                      style={{ color: "#FFFFFF", fontSize: "18px" }}
                    >
                      Total:{" "}
                      <span style={{ color: "#F4CB5C" }}>
                        ${numberWithCommas(totalAmount.toFixed(2))}
                      </span>
                    </p>

                    <Button type="primary" onClick={handleCheckout}>
                      Checkout
                    </Button>
                    {checkoutConfirmed && (
                      <p style={{ color: "#F4CB5C", fontSize: "18px" }}>
                        🏴‍☠️ Ahoy, Matey! Welcome Aboard! 🏴‍☠️
                      </p>
                    )}
                  </div>
                </div>
              </Panel>
            </Collapse>
          </Card>
        </Collapse>
      )}
    </div>
  );
};

export default BookedToursList;
