// src/components/FormPreview/SuccessDialog.jsx
import React from "react";
import { Dialog, Box, Typography, Button } from "@mui/material";

const SuccessDialog = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <Box p={4} textAlign="center">
      <Typography variant="h5" fontWeight="bold">
        🎉 Form Submitted!
      </Typography>
      <Typography sx={{ mb: 3 }}>Your response has been recorded.</Typography>
      <Button variant="contained" onClick={onClose}>
        Close
      </Button>
    </Box>
  </Dialog>
);

export default SuccessDialog;
