// EMAIL REGEX
const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());

export const validateSingleField = (field, value) => {
  const v = field.validation || {};

  // Required
  if (v.required && (value === "" || value === undefined)) {
    return v.customMessage || "This field is required";
  }

  // Text length
  if (
    ["Short Text", "Email", "Text Area"].includes(field.type) &&
    typeof value === "string"
  ) {
    if (v.minLength != null && value.length < v.minLength)
      return v.customMessage || `Minimum length is ${v.minLength}`;

    if (v.maxLength != null && value.length > v.maxLength)
      return v.customMessage || `Maximum length is ${v.maxLength}`;
  }

  // Email format
  if (field.type === "Email" && value && !validateEmail(value)) {
    return v.customMessage || "Enter a valid email address";
  }

  // Numbers
  if (field.type === "Number" && value !== "" && value !== undefined) {
    const num = Number(value);
    if (Number.isNaN(num)) return "Enter a valid number";

    if (v.min != null && num < v.min)
      return v.customMessage || `Minimum value is ${v.min}`;

    if (v.max != null && num > v.max)
      return v.customMessage || `Maximum value is ${v.max}`;
  }

  // Date
  if (field.type === "Date" && value) {
    if (v.minDate && value < v.minDate)
      return v.customMessage || `Date must be on or after ${v.minDate}`;
    if (v.maxDate && value > v.maxDate)
      return v.customMessage || `Date must be on or before ${v.maxDate}`;
  }

  // Regex
  if (v.pattern && value) {
    try {
      const regex = new RegExp(v.pattern);
      if (!regex.test(String(value)))
        return v.customMessage || "Invalid format";
    } catch {}
  }

  // Checkbox required
  if (field.type === "Checkbox" && v.required && !value) {
    return v.customMessage || "This option must be checked";
  }

  return null;
};

export const validateFormFields = (formElements, values) => {
  const errors = {};
  const allFields = [];

  formElements.forEach((el) => {
    if (el.type === "group") allFields.push(...(el.fields || []));
    else allFields.push(el);
  });

  allFields.forEach((field) => {
    const error = validateSingleField(field, values[field.id]);
    if (error) errors[field.id] = error;
  });

  return errors;
};
