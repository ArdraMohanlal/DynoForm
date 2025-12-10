import React from "react";
import { Box, Typography, Stack, TextField, FormControlLabel, Switch } from "@mui/material";

const ValidationEditor = ({ selectedElement, updateValidation }) => {
  const v = selectedElement.validation || {};

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>Validation</Typography>

      <FormControlLabel
        control={<Switch checked={!!v.required} onChange={(e) => updateValidation({ required: e.target.checked })} />}
        label="Required"
      />

      {["Short Text", "Email", "Text Area"].includes(selectedElement.type) && (
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Min Length"
            type="number"
            value={v.minLength ?? ""}
            onChange={(e) => updateValidation({ minLength: e.target.value === "" ? null : Number(e.target.value) })}
            size="small" fullWidth
          />
          <TextField
            label="Max Length"
            type="number"
            value={v.maxLength ?? ""}
            onChange={(e) => updateValidation({ maxLength: e.target.value === "" ? null : Number(e.target.value) })}
            size="small" fullWidth
          />
        </Stack>
      )}

      {selectedElement.type === "Number" && (
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Min Value"
            type="number"
            value={v.min ?? ""}
            onChange={(e) => updateValidation({ min: e.target.value === "" ? null : Number(e.target.value) })}
            size="small" fullWidth
          />
          <TextField
            label="Max Value"
            type="number"
            value={v.max ?? ""}
            onChange={(e) => updateValidation({ max: e.target.value === "" ? null : Number(e.target.value) })}
            size="small" fullWidth
          />
        </Stack>
      )}

      {selectedElement.type === "Date" && (
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <TextField label="Min Date" type="date" value={v.minDate || ""} onChange={(e) => updateValidation({ minDate: e.target.value || null })} InputLabelProps={{ shrink: true }} size="small" fullWidth />
          <TextField label="Max Date" type="date" value={v.maxDate || ""} onChange={(e) => updateValidation({ maxDate: e.target.value || null })} InputLabelProps={{ shrink: true }} size="small" fullWidth />
        </Stack>
      )}

      {["Short Text", "Email", "Text Area", "Number"].includes(selectedElement.type) && (
        <>
          <TextField label="Regex pattern (JS)" value={v.pattern || ""} onChange={(e) => updateValidation({ pattern: e.target.value })} size="small" fullWidth sx={{ mt: 2 }} placeholder="e.g. ^\\d{6}$" />
          <TextField label="Custom error message" value={v.customMessage || ""} onChange={(e) => updateValidation({ customMessage: e.target.value })} size="small" fullWidth sx={{ mt: 1 }} placeholder="Displayed when validation fails" />
        </>
      )}

      {selectedElement.type === "Checkbox" && (
        <TextField label="Custom error message (when unchecked)" value={v.customMessage || ""} onChange={(e) => updateValidation({ customMessage: e.target.value })} size="small" fullWidth sx={{ mt: 2 }} />
      )}
    </Box>
  );
};

export default ValidationEditor;
