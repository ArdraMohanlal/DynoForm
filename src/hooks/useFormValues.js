import { useState } from "react";

export const useFormValues = (initialValues = {}) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleFieldChange = (fieldId, value) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }));
  };

  return { formValues, handleFieldChange };
};
