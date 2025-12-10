import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import Header from "./Header";
import FormBuilder from "./FormBuilder";
import FormPreview from "../Preview/FormPreview";

function BuilderPage() {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="#f8fafc"
    >
      <Header
        isPreviewMode={isPreviewMode}
        onTogglePreview={setIsPreviewMode}
      />
      <Container maxWidth={false} disableGutters sx={{ flexGrow: 1 }}>
        {isPreviewMode ? <FormPreview /> : <FormBuilder />}
      </Container>
    </Box>
  );
}

export default BuilderPage;
