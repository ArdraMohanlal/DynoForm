import { useState, useRef } from "react";
import { validateFormFields } from "../../src/components/utils/validation";

export const useFormPreview = (formElements) => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [successOpen, setSuccessOpen] = useState(false);
  const formRef = useRef(null);

  const scrollToFirstError = () => {
    if (!formRef.current) return;
    const firstErrorEl = formRef.current.querySelector(
      '[aria-invalid="true"], .Mui-error input, .Mui-error .MuiSelect-select'
    );
    if (firstErrorEl) {
      firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      if (firstErrorEl.focus) firstErrorEl.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validateFormFields(formElements, formValues);
    setErrors(result);

    if (Object.keys(result).length > 0) {
      scrollToFirstError();
      return;
    }

    setFormValues({});
    setErrors({});
    setSuccessOpen(true);
  };

  const handleChange = (id, value) => {
    setFormValues((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  return {
    formValues,
    errors,
    successOpen,
    formRef,
    handleChange,
    handleSubmit,
    setSuccessOpen,
  };
};
