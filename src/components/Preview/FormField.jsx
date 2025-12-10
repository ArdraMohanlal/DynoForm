import React from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { validateSingleField } from "../utils/validation";
import { isElementVisible, isElementDisabled } from "../utils/conditions";

const FormField = ({ field, value, errors, onChange, formValues }) => {
  if (!isElementVisible(field, formValues)) return null;

  const error = errors[field.id];
  const disabled = isElementDisabled(field, formValues);
  const v = field.validation || {};

  const handleBlur = () => {
    const err = validateSingleField(field, value);
    errors[field.id] = err || undefined;
  };

  switch (field.type) {
    case "Short Text":
    case "Email":
    case "Number":
    case "Text Area":
    case "Date":
      return (
        <TextField
          fullWidth
          label={field.label}
          placeholder={field.placeholder}
          type={
            field.type === "Number"
              ? "number"
              : field.type === "Email"
              ? "email"
              : field.type === "Date"
              ? "date"
              : "text"
          }
          value={value || ""}
          onChange={(e) => onChange(field.id, e.target.value)}
          onBlur={handleBlur}
          required={v.required}
          error={!!error}
          helperText={error || field.helperText}
          disabled={disabled}
          multiline={field.type === "Text Area"}
          rows={field.type === "Text Area" ? field.rows || 4 : undefined}
          sx={{ mb: 3 }}
          InputLabelProps={field.type === "Date" ? { shrink: true } : undefined}
        />
      );

    case "Radio Group":
      return (
        <FormControl required={!!v.required} error={!!error} disabled={disabled} sx={{ mb: 3 }}>
          <FormLabel>{field.label}</FormLabel>
          <RadioGroup
            value={value || ""}
            onChange={(e) => onChange(field.id, e.target.value)}
            onBlur={handleBlur}
            row={field.direction === "horizontal"}
          >
            {field.options?.map((opt) => (
              <FormControlLabel key={opt.value} value={opt.value} control={<Radio />} label={opt.label} />
            ))}
          </RadioGroup>
          {(error || field.helperText) && <FormHelperText>{error || field.helperText}</FormHelperText>}
        </FormControl>
      );

    case "Checkbox":
      return (
        <FormControl required={!!v.required} error={!!error} disabled={disabled} sx={{ mb: 3 }}>
          <FormControlLabel
            control={<Checkbox checked={!!value} onChange={(e) => onChange(field.id, e.target.checked)} onBlur={handleBlur} />}
            label={field.label}
          />
          {(error || field.helperText) && <FormHelperText>{error || field.helperText}</FormHelperText>}
        </FormControl>
      );

    case "DropDown":
      return (
        <FormControl fullWidth required={!!v.required} error={!!error} disabled={disabled} sx={{ mb: 3 }}>
          <InputLabel>{field.label}</InputLabel>
          <Select value={value || ""} label={field.label} onChange={(e) => onChange(field.id, e.target.value)} onBlur={handleBlur}>
            {field.placeholder && (
              <MenuItem value="">
                <em>{field.placeholder}</em>
              </MenuItem>
            )}
            {field.options?.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
          {(error || field.helperText) && <FormHelperText>{error || field.helperText}</FormHelperText>}
        </FormControl>
      );

    default:
      return null;
  }
};

export default FormField;
