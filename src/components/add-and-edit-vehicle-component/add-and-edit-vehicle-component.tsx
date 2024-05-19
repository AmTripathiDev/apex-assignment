import { useNavigate } from "react-router-dom";
import { Scenerio } from "../../model/scenerio";
import "./add-and-edit-vehicle-component.css";
import NoDataScreen from "../noData/no-data-screen";
interface vehicleProps {
  fetchScenerio: Scenerio | null;
  vehicleId: string | undefined;
  allScenerios: Scenerio[];
  errors: any;
  values: any;
  handleInputChange: any;
  handleInputBlur: any;
  handleAddVehicleClick: () => void;
  resetForm: () => void;
}
const AddandEditVehicleComponent = ({
  fetchScenerio,
  vehicleId,
  allScenerios,
  errors,
  values,
  handleInputBlur,
  handleInputChange,
  handleAddVehicleClick,
  resetForm,
}: vehicleProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="vehicle-management">
        {allScenerios && allScenerios.length > 0 ? (
          <div className="vehicle-container">
            <h4 className="breadCrumb">
              {vehicleId != undefined ? "Vehicle/update" : "Vehicle/add"}
            </h4>
            <h2>Add Vehicle</h2>
            <div className="vehicle-form">
              <div className="form-group">
                <div className="form-field">
                  <label>Scenerio List</label>
                  <select
                    name="scenerioList"
                    disabled={!!fetchScenerio}
                    value={values.scenerioList}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  >
                    <option value="none">
                      {fetchScenerio
                        ? fetchScenerio.scenerioName
                        : " Select Scenerio"}
                    </option>
                    {allScenerios.map((scenerio) => (
                      <option key={scenerio.id} value={scenerio.id}>
                        {scenerio.scenerioName}
                      </option>
                    ))}
                  </select>
                  {errors.scenerioList && (
                    <span className="error-message">
                      Select a valid scenerio.
                    </span>
                  )}
                </div>
                <div className="form-field">
                  <label>Vehicle Name</label>
                  <input
                    name="vehicleName"
                    placeholder="Target abc"
                    type="text"
                    value={values.vehicleName.value}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  />
                  {errors.vehicleName && (
                    <span className="error-message">
                      Enter a valid vehicle name.
                    </span>
                  )}
                </div>
                <div className="form-field">
                  <label>Speed (% / sec)</label>
                  <input
                    name="vehicleSpeed"
                    placeholder="2"
                    type="number"
                    value={values.vehicleSpeed.value}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  />
                  {errors.vehicleSpeed && (
                    <span className="error-message">
                      Enter a valid vehicle speed.
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group group-2">
                <div className="form-field">
                  <label>Position X (%)</label>
                  <input
                    name="positionX"
                    placeholder="0 - 100"
                    type="number"
                    value={values.positionX.value}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  />
                  {errors.positionX && (
                    <span className="error-message">
                      Enter a valid X position(0 - 100).
                    </span>
                  )}
                </div>
                <div className="form-field">
                  <label>Position Y (%)</label>
                  <input
                    name="positionY"
                    placeholder="0 - 100"
                    type="number"
                    value={values.positionY.value}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  />
                  {errors.positionY && (
                    <span className="error-message">
                      Enter a valid Y position(0 - 100).
                    </span>
                  )}
                </div>
                <div className="form-field">
                  <label>Direction</label>
                  <select
                    name="vehicleDirection"
                    value={values.vehicleDirection.value}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                  >
                    <option value="none">Select Direction</option>
                    <option value="towards">Towards</option>
                    <option value="backwards">Backwards</option>
                    <option value="upwards">Upwards</option>
                    <option value="downwards">Downwards</option>
                  </select>
                  {errors.vehicleDirection && (
                    <span className="error-message">
                      Select a valid vehicle direction.
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="actions">
              <button className="action-save" onClick={handleAddVehicleClick}>
                {vehicleId != undefined ? "Update" : "Add"}
              </button>
              <button className="action-reset" onClick={() => resetForm()}>
                Reset
              </button>
              <button className="action-back" onClick={() => navigate(-1)}>
                Go Back
              </button>
            </div>
          </div>
        ) : (
          <>
            <NoDataScreen />
          </>
        )}
      </div>
    </>
  );
};

export default AddandEditVehicleComponent;
