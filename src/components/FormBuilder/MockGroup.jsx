import React from "react";
import { Paper, Box, Typography, Divider } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MockField } from "./MockField";
import { ConditionEngine } from "../utils/conditionEngine";
import { closestCenter } from "@dnd-kit/core";

export const MockGroup = ({ group, selectedElementId, onDoubleClick, onReorderFields, formValues, allElements, onFieldChange }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: group.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  const { visible, enabled } = ConditionEngine.shouldShowElement(group, formValues, allElements);
  if (!visible) return null;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIdx = group.fields.findIndex(f => f.id === active.id);
      const newIdx = group.fields.findIndex(f => f.id === over.id);
      const newFields = arrayMove(group.fields, oldIdx, newIdx);
      onReorderFields(group.id, newFields);
    }
  };

  const isSelected = selectedElementId === group.id;

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      elevation={isSelected ? 10 : 3}
      className={`p-6 mb-8 rounded-xl border-2 transition-all ${
        !enabled
          ? "opacity-50 bg-gray-50"
          : isSelected
          ? "border-purple-600 bg-purple-50 shadow-xl"
          : "border-gray-300 bg-white"
      }`}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3} onDoubleClick={() => onDoubleClick(group.id)}>
        <Typography variant="h6" className="font-bold text-purple-800">
          {group.name} (Group)
        </Typography>
        <div {...attributes} {...listeners} onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()} style={{ cursor: "grab", flexShrink: 0 }}>
          <DragHandleIcon className="text-gray-500 hover:text-gray-700" />
        </div>
      </Box>

      <Divider className="mb-5" />

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={group.fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
          {group.fields.map(field => (
            <MockField
              key={field.id}
              elem={field}
              isSelected={selectedElementId === field.id}
              onDoubleClick={onDoubleClick}
              formValues={formValues}
              allElements={allElements}
              onFieldChange={onFieldChange}
            />
          ))}
        </SortableContext>
      </DndContext>
    </Paper>
  );
};
