import React from "react";
import { TextField, FormControlLabel, Checkbox, Paper, Box, Typography } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ConditionEngine } from "../utils/conditionEngine";

export const MockField = ({ elem, isSelected, onDoubleClick, formValues, allElements, onFieldChange }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: elem.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { visible, enabled } = ConditionEngine.shouldShowElement(elem, formValues, allElements);
  if (!visible) return null;

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    onFieldChange(elem.id, value);
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      elevation={isSelected ? 8 : 2}
      onDoubleClick={() => onDoubleClick(elem.id)}
      className={`p-4 mb-4 rounded-lg border-2 transition-all ${
        !enabled
          ? "opacity-50 bg-gray-50 cursor-not-allowed"
          : isSelected
          ? "border-purple-600 bg-purple-50 shadow-lg"
          : "border-gray-300 bg-white"
      }`}
    >
      <Box display="flex" alignItems="flex-start" gap={2}>
        <div style={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" className="font-medium">
            {elem.label} {elem.required && <span className="text-red-500">*</span>}
          </Typography>

          {elem.type === "Checkbox" ? (
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!formValues[elem.id]}
                  onChange={handleChange}
                  disabled={!enabled}
                />
              }
              label={elem.helperText || ""}
            />
          ) : (
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder={elem.placeholder || ""}
              value={formValues[elem.id] || elem.defaultValue || ""}
              onChange={handleChange}
              disabled={!enabled}
              className="mt-2"
              InputProps={{
                readOnly: elem.readOnly || false,
              }}
            />
          )}

          {elem.helperText && elem.type !== "Checkbox" && (
            <Typography variant="caption" color="text.secondary" className="mt-1 block">
              {elem.helperText}
            </Typography>
          )}
        </div>

        <div
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={(e) => e.stopPropagation()}
          style={{ cursor: "grab", flexShrink: 0 }}
        >
          <DragHandleIcon className="mt-1 text-gray-400 hover:text-gray-700" />
        </div>
      </Box>
    </Paper>
  );
};
