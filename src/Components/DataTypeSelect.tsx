import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const types = ["JPEG", "PNG", "JPG", "PDF"];

export default function DataTypeSelect({ value, onChange }: any) {
  const [selectedType, setSelectedType] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedType>) => {
    const {
      target: { value },
    } = event;

    let newValue = typeof value === "string" ? value.split(",") : value;
    setSelectedType(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  React.useEffect(() => {
    setSelectedType(value);
  }, [value]);

  return (
    <div>
      <FormControl fullWidth size="small" sx={{mt:1}}>
        <InputLabel id="demo-multiple-checkbox-label">Allowed type</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedType}
          onChange={handleChange}
          input={<OutlinedInput label="Allowed type" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {types.map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={selectedType.indexOf(type) > -1} />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
