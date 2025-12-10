import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const SavedGroupsList = ({ groupedElements, onAddGroupToCanvas }) => {
  const theme = useTheme();

  if (groupedElements.length === 0) return null;

  return (
    <Box>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Saved Groups
      </Typography>

      <List
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        {groupedElements.map((group, idx) => (
          <Tooltip
            key={idx}
            title={
              <Box>
                <Typography variant="subtitle2">{group.name}</Typography>
                {group.fields.map((f, i) => (
                  <Typography key={i} variant="body2">
                    • {f.type} {f.label && `("${f.label}")`}
                  </Typography>
                ))}
              </Box>
            }
            arrow
          >
            <ListItem
              button
              onClick={() => onAddGroupToCanvas(group)}
              sx={{
                borderRadius: 1,
                mb: 1,
                bgcolor: theme.palette.warning.light,
                border: `1px solid ${theme.palette.warning.main}`,
                "&:hover": {
                  bgcolor: theme.palette.warning.main,
                  transform: "translateY(-2px)",
                  boxShadow: theme.shadows[3],
                  color: theme.palette.getContrastText(theme.palette.warning.main),
                },
              }}
            >
              <ListItemText
                primary={group.name}
                secondary={`${group.fields.length} field${group.fields.length > 1 ? "s" : ""}`}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
              <AddIcon color="primary" />
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
};

export default SavedGroupsList;
