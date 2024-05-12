import { FileUploader } from "react-drag-drop-files";
import { getBase64 } from "../Utils/formatter";

const fileTypes: string[] = ["JPG", "JPEG", "PNG", "GIF", "PDF"];

interface DragDropProps {
  setFile: (base64: string, fileName: string) => void;
  customType?: string[];
  maxSize?: number;
}

function DragDrop({ setFile, customType, maxSize }: DragDropProps) {
  const handleChange = async (file: File) => {
    const base64 = await getBase64(file);
    setFile(base64, file.name);
  };

  return (
    <FileUploader
      label={"Upload Document"}
      handleChange={handleChange}
      name="file"
      types={customType || fileTypes}
      maxSize={maxSize}
    />
  );
}

export default DragDrop;
