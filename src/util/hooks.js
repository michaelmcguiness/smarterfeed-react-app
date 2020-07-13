import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [formData, setFormData] = useState(initialState);
  const onFinish = (values) => {
    setFormData(values);
    callback();
  };
  return { onFinish, formData };
};
