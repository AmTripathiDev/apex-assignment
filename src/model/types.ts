import { ChangeEvent } from "react";

export type FormValues = {
  [key: string]: any;
};

export type FormErrors = {
  [key: string]: boolean;
};

export type FormFieldValidationFn = (value: string) => boolean;

export type FormValidationFn = (fieldName: string, value: string) => boolean;

export type FormState = {
  values: FormValues;
  errors: FormErrors;
};

export type FormHook = {
    values: FormValues;
    errors: FormErrors;
    handleInputChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    handleInputBlur: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
    validateForm: () => boolean;
    resetForm: () => void;
  };
