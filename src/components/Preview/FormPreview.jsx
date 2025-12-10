import React from "react";
import { Box, Paper, Typography, Button, Alert } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { useFormStore } from "../../store/formStore";
import { useFormPreview } from "../../hooks/useFormPreview";
import FormField from "./FormField";
import FormGroup from "./FormGroup";
import SuccessDialog from "./SuccessDialog";

const FormPreview = () => {
  const { formElements } = useFormStore();
  const { formValues, errors, successOpen, formRef, handleChange, handleSubmit, setSuccessOpen } = useFormPreview(formElements);

  if (!formElements.length) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="70vh">
        <Alert severity="info">Your form is empty. Switch to <strong>Build Mode</strong> to add fields.</Alert>
      </Box>
    );
  }

  return (
    <>
      <SuccessDialog open={successOpen} onClose={() => setSuccessOpen(false)} />

      <Box maxWidth="md" mx="auto" py={6} px={3} ref={formRef}>
        <Paper elevation={6} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4 }}>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            fontWeight="bold"
            sx={{ background: "linear-gradient(90deg, #7c3aed, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Live Form Preview
          </Typography>

          <Box component="form" onSubmit={handleSubmit} mt={6} noValidate>
            {formElements.map((el) =>
              el.type === "group" ? (
                <FormGroup key={el.id} element={el} formValues={formValues} errors={errors} onChange={handleChange} />
              ) : (
                <FormField key={el.id} field={el} value={formValues[el.id]} errors={errors} onChange={handleChange} formValues={formValues} />
              )
            )}

            <Box textAlign="center" mt={5}>
              <Button type="submit" variant="contained" size="large" endIcon={<SendIcon />} sx={{ minWidth: 200, borderRadius: 3, py: 2, textTransform: "none" }}>
                Submit Form
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default FormPreview;
