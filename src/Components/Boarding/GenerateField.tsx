import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import DragDrop from "../DocumentUploader";

const GenerateField = ({
  field,
  value,
  onChange,
  isError,
  errorTxt,
  extraLabel,
  fileType,
}: {
  field: Record<string, any>;
  value?: any;
  onChange?: (...args: any[]) => any;
  isError?: boolean;
  errorTxt?: string;
  extraLabel?: string | null;
  fileType?: Array<string> | null;
}) => {
  const { type, label } = field;
  return type === "text" || type === "number" ? (
    <TextField
      fullWidth
      name={field?.name}
      id={field?.name}
      type={type}
      label={label}
      required={field?.required}
      size="small"
      {...(value ? { value } : { value: "" })}
      {...(onChange ? { onChange } : {})}
      {...(isError ? { error: true, helperText: errorTxt } : {})}
    />
  ) : type === "text_area" ? (
    <TextField
      fullWidth
      type={"text"}
      multiline
      label={label}
      rows={2}
      maxRows={4}
      required={field?.required}
      size="small"
      {...(value ? { value } : {})}
      {...(onChange ? { onChange } : {})}
      {...(isError ? { error: true, helperText: errorTxt } : {})}
    />
  ) : type === "radio" ? (
    <FormControl
      required={field?.required}
      size="small"
      {...(onChange ? { onChange } : {})}
      {...(isError ? { error: true, helperText: errorTxt } : {})}
    >
      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        {...(value ? { value } : {})}
      >
        {field?.values?.map((item: Record<string, any>) => (
          <FormControlLabel
            value={item?.value}
            control={<Radio />}
            label={item?.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  ) : type === "select" ? (
    <FormControl
      fullWidth
      required={field?.required}
      size="small"
      {...(isError ? { error: true, helperText: errorTxt } : {})}
    >
      <InputLabel id="demo-simple-select-label">{field?.label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={field?.label}
        {...(value !== undefined ? { value } : {})}
        {...(onChange ? { onChange } : {})}
      >
        {field?.values?.map((item: Record<string, any>) => (
          <MenuItem value={item?.value}>{item?.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : type === "document" ? (
    <div className="mb-[5px]">
      <div className="text-[12px] mb-[5px] text-[gray]">
        {(extraLabel ? extraLabel : field?.name)
          .replaceAll("_", " ")
          .toUpperCase()}
        <span className="ml-[2px]">{field?.required ? "*" : ""}</span>
      </div>
      <DragDrop
        customType={fileType || ["JPEG","JPG"]}
        setFile={(val, name) => {
          if (onChange) {
            onChange({
              target: {
                name: name,
                value: val,
              },
            });
          }
        }}
      />
      <span className="text-[red] text-[12px]">{errorTxt}</span>
    </div>
  ) : null;
};

export default GenerateField;
