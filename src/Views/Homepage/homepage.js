import DriverCard from "../../Components/DriverCard/drivercard";
import { useEffect, useState } from "react";
import { data, registeredUsers } from "../../Assets/Data/data";
import styles from "./homepage.module.css";
import { Paper } from "@mui/material";

const Homepage = () => {
  const [dragId, setDragId] = useState();
  const [boxes, setBoxes] = useState();

  const [driver, setDriver] = useState();
  const [vehicle, setVehicle] = useState();
  const [date, setDate] = useState();

  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = (ev) => {
    const dragBox = boxes.find((box) => box.id === Number(dragId));
    const dropBox = boxes.find((box) => box.id === Number(ev.currentTarget.id));

    const dragBoxOrder = dragBox.order;
    const dropBoxOrder = dropBox.order;

    const newBoxState = boxes.map((box) => {
      if (box.id === Number(dragId)) {
        box.order = dropBoxOrder;
      }
      if (box.id === Number(ev.currentTarget.id)) {
        box.order = dragBoxOrder;
      }
      return box;
    });
    setBoxes(newBoxState); // Set the new state
  };

  useEffect(() => {
    setBoxes(data);
  }, []);

  const handleSubmit = () => {
    console.log(
      data.filter((x) => x.vehicle !== vehicle && x.timestamp === date)
    );
  };

  return (
    <div className={styles.container}>
      <section className={styles.registeredUserList}>
        <Paper sx={{ padding: "12px" }}>
          <h2>Registered Users</h2>
          {registeredUsers.map((user) => {
            return <p>{user.name}</p>;
          })}
        </Paper>
      </section>
      <section className={styles.driverList}>
        <Paper sx={{ padding: "12px" }}>
          <h2>All Drivers</h2>
          <p style={{ fontSize: "smaller" }}>
            drag to reorder, click to view trips
          </p>
          {boxes
            ?.sort((a, b) => a.order - b.order)
            .map((driver) => {
              return (
                <DriverCard
                  setDriver={setDriver}
                  handleDrag={handleDrag}
                  handleDrop={handleDrop}
                  driverData={driver}
                />
              );
            })}
        </Paper>
      </section>

      <section className={styles.driverData}>
        <Paper sx={{ padding: "12px", marginBottom: "12px" }}>
          <h2>Find the driver</h2>
          <p>Vehicle</p>
          <select onChange={(e) => setVehicle(e.target.value)}>
            <option value="NU34LOLD">NU34LOLD</option>
            <option value="NU64DBI">NU64DBI</option>
          </select>
          <p>Date</p>
          <select onChange={(e) => setDate(e.target.value)}>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
          </select>
          <button onClick={() => handleSubmit()}>Find the driver</button>
        </Paper>
        {driver !== undefined && (
          <Paper sx={{ padding: "12px" }}>
            <h2>{driver.driver}</h2>
            <p>{driver.driver}'s trips</p>
            <ul style={{ listStyle: "none", textAlign: "left", padding: 0 }}>
              {driver.drivingList.map((trip) => {
                return (
                  <li>
                    <p>
                      {trip.start} to {trip.end}
                    </p>
                    <p>
                      TIME: {new Date(trip.timestamp * 1000).toLocaleString()}
                    </p>
                    <p>REG: {trip.vehicle}</p>
                  </li>
                );
              })}
            </ul>
          </Paper>
        )}
      </section>
    </div>
  );
};

export default Homepage;
