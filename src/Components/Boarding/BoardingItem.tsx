import * as React from "react";
import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
} from "react-beautiful-dnd";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Slider,
} from "@mui/material";
import GenerateField from "./GenerateField";
import { getFormFields, updateFormField } from "../../api/form";
import SaveIcon from "@mui/icons-material/Save";
import ReplayIcon from "@mui/icons-material/Replay";
import { errorFormatter } from "../../Utils/formatter";
import { toast } from "react-toastify";
import DataTypeSelect from "../DataTypeSelect";
import AddIcon from "@mui/icons-material/Add";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FieldItemCustomizationProps {
  open: boolean;
  handleClose: () => void;
  form_id: string;
  title: string;
}

const FullScreenDialog: React.FC<FieldItemCustomizationProps> = ({
  open,
  handleClose,
  form_id,
  title,
}) => {
  const [formFields, setFormFields] = React.useState<any>([]);
  const [tempState, setTempState] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<string | null>(null);

  const handleLoadFormElements = async () => {
    try {
      setLoading("FETCH_FIELDS");
      const { data: response } = await getFormFields(form_id);
      const { data } = response;
      delete data?._id;
      delete data?.is_active;
      delete data?.config_id;
      delete data?.__v;
      setTempState({ ...(data || {}) });
      setFormFields(data || {});
    } catch (error) {
      alert("Error");
    }
    setLoading(null);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    let state = { ...formFields };
    const newFormItems = Array.from(state?.fields || []);
    const [removed] = newFormItems.splice(result.source.index, 1);
    newFormItems.splice(result.destination.index, 0, removed);
    state.fields = newFormItems;
    setFormFields({ ...state });
  };

  const onOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    key: string
  ) => {
    const updatedFields = [...formFields.fields]; // Create a copy of the fields array
    updatedFields[index] = {
      ...updatedFields[index],
      [key]: event.target.checked,
    };
    setFormFields({ ...formFields, fields: updatedFields }); // Update the formFields state
  };

  const handleUpdateField = async () => {
    try {
      setLoading("UPDATE_FIELDS");
      const { data } = await updateFormField(formFields);
      if (data?.status) {
        toast.success("Fields updated successfully!!");
      }
    } catch (error) {
      toast.error(errorFormatter(error));
    }
    setLoading(null);
  };

  const FieldComp = ({
    field,
    index,
  }: {
    field: Record<string, any>;
    index: number;
  }) => {
    return (
      <div
        key={index}
        className="flex bg-[white] p-[10px] field-item-shadow border-l-[5px] border-[gray] justify-between"
      >
        <div className="flex">
          <div className="mr-[10px]">
            {(() => {
              if (["text", "text_area", "number"].includes(field?.type))
                return <TextFieldsIcon />;
              if (field?.type === "select") return <MenuRoundedIcon />;
              if (field?.type === "radio") return <CheckBoxIcon />;
              if (field?.type === "document") return <UploadFileOutlinedIcon />;
            })()}{" "}
          </div>
          {field?.label}
        </div>
        <div className="flex">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={field?.enabled}
                  onChange={(event) => onOptionChange(event, index, "enabled")}
                />
              }
              label="Enabled"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={field?.required}
                  onChange={(event) => onOptionChange(event, index, "required")}
                />
              }
              label="Required"
            />
          </FormGroup>
        </div>
      </div>
    );
  };

  React.useEffect(() => {
    if (form_id) {
      handleLoadFormElements();
    }
  }, [form_id]);

  React.useEffect(() => {
    console.log(formFields);
  }, [formFields]);

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title}
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                setFormFields({ ...tempState });
              }}
              disabled={
                JSON.stringify(formFields) === JSON.stringify(tempState)
              }
            >
              <ReplayIcon sx={{ fontSize: 18, mr: 0.5 }} /> Reset
            </Button>
            <Button
              color="inherit"
              onClick={handleUpdateField}
              disabled={
                JSON.stringify(formFields) === JSON.stringify(tempState)
              }
            >
              <SaveIcon sx={{ fontSize: 18, mr: 0.5 }} /> save
            </Button>
          </Toolbar>
        </AppBar>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="vertical">
            {(provided) => (
              <div
                className="board-item-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className="left-section bg-[#f5f7fd] relative">
                  <div className="flex flex-col gap-[10px]">
                    {formFields?.fields?.map(
                      (field: Record<string, any>, index: number) => (
                        <Draggable
                          key={field.name}
                          draggableId={field.name}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <FieldComp field={field} index={index} />
                            </div>
                          )}
                        </Draggable>
                      )
                    )}
                  </div>
                  {provided.placeholder}

                  {formFields?.parent_id === "doc_4" && (
                    <div className="absolute bottom-[20px] w-[90%]">
                      <Grid container gap={3}>
                        <Grid xs={5} item>
                          <DataTypeSelect
                            value={formFields?.other_config?.file_types || []}
                            onChange={(value: Array<string>) => {
                              let state = { ...formFields };
                              state.other_config = {
                                ...state.other_config,
                                file_types: value || [],
                              };
                              setFormFields(state);
                            }}
                          />
                        </Grid>
                        <Grid xs={5} item>
                          <span className="text-[12px]">Max file size</span>
                          <Slider
                            aria-label="Temperature"
                            defaultValue={
                              formFields?.other_config?.max_file_size || 5
                            }
                            getAriaValueText={(value: number) => {
                              return `${value} mb`;
                            }}
                            valueLabelDisplay="auto"
                            shiftStep={30}
                            step={5}
                            marks
                            min={5}
                            max={105}
                            onChange={(_, value) => {
                              let state = { ...formFields };
                              state.other_config = {
                                ...state.other_config,
                                max_file_size: value || 5,
                              };
                              setFormFields(state);
                            }}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  )}

                  {formFields?.other_config?.loop && (
                    <div className="absolute bottom-[20px] w-[50%]">
                      <div>
                        <span className="text-[12px]">Add more limit</span>
                        <Slider
                          aria-label="Temperature"
                          defaultValue={formFields?.other_config?.limit || 5}
                          valueLabelDisplay="auto"
                          shiftStep={30}
                          step={1}
                          marks
                          min={1}
                          max={5}
                          onChange={(_, value) => {
                            let state = { ...formFields };
                            state.other_config = {
                              ...state.other_config,
                              limit: value || 3,
                            };
                            setFormFields(state);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="right-section">
                  <Grid container gap={1}>
                    {formFields?.fields?.map(
                      (field: Record<string, any>, index: number) =>
                        field?.enabled && (
                          <Grid item xs={12} key={index}>
                            <GenerateField
                              field={field}
                              fileType={
                                formFields?.other_config?.file_types || null
                              }
                            />
                          </Grid>
                        )
                    )}
                  </Grid>

                  {formFields?.other_config?.loop && (
                    <div className="flex justify-end mt-3">
                      <button className="text-[15px] text-[gray]">
                        <AddIcon /> Add more
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Dialog>
    </React.Fragment>
  );
};

export default FullScreenDialog;
