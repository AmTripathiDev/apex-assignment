import AddandEditVehicleComponent from "../../components/add-and-edit-vehicle-component/add-and-edit-vehicle-component";
import { useEffect, useState } from "react";
import { Scenerio } from "../../model/scenerio";
import { useNavigate, useParams } from "react-router-dom";
import useFormControl from "../../custom-hooks/useFormControl";
import { Vehicle } from "../../model/vehicle";
import axios from "axios";
import { VehicleInitialValue } from "../../default/vehicle.default";

export const AddVehicleContainer = () => {
  const BaseUrl = "http://localhost:5000";

  const { scenerioId, vehicleId } = useParams();
  const navigate = useNavigate();
  const [allScenerio, setAllScenerio] = useState<Scenerio[] | []>([]);
  const [allVehicle, setAllVehicle] = useState<Vehicle | null>(null);
  const [fetchScenerios, setFetchScenerio] = useState<Scenerio | null>(null);
  const initialValues = VehicleInitialValue(scenerioId, allVehicle);

  useEffect(() => {
    const fetchScenerios = async () => {
      const all_Scenerio = await axios.get(`${BaseUrl}/api/scenerio/all`);
      console.log(all_Scenerio, " coming all scenerio ");
      setAllScenerio(all_Scenerio.data);
    };
    fetchScenerios();
  }, []);

  useEffect(() => {
    if (scenerioId) {
      const fetchScenerio = async () => {
        const scenerio = await axios.get(
          `${BaseUrl}/api/scenerio/single/${scenerioId}`
        );
        if (scenerio && scenerio.data && scenerio.status == 200) {
          setFetchScenerio(scenerio.data);
        } else {
          console.log("something is error ");
        }
      };
      fetchScenerio();
    }
  }, [scenerioId]);

  const {
    values,
    errors,
    handleInputChange,
    handleInputBlur,
    validateForm,
    resetForm,
  } = useFormControl(initialValues);

  const createVehicle = async (vehicle: Vehicle) => {
    const response = await axios.post(`${BaseUrl}/api/vehicle/create`, vehicle);
    if (response.status == 201) {
      resetForm();
      navigate("/all/scenerio");
    } else {
      console.log("Something is Error");
    }
  };

  const addVehicle = async (vehicle: Vehicle) => {
    const response = await axios.patch(
      `${BaseUrl}/api/vehicle/update/${scenerioId}`,
      vehicle
    );

    if (response.status == 200) {
      resetForm();
      navigate("/all/scenerio");
    } else {
      console.log("Something is Error");
    }
  };

  const updateVehicle = async (vehicle: Vehicle) => {
    const response = await axios.patch(
      `${BaseUrl}/api/vehicle/update/${scenerioId}/${vehicleId}`,
      vehicle
    );

    if (response.status == 200) {
      resetForm();
      navigate("/all/scenerio");
    } else {
      console.log("Something is Error");
    }
  };

  const handleAddVehicleClick = () => {
    const isFormValid = validateForm();
    const id = Math.random();
    if (isFormValid) {
      const vehicle: Vehicle = {
        vehicleName: values.vehicleName,
        scenerioId: values.scenerioList.value,
        positionX: values.positionX,
        positionY: values.positionY,
        speed: values.vehicleSpeed,
        direction: values.vehicleDirection,
        color: "#" + Math.floor(id * 16777215).toString(16),
      };
      if (!!fetchScenerios == true && vehicleId) {
        console.log(fetchScenerios, " ", vehicle);
        const updateScenerio = {
          ...vehicle,
          id: vehicleId,
        };
        updateVehicle(updateScenerio);
      } else if (!!fetchScenerios && !vehicleId) {
        const updateScenerio = {
          ...vehicle,
          id: fetchScenerios.id,
          scenerioId: values.scenerioList.value,
        };

        addVehicle(updateScenerio);
      } else {
        console.log("3");
        const createScenerio = {
          ...vehicle,
          scenerioId: values.scenerioList.value,
        };
        createVehicle(createScenerio);
      }
    }
  };
  return (
    <AddandEditVehicleComponent
      allScenerios={allScenerio}
      vehicleId={vehicleId}
      handleAddVehicleClick={handleAddVehicleClick}
      fetchScenerio={fetchScenerios ? fetchScenerios : null}
      errors={errors}
      values={values}
      handleInputBlur={handleInputBlur}
      handleInputChange={handleInputChange}
      resetForm={resetForm}
    />
  );
};
