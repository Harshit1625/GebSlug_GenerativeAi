export interface IData {
  [key: string]: FormDataEntryValue;
}

// Function to convert FormData to a plain object (if needed)
//added target key with es2015 in tsconfig.json to fix the error coming in formData entries

export function formDataToJSON(formData: globalThis.FormData) {
  const data: IData = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  return data;
}
