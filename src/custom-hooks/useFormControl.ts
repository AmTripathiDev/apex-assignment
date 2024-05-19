import { useState, useCallback, useEffect, ChangeEvent } from "react";
import * as formType from "../model/types";
import ValidateFormField from "../validateForm";

const useFormControl = (
  initialValues: formType.FormValues
): formType.FormHook => {
  const [formState, setFormState] = useState<formType.FormState>({
    values: initialValues,
    errors: {},
  });

  const validateForm = useCallback((): boolean => {
    const errors: formType.FormErrors = {};
    for (const fieldName in formState.values) {
      errors[fieldName] = ValidateFormField(
        fieldName,
        formState.values[fieldName]
      );
    }
    setFormState((prevFormState) => ({
      ...prevFormState,
      errors: errors,
    }));
    return !Object.values(errors).some((error) => error);
  }, [formState.values, ValidateFormField]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target;
      setFormState((prevFormState) => ({
        ...prevFormState,
        values: {
          ...prevFormState.values,
          [name]: value,
        },
      }));
    },
    []
  );

  const handleInputBlur = useCallback(
    (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target;

      const error = ValidateFormField(name, value);
      setFormState((prevFormState) => ({
        ...prevFormState,
        errors: {
          ...prevFormState.errors,
          [name]: error,
        },
      }));
    },
    [ValidateFormField]
  );

  const resetForm = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
    });
  }, [initialValues]);

  useEffect(() => {
    validateForm();
  }, [formState.values, validateForm]);

  return {
    values: formState.values,
    errors: formState.errors,
    handleInputChange,
    handleInputBlur,
    validateForm,
    resetForm,
  };
};

export default useFormControl;
