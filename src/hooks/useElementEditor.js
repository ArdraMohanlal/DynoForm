import { useState, useEffect } from "react";

export const useElementEditor = (selectedElement, onUpdateElement, formElements = []) => {
  const [ruleDialogOpen, setRuleDialogOpen] = useState(false);
  const [editingRuleIndex, setEditingRuleIndex] = useState(-1);
  const [newRule, setNewRule] = useState({ fieldId: "", operator: "equals", value: "", action: "show" });

  useEffect(() => {
    setRuleDialogOpen(false);
    setEditingRuleIndex(-1);
    setNewRule({ fieldId: "", operator: "equals", value: "", action: "show" });
  }, [selectedElement?.id]);

  const update = (updates) => {
    if (!selectedElement) return;
    onUpdateElement(selectedElement.id, updates);
  };

  const updateValidation = (partial) => {
    if (!selectedElement) return;
    const current = selectedElement.validation || {};
    update({ validation: { ...current, ...partial } });
  };

  const availableFields = [];
  if (selectedElement && Array.isArray(formElements)) {
    const collect = (el) => {
      if (!el) return;
      if (el.id !== selectedElement.id) {
        availableFields.push({ id: el.id, label: el.label || el.name || "Untitled", type: el.type });
      }
      if (el.type === "group" && Array.isArray(el.fields)) {
        el.fields.forEach(collect);
      }
    };
    formElements.forEach(collect);
  }

  const addOrUpdateRule = () => {
    if (!selectedElement) return;
    const rules = [...(selectedElement.conditional || [])];
    const rule = { fieldId: newRule.fieldId, operator: newRule.operator, value: newRule.value, action: newRule.action };
    if (editingRuleIndex >= 0) rules[editingRuleIndex] = rule;
    else rules.push(rule);
    update({ conditional: rules });
    closeRuleDialog();
  };

  const closeRuleDialog = () => {
    setRuleDialogOpen(false);
    setEditingRuleIndex(-1);
    setNewRule({ fieldId: "", operator: "equals", value: "", action: "show" });
  };

  const editRule = (rule, idx) => {
    setNewRule({ fieldId: rule.fieldId, operator: rule.operator, value: rule.value || "", action: rule.action });
    setEditingRuleIndex(idx);
    setRuleDialogOpen(true);
  };

  const deleteRule = (index) => {
    if (!selectedElement) return;
    update({ conditional: selectedElement.conditional.filter((_, i) => i !== index) });
  };

  return {
    ruleDialogOpen,
    setRuleDialogOpen,
    editingRuleIndex,
    setEditingRuleIndex,
    newRule,
    setNewRule,
    update,
    updateValidation,
    availableFields,
    addOrUpdateRule,
    closeRuleDialog,
    editRule,
    deleteRule,
  };
};
