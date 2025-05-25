import { ChangeEvent, useState } from "react";

export function useForm<T>(initialValues: T) {
  const [formData, setFormData] = useState<T>(initialValues);

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setFormData(initialValues);
  }

  return {
    formData,
    onChange,
    resetForm,
  };
}
