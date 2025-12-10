// import React, { useState } from 'react';
// import {
//   TextField, FormControl, Divider, FormControlLabel,
//   Checkbox, Paper, Box, Typography,
// } from '@mui/material';
// import DragHandleIcon from '@mui/icons-material/DragHandle';

// import {
//   DndContext, closestCenter, KeyboardSensor, PointerSensor,
//   useSensor, useSensors,
// } from '@dnd-kit/core';
// import {
//   arrayMove, SortableContext, sortableKeyboardCoordinates,
//   verticalListSortingStrategy, useSortable,
// } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';

// /* -------------------------------------------------------------
//    Condition Engine (unchanged – works perfectly)
//    ------------------------------------------------------------- */
// const ConditionEngine = {
//   getFormValues: (elements, fieldValues) => {
//     const values = {};
//     elements.forEach(el => {
//       if (el.type !== 'group' && el.id in fieldValues) {
//         values[el.id] = fieldValues[el.id];
//       }
//     });
//     return values;
//   },

//   evaluateCondition: (condition, formValues) => {
//     const fieldValue = formValues[condition.field];
//     if (fieldValue === undefined) return true;

//     const conditionValue = condition.value;

//     switch (condition.operator) {
//       case 'equals':
//         return String(fieldValue).toLowerCase() === String(conditionValue).toLowerCase();
//       case 'not_equals':
//         return String(fieldValue).toLowerCase() !== String(conditionValue).toLowerCase();
//       case 'greater_than':
//         return Number(fieldValue) > Number(conditionValue);
//       case 'less_than':
//         return Number(fieldValue) < Number(conditionValue);
//       case 'contains':
//         return String(fieldValue).toLowerCase().includes(String(conditionValue).toLowerCase());
//       case 'is_checked':
//         return fieldValue === true || fieldValue === 'on' || fieldValue === 'checked';
//       case 'is_not_checked':
//         return fieldValue === false || fieldValue === '';
//       default:
//         return true;
//     }
//   },

//   shouldShowElement: (element, formValues, allElements) => {
//     const conditions = element.conditional || [];

//     if (conditions.length === 0) return { visible: true, enabled: true };

//     const allConditionsMet = conditions.every(condition =>
//       ConditionEngine.evaluateCondition(condition, formValues)
//     );

//     let visible = true;
//     let enabled = true;

//     conditions.forEach(condition => {
//       if (allConditionsMet) {
//         if (condition.action === 'hide') visible = false;
//         if (condition.action === 'disable') enabled = false;
//       } else {
//         if (condition.action === 'show') visible = false;
//         if (condition.action === 'enable') enabled = false;
//       }
//     });

//     return { visible, enabled };
//   },
// };

// /* -------------------------------------------------------------
//    Sortable Field (individual form element)
//    ------------------------------------------------------------- */
// const MockField = ({
//   elem,
//   isSelected,
//   onDoubleClick,
//   formValues,
//   allElements,
//   onFieldChange,
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: elem.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const { visible, enabled } = ConditionEngine.shouldShowElement(elem, formValues, allElements);
//   if (!visible) return null;

//   const handleChange = (e) => {
//     const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
//     onFieldChange(elem.id, value);
//   };

//   return (
//     <Paper
//       ref={setNodeRef}
//       style={style}
//       elevation={isSelected ? 8 : 2}
//       onDoubleClick={() => onDoubleClick(elem.id)}
//       className={`p-4 mb-4 rounded-lg border-2 transition-all ${
//         !enabled
//           ? 'opacity-50 bg-gray-50 cursor-not-allowed'
//           : isSelected
//             ? 'border-purple-600 bg-purple-50 shadow-lg'
//             : 'border-gray-300 bg-white'
//       }`}
//     >
//       <Box display="flex" alignItems="flex-start" gap={2}>
//         <div style={{ flexGrow: 1 }}>
//           <Typography variant="subtitle1" className="font-medium">
//             {elem.label} {elem.required && <span className="text-red-500">*</span>}
//           </Typography>

//           {elem.type === 'Checkbox' ? (
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={!!formValues[elem.id]}
//                   onChange={handleChange}
//                   disabled={!enabled}
//                 />
//               }
//               label={elem.helperText || ''}
//             />
//           ) : (
//             <TextField
//               fullWidth
//               size="small"
//               variant="outlined"
//               placeholder={elem.placeholder || ''}
//               value={formValues[elem.id] || elem.defaultValue || ''}
//               onChange={handleChange}
//               disabled={!enabled}
//               className="mt-2"
//               InputProps={{
//                 readOnly: elem.readOnly || false,
//               }}
//             />
//           )}

//           {elem.helperText && elem.type !== 'Checkbox' && (
//             <Typography variant="caption" color="text.secondary" className="mt-1 block">
//               {elem.helperText}
//             </Typography>
//           )}
//         </div>

//         <div
//           {...attributes}
//           {...listeners}
//           onClick={(e) => e.stopPropagation()}
//           onDoubleClick={(e) => e.stopPropagation()}
//           style={{ cursor: 'grab', flexShrink: 0 }}
//         >
//           <DragHandleIcon className="mt-1 text-gray-400 hover:text-gray-700" />
//         </div>
//       </Box>
//     </Paper>
//   );
// };

// /* -------------------------------------------------------------
//    Sortable Group
//    ------------------------------------------------------------- */
// const MockGroup = ({
//   group,
//   selectedElementId,
//   onDoubleClick,
//   onReorderFields,
//   formValues,
//   allElements,
//   onFieldChange,
// }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: group.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const { visible, enabled } = ConditionEngine.shouldShowElement(group, formValues, allElements);
//   if (!visible) return null;

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
//   );

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (active.id !== over?.id) {
//       const oldIdx = group.fields.findIndex(f => f.id === active.id);
//       const newIdx = group.fields.findIndex(f => f.id === over.id);
//       const newFields = arrayMove(group.fields, oldIdx, newIdx);
//       onReorderFields(group.id, newFields);
//     }
//   };

//   const isSelected = selectedElementId === group.id;

//   return (
//     <Paper
//       ref={setNodeRef}
//       style={style}
//       elevation={isSelected ? 10 : 3}
//       className={`p-6 mb-8 rounded-xl border-2 transition-all ${
//         !enabled
//           ? 'opacity-50 bg-gray-50'
//           : isSelected
//             ? 'border-purple-600 bg-purple-50 shadow-xl'
//             : 'border-gray-300 bg-white'
//       }`}
//     >
//       {/* Group Header */}
//       <Box
//         display="flex"
//         alignItems="center"
//         justifyContent="space-between"
//         mb={3}
//         onDoubleClick={() => onDoubleClick(group.id)}
//       >
//         <Typography variant="h6" className="font-bold text-purple-800">
//           {group.name} (Group)
//         </Typography>

//         <div
//           {...attributes}
//           {...listeners}
//           onClick={(e) => e.stopPropagation()}
//           onDoubleClick={(e) => e.stopPropagation()}
//           style={{ cursor: 'grab', flexShrink: 0 }}
//         >
//           <DragHandleIcon className="text-gray-500 hover:text-gray-700" />
//         </div>
//       </Box>

//       <Divider className="mb-5" />

//       <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//         <SortableContext items={group.fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
//           {group.fields.map(field => (
//             <MockField
//               key={field.id}
//               elem={field}
//               isSelected={selectedElementId === field.id}
//               onDoubleClick={onDoubleClick}
//               formValues={formValues}
//               allElements={allElements}
//               onFieldChange={onFieldChange}
//             />

//           ))}
//         </SortableContext>
//       </DndContext>
//     </Paper>
//   );
// };

// /* -------------------------------------------------------------
//    Main Canvas Component
//    ------------------------------------------------------------- */
// const FormCanvas = ({
//   formElements = [],
//   selectedElementId,
//   onElementClick,   // called with element.id on double-click
//   onReorder,        // called with new array after top-level reorder
// }) => {
//   const [formValues, setFormValues] = useState({});

//   const handleFieldChange = (fieldId, value) => {
//     setFormValues(prev => ({ ...prev, [fieldId]: value }));
//   };

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
//   );

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (active.id !== over?.id) {
//       const oldIndex = formElements.findIndex(el => el.id === active.id);
//       const newIndex = formElements.findIndex(el => el.id === over.id);
//       onReorder(arrayMove(formElements, oldIndex, newIndex));
//     }
//   };

//   const handleReorderFields = (groupId, newFields) => {
//     const newElements = formElements.map(el =>
//       el.id === groupId ? { ...el, fields: newFields } : el
//     );
//     onReorder(newElements);
//   };

//   // Flatten all elements (groups + their fields) for condition evaluation
//   const allElements = formElements.reduce((acc, el) => {
//     if (el.type === 'group') {
//       return [...acc, el, ...el.fields];
//     }
//     return [...acc, el];
//   }, []);

//   return (
//     <Box className="max-w-4xl mx-auto py-10">
//       <Typography variant="h5" className="font-bold text-purple-900 mb-8 text-center">
//         Form Builder – Live Preview
//       </Typography>

//       <Box className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-10 min-h-96 shadow-inner">
//         {formElements.length === 0 ? (
//           <Typography color="text.secondary" align="center">
//             Drag elements here to start building your form
//           </Typography>
//         ) : (
//           <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//             <SortableContext items={formElements.map(el => el.id)} strategy={verticalListSortingStrategy}>
//               {formElements.map(elem => (
//                 <div key={elem.id}>
//                   {elem.type === 'group' ? (
//                     <MockGroup
//                       group={elem}
//                       selectedElementId={selectedElementId}
//                       onDoubleClick={onElementClick}
//                       onReorderFields={handleReorderFields}
//                       formValues={formValues}
//                       allElements={allElements}
//                       onFieldChange={handleFieldChange}
//                     />
//                   ) : (
//                     <MockField
//                       elem={elem}
//                       isSelected={selectedElementId === elem.id}
//                       onDoubleClick={onElementClick}
//                       formValues={formValues}
//                       allElements={allElements}
//                       onFieldChange={handleFieldChange}
//                     />
//                   )}
//                 </div>
//               ))}
//             </SortableContext>
//           </DndContext>
//         )}
//       </Box>
//     </Box>
//   );
// };


// export default FormCanvas


import React from "react";
import { Box, Typography } from "@mui/material";
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { MockField } from "./MockField";
import { MockGroup } from "./MockGroup";
import { useFormValues } from "../../hooks/useFormValues";
import { closestCenter } from "@dnd-kit/core";

 const FormCanvas = ({ formElements = [], selectedElementId, onElementClick, onReorder }) => {
  const { formValues, handleFieldChange } = useFormValues({});

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = formElements.findIndex(el => el.id === active.id);
      const newIndex = formElements.findIndex(el => el.id === over.id);
      onReorder(arrayMove(formElements, oldIndex, newIndex));
    }
  };

  const handleReorderFields = (groupId, newFields) => {
    const newElements = formElements.map(el => (el.id === groupId ? { ...el, fields: newFields } : el));
    onReorder(newElements);
  };

  const allElements = formElements.reduce((acc, el) => (el.type === "group" ? [...acc, el, ...el.fields] : [...acc, el]), []);

  return (
    <Box className="max-w-4xl mx-auto py-10">
      <Typography variant="h5" className="font-bold text-purple-900 mb-8 text-center">
        Form Builder – Live Preview
      </Typography>

      <Box className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-10 min-h-96 shadow-inner">
        {formElements.length === 0 ? (
          <Typography color="text.secondary" align="center">
            Drag elements here to start building your form
          </Typography>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={formElements.map(el => el.id)} strategy={verticalListSortingStrategy}>
              {formElements.map(elem =>
                elem.type === "group" ? (
                  <MockGroup
                    key={elem.id}
                    group={elem}
                    selectedElementId={selectedElementId}
                    onDoubleClick={onElementClick}
                    onReorderFields={handleReorderFields}
                    formValues={formValues}
                    allElements={allElements}
                    onFieldChange={handleFieldChange}
                  />
                ) : (
                  <MockField
                    key={elem.id}
                    elem={elem}
                    isSelected={selectedElementId === elem.id}
                    onDoubleClick={onElementClick}
                    formValues={formValues}
                    allElements={allElements}
                    onFieldChange={handleFieldChange}
                  />
                )
              )}
            </SortableContext>
          </DndContext>
        )}
      </Box>
    </Box>
  );
};

export default FormCanvas;