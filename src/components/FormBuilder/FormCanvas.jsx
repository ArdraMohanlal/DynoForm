import React from "react";
import { Box, Typography } from "@mui/material";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { MockField } from "./MockField";
import { MockGroup } from "./MockGroup";
import { useFormValues } from "../../hooks/useFormValues";
import { closestCenter } from "@dnd-kit/core";

 const FormCanvas = ({ formElements = [], selectedElementId, onElementClick, onReorder }) => {
  const { formValues, handleFieldChange } = useFormValues({});

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = formElements.findIndex(el => el.id === active.id);
      const newIndex = formElements.findIndex(el => el.id === over.id);
      onReorder(arrayMove(formElements, oldIndex, newIndex));
    }
  };

  const handleReorderFields = (groupId, newFields) => {
    const newElements = formElements.map(el => (el.id === groupId ? { ...el, fields: newFields } : el));
    onReorder(newElements);
  };

  const allElements = formElements.reduce((acc, el) => (el.type === "group" ? [...acc, el, ...el.fields] : [...acc, el]), []);

  return (
    <Box className="max-w-4xl mx-auto py-10">
      <Typography variant="h5" className="font-bold text-purple-900 mb-8 text-center">
        Form Builder – Live Preview
      </Typography>

      <Box className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-10 min-h-96 shadow-inner">
        {formElements.length === 0 ? (
          <Typography color="text.secondary" align="center">
            Drag elements here to start building your form
          </Typography>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={formElements.map(el => el.id)} strategy={verticalListSortingStrategy}>
              {formElements.map(elem =>
                elem.type === "group" ? (
                  <MockGroup
                    key={elem.id}
                    group={elem}
                    selectedElementId={selectedElementId}
                    onDoubleClick={onElementClick}
                    onReorderFields={handleReorderFields}
                    formValues={formValues}
                    allElements={allElements}
                    onFieldChange={handleFieldChange}
                  />
                ) : (
                  <MockField
                    key={elem.id}
                    elem={elem}
                    isSelected={selectedElementId === elem.id}
                    onDoubleClick={onElementClick}
                    formValues={formValues}
                    allElements={allElements}
                    onFieldChange={handleFieldChange}
                  />
                )
              )}
            </SortableContext>
          </DndContext>
        )}
      </Box>
    </Box>
  );
};

export default FormCanvas;