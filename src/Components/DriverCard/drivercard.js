import styles from "./drivercard.module.css";

import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DriverCard = (props) => {
  const { driverData, handleDrag, handleDrop, setDriver } = props;
  const [image, setImage] = useState();

  const loadImage = (imageName) => {
    import(`../../Assets/Images/${imageName}.jpg`).then((image) => {
      setImage(image.default);
    });
  };

  useEffect(() => {
    loadImage(driverData.img);
  }, [driverData]);

  return (
    <Paper
      onClick={() => setDriver(driverData)}
      draggable={true}
      onDragOver={(ev) => ev.preventDefault()}
      onDragStart={handleDrag}
      onDrop={handleDrop}
      sx={{ width: "200px", padding: "12px", margin: "0 12px 12px 12px" }}
      id={driverData.order}
    >
      <div className={styles.card}>
        <img src={image} />
        <h4>{driverData.driver}</h4>
      </div>
    </Paper>
  );
};

export default DriverCard;
