export const InitialScenerioFormValue = (
  scenerioName?: string,
  scenerioTime?: string
) => {
  return {
    scenerioName: {
      value: scenerioName ? scenerioName : "",
    },
    scenerioTime: {
      value: scenerioTime ? scenerioTime : "",
    },
  };
};
