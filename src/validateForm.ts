const ValidateFormField = (fieldName: string, value: any) => {
  switch (fieldName) {
    case "scenerioList": {
      return value === "none";
      break;
    }
    case "vehicleName": {
      return value.length > 10 || !value;
      break;
    }
    case "vehicleSpeed": {
      return !value || +value <= 0;
      break;
    }
    case "positionX":
    case "positionY": {
      return !value || +value <= 0 || +value > 100;
      break;
    }

    case "vehicleDirection": {
      return value === "none";
      break;
    }
    case "scenerioName": {
      return !value;
      break;
    }
    case "scenerioTime": {
      return +value == 0 || +value <= 5;
      break;
    }

    default: {
      return false;
      break;
    }
  }
  return false;
};

export default ValidateFormField;
