import { Button, CircularProgress, Fab, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import FieldItemCustomization from "./BoardingItem";
import { useRecoilState } from "recoil";
import { configState } from "../../recoil/atom/form";
import { FormData } from "../../types/form";
import SaveIcon from "@mui/icons-material/Save";
import ReplayIcon from "@mui/icons-material/Replay";
import { toast } from "react-toastify";
import { errorFormatter } from "../../Utils/formatter";
import { updateFormData } from "../../api/form";
import EditIcon from "@mui/icons-material/Edit";

export interface Item {
  form_id: string;
  title: string;
  description: string;
  theme: string;
}

// interface BoardingFormProps {
//   items: Item[];
// }

interface FieldState {
  open: boolean;
  form_id: string;
  title: string;
}

const BoardingForm: React.FC = ({}) => {
  const [config] = useRecoilState<FormData[]>(configState);
  const [formItems, setFormItems] = useState<Item[]>([]);
  const [tempState, setTempState] = useState<Item[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [openField, setOpenField] = useState<FieldState>({
    open: false,
    form_id: "",
    title: "",
  });
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newFormItems = Array.from(formItems);
    const [removed] = newFormItems.splice(result.source.index, 1);
    newFormItems.splice(result.destination.index, 0, removed);
    console.log(newFormItems);

    setFormItems(newFormItems);
  };

  const handleUpdateForm = async () => {
    try {
      setLoading("UPDATE_FORM");
      const { data } = await updateFormData({
        form_data: formItems,
      });
      if (data?.status) {
        setTempState(formItems);
        toast.success("Form updated successfully!!");
      }
    } catch (error) {
      toast.error(errorFormatter(error));
    }
    setLoading(null);
  };

  useEffect(() => {
    let formatted = config?.map((item) => ({
      form_id: item?.form_id,
      title: item?.title,
      description: item?.description,
      theme: item?.theme,
    }));
    setFormItems(formatted);
    setTempState([...formatted]);
  }, [config]);

  return (
    <>
      <div className="h-[100vh] dot-bg">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <Grid
                container
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  display: "flex",
                  marginTop: 0,
                  marginLeft: 0,
                  width: "100%",
                }}
              >
                {formItems.map((item, index) => (
                  <Draggable
                    key={item?.form_id}
                    draggableId={item?.form_id}
                    index={index}
                  >
                    {(provided) => (
                      <Grid
                        item
                        xs={3}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          padding: 10,
                          paddingTop: 5,
                          paddingBottom: 5,
                          ...provided.draggableProps.style,
                        }}
                        onDoubleClick={() => {
                          setOpenField({
                            open: true,
                            form_id: item?.form_id,
                            title: item?.title,
                          });
                        }}
                      >
                        <div
                          className={`relative border-l-[4px] border-[${item.theme}] card-shadow rounded-[4px] bg-[white] h-[250px]`}
                        >
                          <div>
                            <div
                              style={{ cursor: "move" }}
                              {...provided.dragHandleProps}
                            >
                              <DragIndicatorIcon />
                            </div>
                            <div className="p-[30px]">
                              <p className="text-bold font-[500] text-[18px]">
                                {item.title}
                              </p>
                              <p className=" font-[400] text-[gray] text-[13px] mt-[10px]">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <div className="absolute bottom-[10px] right-[10px]">
                            <Button
                              size="small"
                              onClick={() => {
                                setOpenField({
                                  open: true,
                                  form_id: item?.form_id,
                                  title: item?.title,
                                });
                              }}
                            >
                              <EditIcon sx={{ fontSize: 15, mr: 0.5 }} /> Edit
                            </Button>
                          </div>
                        </div>
                      </Grid>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {JSON.stringify(formItems) !== JSON.stringify(tempState) && (
        <div className="flex gap-[10px] fixed right-[20px] bottom-[20px]">
          <Fab
            aria-label="add"
            onClick={() => {
              setFormItems([...tempState]);
            }}
            disabled={loading === "UPDATE_FORM"}
          >
            <ReplayIcon />
          </Fab>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              handleUpdateForm();
            }}
            disabled={loading === "UPDATE_FORM"}
          >
            {loading === "UPDATE_FORM" ? (
              <CircularProgress size={20} />
            ) : (
              <SaveIcon />
            )}
          </Fab>
        </div>
      )}

      <FieldItemCustomization
        open={openField?.open}
        handleClose={() => {
          setOpenField({
            open: false,
            form_id: "",
            title: "",
          });
        }}
        form_id={openField?.form_id}
        title={openField?.title}
      />
    </>
  );
};

export default BoardingForm;
