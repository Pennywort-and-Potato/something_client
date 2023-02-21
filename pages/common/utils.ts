export const getHostName = "http://51.79.145.63:5000"

export const convertFormValues = (event: any) => {
  const form = new FormData(event.currentTarget);
  let formDataObj: any = {};
  form.forEach((value, key) => (formDataObj[key] = value));
  return formDataObj;
}