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

export const errorFormatter = (error: any, msg?: string): string => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    msg ||
    "Some error occurred"
  );
};
