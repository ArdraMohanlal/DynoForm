// src/pages/Templates.jsx
import React from "react";
import { Box, Grid, Paper, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useFormStore } from "../../store/formStore";
import { templates } from "../templates/formTemplates";

const TemplatesPage = () => {
  const loadTemplate = useFormStore((s) => s.loadTemplate);

  const handleUseTemplate = (elements) => {
    loadTemplate(elements);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Choose a Template
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={4}>
        Pick a starter form template. You can customize all fields later in the
        builder.
      </Typography>

      <Grid container spacing={3}>
        {templates.map((tpl) => (
          <Grid item xs={12} sm={6} md={4} key={tpl.id}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box mb={2}>
                <Typography variant="h6" fontWeight="bold">
                  {tpl.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {tpl.description}
                </Typography>
              </Box>

              <Box mb={2}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 600 }}
                >
                  Fields:
                </Typography>
                {tpl.elements.map((el) => (
                  <Typography
                    key={el.id}
                    variant="caption"
                    display="block"
                    color="text.secondary"
                  >
                    • {el.label || el.name || el.type}
                  </Typography>
                ))}
              </Box>

              <Stack direction="row" spacing={1} mt={2}>
                <Link
                  to="/builder"
                  style={{ width: "100%", textDecoration: "none" }}
                  onClick={() => handleUseTemplate(tpl.elements)}
                >
                  <Button size="small" variant="contained" fullWidth>
                    Use Template
                  </Button>
                </Link>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TemplatesPage;
