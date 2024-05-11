import { Grid } from "@mui/material";
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

interface Item {
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
  form_id: string | null;
  title: string;
}

const BoardingForm: React.FC = ({}) => {
  const [config, setConfig] = useRecoilState<FormData[]>(configState);
  const [formItems, setFormItems] = useState<Item[]>([]);
  const [openField, setOpenField] = useState<FieldState>({
    open: false,
    form_id: null,
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

  useEffect(() => {
    setFormItems(
      config?.map((item) => ({
        form_id: item?.form_id,
        title: item?.title,
        description: item?.description,
        theme: item?.theme,
      }))
    );
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
                          className={`border-l-[4px] border-[${item.theme}] card-shadow rounded-[4px] bg-[white]`}
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

      <FieldItemCustomization
        open={openField?.open}
        handleClose={() => {
          setOpenField({
            open: false,
            form_id: null,
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
