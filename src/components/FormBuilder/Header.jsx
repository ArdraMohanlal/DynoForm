import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import { useFormStore } from "../../store/formStore";

const Header = ({ isPreviewMode, onTogglePreview }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleExport = () => {
    const data = useFormStore.getState().formElements;
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-form.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "white",
        borderBottom: "1px solid #e2e8f0",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(90deg, #7c3aed, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          DynoForm
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <FormControlLabel
            control={
              <Switch
                checked={isPreviewMode}
                onChange={(e) => onTogglePreview(e.target.checked)}
                color="primary"
                size={isMobile ? "small" : "medium"}
              />
            }
            label={
              <Typography variant="body1" fontWeight="medium" sx={{ ml: 1 }}>
                {isPreviewMode ? "Preview" : "Build"}
              </Typography>
            }
            labelPlacement="start"
            sx={{
              bgcolor: isPreviewMode ? "purple.50" : "grey.100",
              borderRadius: 3,
              px: 2,
              py: 0.8,
              transition: "all 0.3s ease",
            }}
          />

          <Button
            variant="outlined"
            onClick={handleExport}
            size={isMobile ? "small" : "medium"}
          >
            Export JSON
          </Button>


        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
