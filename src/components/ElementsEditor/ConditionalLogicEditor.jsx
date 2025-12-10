import React from "react";
import { Box, Typography, Paper, Stack, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel, TextField } from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Close as CloseIcon, Rule as RuleIcon } from "@mui/icons-material";

const ConditionalLogicEditor = ({ selectedElement, availableFields, ruleDialogOpen, setRuleDialogOpen, newRule, setNewRule, editingRuleIndex, addOrUpdateRule, closeRuleDialog, editRule, deleteRule }) => (
  <Box>
    <Box display="flex" alignItems="center" gap={1} mb={2}><RuleIcon color="primary" /><Typography variant="h6" color="primary">Conditional Logic</Typography></Box>
    {(selectedElement.conditional || []).length === 0 ? (
      <Paper variant="outlined" sx={{ p: 2, bgcolor: "grey.50" }}>
        <Typography variant="body2" color="text.secondary">No conditions defined</Typography>
        <Button startIcon={<AddIcon />} onClick={() => setRuleDialogOpen(true)} size="small" sx={{ mt: 1 }}>Add Condition</Button>
      </Paper>
    ) : (
      <Stack spacing={2}>
        {selectedElement.conditional.map((rule, i) => (
          <Paper key={i} variant="outlined" sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="start">
              <Box>
                <Typography variant="body2"><strong>{rule.action.toUpperCase()}</strong> this field when</Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>{availableFields.find(f => f.id === rule.fieldId)?.label || "Unknown"}</strong> {rule.operator} {rule.value && `"${rule.value}"`}
                </Typography>
              </Box>
              <Box>
                <IconButton size="small" onClick={() => editRule(rule, i)}><AddIcon fontSize="small" /></IconButton>
                <IconButton size="small" color="error" onClick={() => deleteRule(i)}><DeleteIcon fontSize="small" /></IconButton>
              </Box>
            </Box>
          </Paper>
        ))}
        <Button startIcon={<AddIcon />} onClick={() => setRuleDialogOpen(true)} variant="outlined" fullWidth>Add New Condition</Button>
      </Stack>
    )}

    {/* Dialog */}
    <Dialog open={ruleDialogOpen} onClose={closeRuleDialog} maxWidth="sm" fullWidth>
      <DialogTitle>{editingRuleIndex >= 0 ? "Edit" : "Add"} Condition <IconButton onClick={closeRuleDialog} sx={{ position: "absolute", right: 8, top: 8 }}><CloseIcon /></IconButton></DialogTitle>
      <DialogContent>
        <Stack spacing={3} pt={2}>
          <FormControl fullWidth>
            <InputLabel>Trigger Field</InputLabel>
            <Select value={newRule.fieldId} label="Trigger Field" onChange={(e) => { const type = availableFields.find(f => f.id === e.target.value)?.type || ""; setNewRule({ ...newRule, fieldId: e.target.value, operator: (type === "Checkbox" ? "is_checked" : "equals") }); }}>
              <MenuItem value="">-- Select a field --</MenuItem>
              {availableFields.map(f => <MenuItem key={f.id} value={f.id}>{f.label} ({f.type})</MenuItem>)}
            </Select>
          </FormControl>

          {newRule.fieldId && (
            <FormControl fullWidth>
              <InputLabel>Condition</InputLabel>
              <Select value={newRule.operator} label="Condition" onChange={(e) => setNewRule({ ...newRule, operator: e.target.value })}>
                {(() => {
                  const t = availableFields.find(f => f.id === newRule.fieldId)?.type || "";
                  const common = ["equals", "not_equals"];
                  const ops = t === "Number" ? [...common, "greater_than", "less_than"] : (t === "Checkbox" ? ["is_checked", "is_not_checked"] : [...common, "contains"]);
                  return ops.map(op => <MenuItem key={op} value={op}>{op}</MenuItem>);
                })()}
              </Select>
            </FormControl>
          )}

          {!["is_checked", "is_not_checked"].includes(newRule.operator) && (
            <TextField label="Value" value={newRule.value} onChange={(e) => setNewRule({ ...newRule, value: e.target.value })} placeholder="Expected value" fullWidth />
          )}

          <FormControl fullWidth>
            <InputLabel>Action</InputLabel>
            <Select value={newRule.action} label="Action" onChange={(e) => setNewRule({ ...newRule, action: e.target.value })}>
              <MenuItem value="show">Show this field</MenuItem>
              <MenuItem value="hide">Hide this field</MenuItem>
              <MenuItem value="disable">Disable this field</MenuItem>
              <MenuItem value="enable">Enable this field</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeRuleDialog}>Cancel</Button>
        <Button onClick={addOrUpdateRule} variant="contained" disabled={!newRule.fieldId || (newRule.value === "" && !["is_checked", "is_not_checked"].includes(newRule.operator))}>{editingRuleIndex >= 0 ? "Update" : "Add"} Rule</Button>
      </DialogActions>
    </Dialog>
  </Box>
);

export default ConditionalLogicEditor;
