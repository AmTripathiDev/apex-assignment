// container code

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddAndEditScenerioForm from "../../components/add-and-edit-scenerio-form/add-and-edit-scenerio-form";
import { Scenerio } from "../../model/scenerio";
import useFormControl from "../../custom-hooks/useFormControl";
import axios from "axios";
import { InitialScenerioFormValue } from "../../default/scenerio.default";

const AddScenerioContainer = () => {
  const BaseUrl = "http://localhost:5000";
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isScenerio, setIsScenerio] = useState<Scenerio | null>(null);

  useEffect(() => {
    if (id) {
      const fetchScenerio = async () => {
        const scenerio = await axios.get(
          `${BaseUrl}/api/scenerio/single/${id}`
        );
        if (scenerio && scenerio.data && scenerio.status == 200) {
          setIsScenerio(scenerio.data);
        } else {
          console.log("something is error ");
        }
      };
      fetchScenerio();
    }
  }, [id]);

  const {
    values,
    errors,
    validateForm,
    handleInputBlur,
    handleInputChange,
    resetForm,
  } = useFormControl(InitialScenerioFormValue());

  const CreateScenerio = async (scenerio: Scenerio) => {
    const response = await axios.post(
      `${BaseUrl}/api/scenerio/create`,
      scenerio
    );

    if (response.status === 201) {
      resetForm();
      navigate("/all/scenerio");
    } else {
      console.log("something is error ");
    }
  };

  const updateScenerio = async (scenerio: Scenerio) => {
    const response = await axios.patch(
      `${BaseUrl}/api/scenerio/update/${id}`,
      scenerio
    );
    if (response.status === 200) {
      resetForm();
      navigate("/all/scenerio");
    } else {
      console.log("something is error ");
    }
  };

  const handleAddScenerio = async () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      if (id && isScenerio) {
        const updateScenerios = {
          ...isScenerio,
          scenerioName: values.scenerioName,
          scenerioTime: values.scenerioTime,
        };
        updateScenerio(updateScenerios);
        return;
      }
      const newScenerio: Scenerio = {
        scenerioName: values.scenerioName,
        scenerioTime: values.scenerioTime,
        vehicles: [],
      };
      CreateScenerio(newScenerio);
    }
  };

  return (
    <AddAndEditScenerioForm
      scenerio={isScenerio}
      formValues={values}
      fieldErrors={errors}
      handleInputChange={handleInputChange}
      handleInputBlur={handleInputBlur}
      handleAddScenerioClick={handleAddScenerio}
      resetForm={resetForm}
    />
  );
};

export default AddScenerioContainer;
