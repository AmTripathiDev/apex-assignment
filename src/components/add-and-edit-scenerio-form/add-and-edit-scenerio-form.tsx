// component code

import React from "react";
import { useNavigate } from "react-router-dom";
import "./add-and-edit-scenerio-form.css";

interface AddAndEditFormprops {
  scenerio: any;
  formValues: any;
  fieldErrors: any;
  handleInputChange: any;
  handleInputBlur: any;
  handleAddScenerioClick: any;
  resetForm: any;
}

const AddAndEditScenerioForm = ({
  scenerio,
  formValues,
  fieldErrors,
  handleInputChange,
  handleInputBlur,
  handleAddScenerioClick,
  resetForm,
}: AddAndEditFormprops) => {
  const navigate = useNavigate();
  return (
    <div className="scenerio-container">
      <div className="container">
        <h4 className="breadCrumb">Scenerio/add</h4>
        <h2 className="heading">
          {scenerio ? "Update Scenerio" : "Add Scenerio"}
        </h2>
        <div className="add-scenerio-form">
          <div>
            <label>Scenerio Name</label>
            <input
              name="scenerioName"
              placeholder="Test scenerio"
              value={formValues.scenerioName.value}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
            {fieldErrors.scenerioName && (
              <span className="error-msg">Scenerio name is required.</span>
            )}
          </div>
          <div>
            <label>Scenerio Time (Second)</label>
            <input
              name="scenerioTime"
              placeholder="10"
              value={formValues.scenerioTime.value}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              type="number"
            />
            {fieldErrors.scenerioTime && (
              <span className="error-msg">Scenerio time is required.</span>
            )}
          </div>
        </div>
        <div className="actions">
          <button onClick={handleAddScenerioClick}>
            {scenerio ? "Update" : "Add"}
          </button>
          <button
            onClick={() => {
              resetForm();
            }}
          >
            Reset
          </button>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default AddAndEditScenerioForm;
