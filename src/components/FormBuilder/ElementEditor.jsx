// src/components/ElementsEditor/ElementEditor.jsx
import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const ElementEditor = ({ selectedElement, onUpdateElement, onDeleteElement }) => {
  if (!selectedElement) return <Typography p={2}>No element selected</Typography>;

  return (
    <Box p={2}>
      <TextField
        label="Label"
        fullWidth
        value={selectedElement.label || selectedElement.name}
        onChange={(e) => onUpdateElement(selectedElement.id, { label: e.target.value })}
      />
      <Button sx={{ mt: 2 }} color="error" variant="outlined" onClick={() => onDeleteElement(selectedElement.id)}>
        Delete
      </Button>
    </Box>
  );
};

export default ElementEditor;
