export const isElementVisible = (element, values = {}) => {
  if (!element.conditional || element.conditional.length === 0) return true;

  const allRulesPass = element.conditional.every((rule) => {
    const trigger = values[rule.fieldId];
    const expected = rule.value;

    switch (rule.operator) {
      case "equals":
        return String(trigger) === String(expected);
      case "not_equals":
        return String(trigger) !== String(expected);
      case "contains":
        return String(trigger || "")
          .toLowerCase()
          .includes(String(expected).toLowerCase());
      case "greater_than":
        return Number(trigger) > Number(expected);
      case "less_than":
        return Number(trigger) < Number(expected);
      case "is_checked":
        return trigger === true;
      case "is_not_checked":
        return trigger === false;
      default:
        return true;
    }
  });

  const hasHideRule = element.conditional.some((r) => r.action === "hide");
  return hasHideRule ? !allRulesPass : allRulesPass;
};

export const isElementDisabled = (element, values = {}) => {
  if (!element.conditional || element.conditional.length === 0)
    return !!element.disabled;

  const shouldDisable = element.conditional.some((rule) => {
    if (rule.action !== "disable" && rule.action !== "enable") return false;

    const trigger = values[rule.fieldId];
    const expected = rule.value;

    let cond = true;
    switch (rule.operator) {
      case "equals":
        cond = String(trigger) === String(expected);
        break;
      case "not_equals":
        cond = String(trigger) !== String(expected);
        break;
      case "contains":
        cond = String(trigger || "")
          .toLowerCase()
          .includes(String(expected).toLowerCase());
        break;
      case "greater_than":
        cond = Number(trigger) > Number(expected);
        break;
      case "less_than":
        cond = Number(trigger) < Number(expected);
        break;
      case "is_checked":
        cond = trigger === true;
        break;
      case "is_not_checked":
        cond = trigger === false;
        break;
      default:
        cond = true;
    }

    return cond && rule.action === "disable";
  });

  return element.disabled || shouldDisable;
};
