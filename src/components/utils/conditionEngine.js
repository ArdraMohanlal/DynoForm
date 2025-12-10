export const ConditionEngine = {
  getFormValues: (elements, fieldValues) => {
    const values = {};
    elements.forEach(el => {
      if (el.type !== "group" && el.id in fieldValues) {
        values[el.id] = fieldValues[el.id];
      }
    });
    return values;
  },

  evaluateCondition: (condition, formValues) => {
    const fieldValue = formValues[condition.field];
    if (fieldValue === undefined) return true;
    const conditionValue = condition.value;

    switch (condition.operator) {
      case "equals":
        return String(fieldValue).toLowerCase() === String(conditionValue).toLowerCase();
      case "not_equals":
        return String(fieldValue).toLowerCase() !== String(conditionValue).toLowerCase();
      case "greater_than":
        return Number(fieldValue) > Number(conditionValue);
      case "less_than":
        return Number(fieldValue) < Number(conditionValue);
      case "contains":
        return String(fieldValue).toLowerCase().includes(String(conditionValue).toLowerCase());
      case "is_checked":
        return fieldValue === true || fieldValue === "on" || fieldValue === "checked";
      case "is_not_checked":
        return fieldValue === false || fieldValue === "";
      default:
        return true;
    }
  },

  shouldShowElement: (element, formValues, allElements) => {
    const conditions = element.conditional || [];
    if (conditions.length === 0) return { visible: true, enabled: true };

    const allConditionsMet = conditions.every(condition =>
      ConditionEngine.evaluateCondition(condition, formValues)
    );

    let visible = true;
    let enabled = true;

    conditions.forEach(condition => {
      if (allConditionsMet) {
        if (condition.action === "hide") visible = false;
        if (condition.action === "disable") enabled = false;
      } else {
        if (condition.action === "show") visible = false;
        if (condition.action === "enable") enabled = false;
      }
    });

    return { visible, enabled };
  },
};
