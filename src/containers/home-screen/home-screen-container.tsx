import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GridLines from "../../components/GridLines/GridLines";
import "./home-screen-container.css";
import axios from "axios";
import { Scenerio } from "../../model/scenerio";
import NoDataScreen from "../../components/noData/no-data-screen";
import { Vehicle } from "../../model/vehicle";
import EditIcon from "../../icons/edit.svg";
import DeleteIcon from "../../icons/delete.svg";
import SimulationGraph from "../../components/Scenerio/SimulationGraph";

const HomeScreen = () => {
  const BaseUrl = "http://localhost:5000";

  const navigate = useNavigate();
  const [scenerios, setScenerios] = useState<Scenerio[] | []>([]);
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteConfig, setDeleteConfig] = useState(null);
  const [selectedScenerio, setSelectedScenerio] = useState<Scenerio | null>(
    null
  );

  const [SelectedVehicle, setSelectedVehicle] = useState<Vehicle[] | []>([]);
  async function deleteVehicle(vehicle_id: any) {
    await axios.delete(`${BaseUrl}/api/vehicle/delete/${vehicle_id}`);

    // Update SelectedVehicle state
    const updatedVehicles = SelectedVehicle.filter(
      (vehicle) => vehicle.id !== vehicle_id
    );
    setSelectedVehicle(updatedVehicles);

    // Update selectedScenerio state
    if (selectedScenerio) {
      const updatedScenerio = {
        ...selectedScenerio,
        vehicles: selectedScenerio.vehicles.filter(
          (vehicle) => vehicle.id !== vehicle_id
        ),
      };
      setSelectedScenerio(updatedScenerio);
    }
  }

  const fetchScenerios = async () => {
    console.log(BaseUrl, "baseUrl ");
    const all_Scenerio = await axios.get(`${BaseUrl}/api/scenerio/all`);
    setScenerios(all_Scenerio.data);
  };

  useEffect(() => {
    fetchScenerios();
  }, []);

  const handleScenerioIdChange = (event: any) => {
    const select = scenerios.filter(
      (scenerio: Scenerio) => scenerio.id === event.target.value
    );
    setSelectedScenerio(select[0]);
    setSelectedVehicle(select[0].vehicles);
  };

  const startSimulation = () => {
    if (selectedScenerio) {
      setIsActive(true);
      setTimeout(
        () => setIsActive(false),
        +selectedScenerio.scenerioTime * 1000
      );
    }
  };

  const stopSimulation = () => {
    setIsActive(false);
  };

  return (
    <div className="homescreen">
      <main className="home-content">
        <div className="scenerio-selection">
          <label>Scenerio</label>
          <select
            value={selectedScenerio ? selectedScenerio.scenerioName : ""}
            onChange={handleScenerioIdChange}
          >
            <option value="none">Select Scenerio</option>
            {scenerios.map((scenerio) => (
              <option key={scenerio.id} value={scenerio.id}>
                {scenerio.scenerioName}
              </option>
            ))}
          </select>
        </div>

        {scenerios.length ? (
          <>
            {SelectedVehicle.length ? (
              <>
                <div className="scenerios-table">
                  <div className="table-header">
                    <span>Vehicle Id</span>
                    <span>Vehicle Name</span>
                    <span>Position X</span>
                    <span>Position Y</span>
                    <span>Speed</span>
                    <span>Direction</span>
                    <span>Edit</span>
                    <span>Delete</span>
                  </div>

                  {selectedScenerio?.vehicles?.map((vehicle: Vehicle, idx) => (
                    <div className="data-table-item" key={idx}>
                      <span>{vehicle.id}</span>
                      <span>{vehicle.vehicleName}</span>
                      <span>{vehicle?.positionX}</span>
                      <span>{vehicle?.positionY}</span>
                      <span>{vehicle?.speed}</span>
                      <span>{vehicle?.direction}</span>
                      <span>
                        <img
                          src={EditIcon}
                          alt="Edit"
                          height={20}
                          onClick={(event) => {
                            navigate(
                              `/edit/vehicle/${vehicle.id}/${vehicle.scenerioId}`
                            );
                          }}
                        />
                      </span>
                      <span>
                        <img
                          src={DeleteIcon}
                          alt="Delete"
                          height={35}
                          onClick={(event) => {
                            deleteVehicle(vehicle.id);
                          }}
                        />
                      </span>
                    </div>
                  ))}
                </div>
                <div className="actions">
                  <button disabled={isActive} onClick={startSimulation}>
                    Start Simulation
                  </button>
                  <button onClick={stopSimulation}>Stop Simulation</button>
                </div>
              </>
            ) : selectedScenerio?.id ? (
              <div className="no-vehicles-added-msg">
                <div>No vehicles Available.</div>
                <button
                  onClick={() =>
                    navigate(`/add/vehicle/${selectedScenerio?.id ?? ""}`)
                  }
                >
                  Add Vehicle
                </button>
              </div>
            ) : (
              <div className="select-scenerio-msg">
                Please select a scenerio to simulate.
              </div>
            )}
            <div className="graph">
              <GridLines />
              <SimulationGraph
                isActive={isActive}
                vehicles={selectedScenerio ? selectedScenerio.vehicles : []}
              />
            </div>
          </>
        ) : (
          <NoDataScreen />
        )}
      </main>
    </div>
  );
};

export default HomeScreen;
