// src/utils/createElement.js
export const createElement = (id, type) => {
  const base = { id, type, conditional: [] };
  const commonTextValidation = { required: false, minLength: null, maxLength: null, pattern: "", customMessage: "" };

  switch (type) {
    case "Short Text":
      return { ...base, label: "Short Text Field", placeholder: "Enter text...", defaultValue: "", helperText: "", validation: { ...commonTextValidation } };
    case "Email":
      return { ...base, label: "Email Address", placeholder: "name@example.com", defaultValue: "", helperText: "We'll never share your email.", validation: { ...commonTextValidation, pattern: "\\S+@\\S+\\.\\S+" } };
    case "Number":
      return { ...base, label: "Number Input", placeholder: "0", defaultValue: "", validation: { required: false, min: null, max: null, customMessage: "" } };
    case "Radio Group":
      return { ...base, label: "Choose one option", options: [{ label: "Option 1", value: "1" }, { label: "Option 2", value: "2" }], defaultValue: "", validation: { required: false, customMessage: "" } };
    case "Checkbox":
      return { ...base, label: "I agree to the terms", defaultChecked: false, helperText: "", validation: { required: false, customMessage: "" } };
    case "Date":
      return { ...base, label: "Select Date", defaultDate: "", format: "YYYY-MM-DD", validation: { required: false, minDate: null, maxDate: null, customMessage: "" } };
    case "DropDown":
      return { ...base, label: "Select an option", options: [{ label: "Option A", value: "a" }, { label: "Option B", value: "b" }], defaultValue: "", validation: { required: false, customMessage: "" } };
    case "Text Area":
      return { ...base, label: "Long Text", placeholder: "Enter your message...", defaultValue: "", rows: 4, validation: { ...commonTextValidation } };
    default:
      return { ...base, label: `${type} Field`, validation: { required: false, customMessage: "" } };
  }
};
