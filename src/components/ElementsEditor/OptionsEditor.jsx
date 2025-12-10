import React from "react";
import { Box, Typography, Stack, TextField, IconButton, Button } from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";

const OptionsEditor = ({ selectedElement, update }) => {
  const opts = selectedElement.options || [];

  const updateOption = (i, key, value) => {
    const newOpts = [...opts];
    newOpts[i] = { ...newOpts[i], [key]: value };
    update({ options: newOpts });
  };

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>Options</Typography>
      {opts.map((opt, i) => (
        <Stack key={i} direction="row" spacing={1} sx={{ mb: 1 }}>
          <TextField size="small" value={opt.label} onChange={(e) => updateOption(i, "label", e.target.value)} placeholder="Label" sx={{ flex: 1 }} />
          <TextField size="small" value={opt.value} onChange={(e) => updateOption(i, "value", e.target.value)} placeholder="Value" sx={{ flex: 1 }} />
          <IconButton size="small" color="error" onClick={() => update({ options: opts.filter((_, j) => j !== i) })}><DeleteIcon /></IconButton>
        </Stack>
      ))}
      <Button startIcon={<AddIcon />} size="small" onClick={() => update({ options: [...opts, { label: "New", value: `opt_${Date.now()}` }] })}>Add Option</Button>
    </Box>
  );
};

export default OptionsEditor;
