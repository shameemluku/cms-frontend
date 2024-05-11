export const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === "string") {
        baseURL = reader.result;
        resolve(baseURL);
      } else {
        throw new Error("Failed to read file as data URL.");
      }
    };
  });
};
