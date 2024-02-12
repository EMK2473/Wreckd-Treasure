import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME} from "../utils/queries";
import { REMOVE_TOUR } from "../utils/mutations";
import { Collapse, Card, Table, Button } from "antd";
const { Panel } = Collapse;

const BookedToursList = () => {
  const { loading, error, data } = useQuery(GET_ME);
  const [open, setOpen] = useState(false);
  const [removeTourMutation] = useMutation(REMOVE_TOUR, {
    refetchQueries: [{ query: GET_ME }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { bookedTours } = data.me;

  const columns = [
    {
      title: "Tour Name",
      dataIndex: "tourName",
      key: "tourName",
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

  const handleRemoveTour = async (tourName) => {
    try {
      await removeTourMutation({
        variables: { tourName },
      });
    } catch (error) {
      console.error("Error removing tour:", error);
    }
  };

  const dataSource = bookedTours.map((tour, index) => ({
    key: index,
    tourName: tour.tourName,
  }));

  return (
    <div
      style={{
        position: "fixed",
        top: "80px",
        left: "10px",
        minWidth: "200px",
        zIndex: "9999",
      }}
    >
      <Collapse in={open}>
        <Card
          id="collapse-panel"
          style={{ background: "none", border: "none", boxShadow: "none" }}
        >
          <Collapse>
          <Panel
  header={<span style={{ color: "#F4CB5C" }}>Booked Tours</span>}
  key="1"
  style={{
    borderRadius: "10px",
    backgroundColor: "#56727D",
    border: "none",
  }}
>
              <div className="custom-collapse-body">
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  pagination={false}
                />
              </div>
            </Panel>
          </Collapse>
        </Card>
      </Collapse>
    </div>
  );
};

export default BookedToursList;
