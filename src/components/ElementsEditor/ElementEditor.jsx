
// // src/components/ElementsEditor/ElementEditor.jsx
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Switch,
//   FormControlLabel,
//   Button,
//   IconButton,
//   Divider,
//   Stack,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { Delete as DeleteIcon, Add as AddIcon, Close as CloseIcon, Rule as RuleIcon } from "@mui/icons-material";


// const ElementEditor = ({ selectedElement, onUpdateElement, onDeleteElement, onClose, compact = false, formElements = [] }) => {
//   // local dialog state for conditional rules
//   const [ruleDialogOpen, setRuleDialogOpen] = useState(false);
//   const [editingRuleIndex, setEditingRuleIndex] = useState(-1);
//   const [newRule, setNewRule] = useState({ fieldId: "", operator: "equals", value: "", action: "show" });

//   useEffect(() => {
//     // reset dialog when selected element changes
//     setRuleDialogOpen(false);
//     setEditingRuleIndex(-1);
//     setNewRule({ fieldId: "", operator: "equals", value: "", action: "show" });
//   }, [selectedElement?.id]);

//   if (!selectedElement) {
//     return (
//       <Box p={4} textAlign="center" color="text.secondary">
//         <Typography variant="h6" gutterBottom>
//           No element selected
//         </Typography>
//         <Typography variant="body2">Double-click any field or group on the canvas to edit</Typography>
//       </Box>
//     );
//   }

//   const isGroup = selectedElement.type === "group";

//   const update = (updates) => {
//     // delegate to parent store updater
//     onUpdateElement(selectedElement.id, updates);
//   };

//   // helpers for reading/writing nested validation safely
//   const updateValidation = (partial) => {
//     const current = selectedElement.validation || {};
//     update({ validation: { ...current, ...partial } });
//   };

//   // available fields for conditional triggers (flatten, excluding current element)
//   const getAvailableFields = () => {
//     const fields = [];
//     const collect = (el) => {
//       if (el.id !== selectedElement.id) {
//         fields.push({ id: el.id, label: el.label || el.name || "Untitled", type: el.type });
//       }
//       if (el.type === "group") {
//         el.fields?.forEach(collect);
//       }
//     };
//     formElements.forEach(collect);
//     return fields;
//   };

//   const availableFields = getAvailableFields();

//   // Conditional logic helpers
//   const addOrUpdateRule = () => {
//     const rules = [...(selectedElement.conditional || [])];
//     const rule = { fieldId: newRule.fieldId, operator: newRule.operator, value: newRule.value, action: newRule.action };

//     if (editingRuleIndex >= 0) rules[editingRuleIndex] = rule;
//     else rules.push(rule);

//     update({ conditional: rules });
//     closeRuleDialog();
//   };

//   const closeRuleDialog = () => {
//     setRuleDialogOpen(false);
//     setEditingRuleIndex(-1);
//     setNewRule({ fieldId: "", operator: "equals", value: "", action: "show" });
//   };

//   const editRule = (rule, idx) => {
//     setNewRule({ fieldId: rule.fieldId, operator: rule.operator, value: rule.value || "", action: rule.action });
//     setEditingRuleIndex(idx);
//     setRuleDialogOpen(true);
//   };

//   const deleteRule = (index) => {
//     update({ conditional: selectedElement.conditional.filter((_, i) => i !== index) });
//   };

//   // UI: list of validation inputs based on type
//   const renderValidationInputs = () => {
//     const v = selectedElement.validation || {};

//     // common: required, customMessage
//     return (
//       <Box>
//         <Typography variant="subtitle2" gutterBottom>
//           Validation
//         </Typography>

//         <FormControlLabel
//           control={<Switch checked={!!v.required} onChange={(e) => updateValidation({ required: e.target.checked })} />}
//           label="Required"
//         />

//         {/* Text-like */}
//         {["Short Text", "Email", "Text Area"].includes(selectedElement.type) && (
//           <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
//             <TextField
//               label="Min Length"
//               type="number"
//               value={v.minLength ?? ""}
//               onChange={(e) => updateValidation({ minLength: e.target.value === "" ? null : Number(e.target.value) })}
//               size="small"
//               fullWidth
//             />
//             <TextField
//               label="Max Length"
//               type="number"
//               value={v.maxLength ?? ""}
//               onChange={(e) => updateValidation({ maxLength: e.target.value === "" ? null : Number(e.target.value) })}
//               size="small"
//               fullWidth
//             />
//           </Stack>
//         )}

//         {/* Number */}
//         {selectedElement.type === "Number" && (
//           <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
//             <TextField
//               label="Min Value"
//               type="number"
//               value={v.min ?? ""}
//               onChange={(e) => updateValidation({ min: e.target.value === "" ? null : Number(e.target.value) })}
//               size="small"
//               fullWidth
//             />
//             <TextField
//               label="Max Value"
//               type="number"
//               value={v.max ?? ""}
//               onChange={(e) => updateValidation({ max: e.target.value === "" ? null : Number(e.target.value) })}
//               size="small"
//               fullWidth
//             />
//           </Stack>
//         )}

//         {/* Date */}
//         {selectedElement.type === "Date" && (
//           <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
//             <TextField label="Min Date" type="date" value={v.minDate || ""} onChange={(e) => updateValidation({ minDate: e.target.value || null })} InputLabelProps={{ shrink: true }} size="small" fullWidth />
//             <TextField label="Max Date" type="date" value={v.maxDate || ""} onChange={(e) => updateValidation({ maxDate: e.target.value || null })} InputLabelProps={{ shrink: true }} size="small" fullWidth />
//           </Stack>
//         )}

//         {/* Pattern and custom message */}
//         {["Short Text", "Email", "Text Area", "Number"].includes(selectedElement.type) && (
//           <>
//             <TextField label="Regex pattern (JS)" value={v.pattern || ""} onChange={(e) => updateValidation({ pattern: e.target.value })} size="small" fullWidth sx={{ mt: 2 }} placeholder="e.g. ^\\d{6}$" />
//             <TextField label="Custom error message" value={v.customMessage || ""} onChange={(e) => updateValidation({ customMessage: e.target.value })} size="small" fullWidth sx={{ mt: 1 }} placeholder="Displayed when validation fails" />
//           </>
//         )}

//         {/* Checkbox custom: required must be true to be valid */}
//         {selectedElement.type === "Checkbox" && (
//           <TextField label="Custom error message (when unchecked)" value={v.customMessage || ""} onChange={(e) => updateValidation({ customMessage: e.target.value })} size="small" fullWidth sx={{ mt: 2 }} />
//         )}
//       </Box>
//     );
//   };

//   // Options editor for radio/dropdown
//   const renderOptionsEditor = () => {
//     const opts = selectedElement.options || [];
//     return (
//       <Box>
//         <Typography variant="subtitle2" gutterBottom>
//           Options
//         </Typography>
//         {opts.map((opt, i) => (
//           <Stack key={i} direction="row" spacing={1} sx={{ mb: 1 }}>
//             <TextField size="small" value={opt.label} onChange={(e) => { const newOpts = [...opts]; newOpts[i] = { ...newOpts[i], label: e.target.value }; update({ options: newOpts }); }} placeholder="Label" sx={{ flex: 1 }} />
//             <TextField size="small" value={opt.value} onChange={(e) => { const newOpts = [...opts]; newOpts[i] = { ...newOpts[i], value: e.target.value }; update({ options: newOpts }); }} placeholder="Value" sx={{ flex: 1 }} />
//             <IconButton size="small" color="error" onClick={() => update({ options: opts.filter((_, j) => j !== i) })}><DeleteIcon /></IconButton>
//           </Stack>
//         ))}
//         <Button startIcon={<AddIcon />} size="small" onClick={() => update({ options: [...opts, { label: "New", value: `opt_${Date.now()}` }] })}>Add Option</Button>
//       </Box>
//     );
//   };

//   return (
//     <Box p={compact ? 2 : 4} height="100%" overflow="auto" bgcolor="background.paper">
//       {/* Header */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//         <Box>
//           <Typography variant={compact ? "h6" : "h5"} fontWeight="bold">
//             {isGroup ? "Group Settings" : "Field Settings"}
//           </Typography>
//           <Typography variant="caption" color="text.secondary">ID: {selectedElement.id}</Typography>
//         </Box>
//         {compact && onClose && (
//           <IconButton onClick={onClose}><CloseIcon /></IconButton>
//         )}
//       </Box>

//       <Divider sx={{ mb: 3 }} />

//       <Stack spacing={3}>
//         {/* Group name */}
//         {isGroup && (
//           <TextField label="Group Name" value={selectedElement.name || ""} onChange={(e) => update({ name: e.target.value })} fullWidth />
//         )}

//         {/* Field label + required */}
//         {!isGroup && (
//           <>
//             <TextField label="Field Label" value={selectedElement.label || ""} onChange={(e) => update({ label: e.target.value })} fullWidth />
//             <FormControlLabel control={<Switch checked={!!selectedElement.required} onChange={(e) => update({ required: e.target.checked })} />} label="Required" />
//           </>
//         )}

//         {/* Placeholder and default */}
//         {!isGroup && ["Short Text", "Email", "Number", "Text Area", "DropDown"].includes(selectedElement.type) && (
//           <TextField label="Placeholder" value={selectedElement.placeholder || ""} onChange={(e) => update({ placeholder: e.target.value })} fullWidth />
//         )}
//         {!isGroup && ["Short Text", "Email", "Number", "Text Area"].includes(selectedElement.type) && (
//           <TextField label="Default value" value={selectedElement.defaultValue || ""} onChange={(e) => update({ defaultValue: e.target.value })} fullWidth />
//         )}

//         {/* Type specific */}
//         {!isGroup && (selectedElement.type === "Number") && (
//           <Stack direction="row" spacing={2}>
//             <TextField label="Step" type="number" value={selectedElement.step ?? 1} onChange={(e) => update({ step: Number(e.target.value) || 1 })} size="small" />
//           </Stack>
//         )}

//         {/* Options for radio/dropdown */}
//         {!isGroup && (selectedElement.type === "Radio Group" || selectedElement.type === "DropDown") && renderOptionsEditor()}

//         {/* Validation section */}
//         {renderValidationInputs()}

//         {/* Conditional Logic */}
//         <Box>
//           <Box display="flex" alignItems="center" gap={1} mb={2}><RuleIcon color="primary" /><Typography variant="h6" color="primary">Conditional Logic</Typography></Box>
//           {(selectedElement.conditional || []).length === 0 ? (
//             <Paper variant="outlined" sx={{ p: 2, bgcolor: "grey.50" }}>
//               <Typography variant="body2" color="text.secondary">No conditions defined</Typography>
//               <Button startIcon={<AddIcon />} onClick={() => setRuleDialogOpen(true)} size="small" sx={{ mt: 1 }}>Add Condition</Button>
//             </Paper>
//           ) : (
//             <Stack spacing={2}>
//               {selectedElement.conditional.map((rule, i) => (
//                 <Paper key={i} variant="outlined" sx={{ p: 2 }}>
//                   <Box display="flex" justifyContent="space-between" alignItems="start">
//                     <Box>
//                       <Typography variant="body2"><strong>{rule.action.toUpperCase()}</strong> this field when</Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         <strong>{availableFields.find((f) => f.id === rule.fieldId)?.label || "Unknown"}</strong> {rule.operator} {rule.value && `"${rule.value}"`}
//                       </Typography>
//                     </Box>
//                     <Box>
//                       <IconButton size="small" onClick={() => editRule(rule, i)}><AddIcon fontSize="small" /></IconButton>
//                       <IconButton size="small" color="error" onClick={() => deleteRule(i)}><DeleteIcon fontSize="small" /></IconButton>
//                     </Box>
//                   </Box>
//                 </Paper>
//               ))}
//               <Button startIcon={<AddIcon />} onClick={() => setRuleDialogOpen(true)} variant="outlined" fullWidth>Add New Condition</Button>
//             </Stack>
//           )}
//         </Box>

//         {/* Delete Button */}
//         <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => onDeleteElement(selectedElement.id)} fullWidth sx={{ mt: 2 }}>
//           Delete {isGroup ? "Group" : "Field"}
//         </Button>
//       </Stack>

//       {/* Condition Dialog */}
//       <Dialog open={ruleDialogOpen} onClose={closeRuleDialog} maxWidth="sm" fullWidth>
//         <DialogTitle>{editingRuleIndex >= 0 ? "Edit" : "Add"} Condition <IconButton onClick={closeRuleDialog} sx={{ position: "absolute", right: 8, top: 8 }}><CloseIcon /></IconButton></DialogTitle>
//         <DialogContent>
//           <Stack spacing={3} pt={2}>
//             <FormControl fullWidth>
//               <InputLabel>Trigger Field</InputLabel>
//               <Select value={newRule.fieldId} label="Trigger Field" onChange={(e) => { const type = availableFields.find((f) => f.id === e.target.value)?.type || ""; setNewRule({ ...newRule, fieldId: e.target.value, operator: (type === "Checkbox" ? "is_checked" : "equals") }); }}>
//                 <MenuItem value="">-- Select a field --</MenuItem>
//                 {availableFields.map((f) => <MenuItem key={f.id} value={f.id}>{f.label} ({f.type})</MenuItem>)}
//               </Select>
//             </FormControl>

//             {newRule.fieldId && (
//               <FormControl fullWidth>
//                 <InputLabel>Condition</InputLabel>
//                 <Select value={newRule.operator} label="Condition" onChange={(e) => setNewRule({ ...newRule, operator: e.target.value })}>
//                   {(() => {
//                     const t = availableFields.find((f) => f.id === newRule.fieldId)?.type || "";
//                     const common = ["equals", "not_equals"];
//                     const ops = t === "Number" ? [...common, "greater_than", "less_than"] : (t === "Checkbox" ? ["is_checked", "is_not_checked"] : [...common, "contains"]);
//                     return ops.map((op) => <MenuItem key={op} value={op}>{op}</MenuItem>);
//                   })()}
//                 </Select>
//               </FormControl>
//             )}

//             {!["is_checked", "is_not_checked"].includes(newRule.operator) && (
//               <TextField label="Value" value={newRule.value} onChange={(e) => setNewRule({ ...newRule, value: e.target.value })} placeholder="Expected value" fullWidth />
//             )}

//             <FormControl fullWidth>
//               <InputLabel>Action</InputLabel>
//               <Select value={newRule.action} label="Action" onChange={(e) => setNewRule({ ...newRule, action: e.target.value })}>
//                 <MenuItem value="show">Show this field</MenuItem>
//                 <MenuItem value="hide">Hide this field</MenuItem>
//                 <MenuItem value="disable">Disable this field</MenuItem>
//                 <MenuItem value="enable">Enable this field</MenuItem>
//               </Select>
//             </FormControl>
//           </Stack>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeRuleDialog}>Cancel</Button>
//           <Button onClick={addOrUpdateRule} variant="contained" disabled={!newRule.fieldId || (newRule.value === "" && !["is_checked", "is_not_checked"].includes(newRule.operator))}>{editingRuleIndex >= 0 ? "Update" : "Add"} Rule</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default ElementEditor;



import React from "react";
import { Box, Typography, TextField, Stack, Divider, Button, IconButton } from "@mui/material";
import { Delete as DeleteIcon, Close as CloseIcon } from "@mui/icons-material";

import { useElementEditor } from "../../hooks/useElementEditor";
import ValidationEditor from "./ValidationEditor";
import OptionsEditor from "./OptionsEditor";
import ConditionalLogicEditor from "./ConditionalLogicEditor";

const ElementEditor = ({ selectedElement, onUpdateElement, onDeleteElement, onClose, compact = false, formElements = [] }) => {
  const isGroup = selectedElement?.type === "group";
  const editor = useElementEditor(selectedElement, onUpdateElement, formElements);

  if (!selectedElement) return <Box p={4} textAlign="center" color="text.secondary"><Typography variant="h6">No element selected</Typography><Typography variant="body2">Double-click any field or group on the canvas to edit</Typography></Box>;

  return (
    <Box p={compact ? 2 : 4} height="100%" overflow="auto" bgcolor="background.paper">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant={compact ? "h6" : "h5"} fontWeight="bold">{isGroup ? "Group Settings" : "Field Settings"}</Typography>
          <Typography variant="caption" color="text.secondary">ID: {selectedElement.id}</Typography>
        </Box>
        {compact && onClose && <IconButton onClick={onClose}><CloseIcon /></IconButton>}
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={3}>
        {isGroup && <TextField label="Group Name" value={selectedElement.name || ""} onChange={(e) => editor.update({ name: e.target.value })} fullWidth />}

        {!isGroup && <TextField label="Field Label" value={selectedElement.label || ""} onChange={(e) => editor.update({ label: e.target.value })} fullWidth />}
        {!isGroup && <ValidationEditor selectedElement={selectedElement} updateValidation={editor.updateValidation} />}

        {(!isGroup && ["Radio Group", "DropDown"].includes(selectedElement.type)) && <OptionsEditor selectedElement={selectedElement} update={editor.update} />}

        <ConditionalLogicEditor
          selectedElement={selectedElement}
          availableFields={editor.availableFields}
          {...editor}
        />

        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => onDeleteElement(selectedElement.id)} fullWidth sx={{ mt: 2 }}>
          Delete {isGroup ? "Group" : "Field"}
        </Button>
      </Stack>
    </Box>
  );
};

export default ElementEditor;
