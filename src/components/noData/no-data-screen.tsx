import React from "react";
import { useNavigate } from "react-router-dom";

import "./no-data-screen.css";

const NoDataScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="no-scenerios">
      <h3>No scenerios available to simulate.</h3>
      <button onClick={() => navigate("/add/scenerio")}>
        Create a Scenerio
      </button>
    </div>
  );
};

export default NoDataScreen;
