import React from "react";
import { Paper, Typography, Divider } from "@mui/material";
import FormField from "./FormField";

const FormGroup = ({ element, formValues, errors, onChange }) => (
  <Paper variant="outlined" sx={{ p: 4, mb: 4, bgcolor: "grey.50", borderRadius: 3 }}>
    <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
      {element.name}
    </Typography>
    <Divider sx={{ my: 2 }} />
    {element.fields?.map((field) => (
      <FormField key={field.id} field={field} value={formValues[field.id]} errors={errors} onChange={onChange} formValues={formValues} />
    ))}
  </Paper>
);

export default FormGroup;
