import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const GroupBuilder = ({
  groupName,
  setGroupName,
  basicTypes,
  onAddToGroup,
  groupFields,
  onSaveGroup,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        label="Group Name"
        placeholder="e.g. Personal Info, Address"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        fullWidth
        size="small"
        variant="outlined"
        sx={{ mb: 2, bgcolor: "background.paper" }}
      />

      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Add fields to group:
      </Typography>

      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 1,
          boxShadow: 1,
          mb: 3,
        }}
      >
        {basicTypes.map((type) => (
          <Button
            key={type}
            fullWidth
            variant="text"
            onClick={() => onAddToGroup(type)}
            sx={{
              justifyContent: "flex-start",
              textTransform: "none",
              py: 1.5,
              borderRadius: 1,
              mb: 1,
              color: theme.palette.text.primary,
              "&:hover": { bgcolor: theme.palette.primary.light },
            }}
          >
            <AddIcon fontSize="small" sx={{ mr: 1 }} />
            {type}
          </Button>
        ))}
      </Box>

      {groupFields.length > 0 && (
        <>
          <Typography variant="subtitle2" gutterBottom>
            Fields in "{groupName || "New Group"}":
          </Typography>
          <Box
            sx={{
              bgcolor: "background.paper",
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              p: 2,
              maxHeight: 200,
              overflowY: "auto",
            }}
          >
            {groupFields.map((f, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1,
                  px: 2,
                  bgcolor: theme.palette.action.hover,
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <Typography variant="body2">{f.type}</Typography>
                {f.label && <Typography variant="caption">"{f.label}"</Typography>}
              </Box>
            ))}
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={onSaveGroup}
            startIcon={<AddIcon />}
            sx={{
              mt: 2,
              bgcolor: theme.palette.primary.main,
              "&:hover": { bgcolor: theme.palette.primary.dark },
              fontWeight: "bold",
            }}
          >
            Save & Add Group to Form
          </Button>
        </>
      )}

      <Divider sx={{ mt: 4 }} />
    </Box>
  );
};

export default GroupBuilder;
