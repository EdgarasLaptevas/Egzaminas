import { useEffect } from "react";

export const useClearBackendErrors = ({ fields = [], form, clearErrorCallback }) => {
  
  const watchedFields = form.watch(fields);

  useEffect(() => {
    clearErrorCallback();
  }, [JSON.stringify(watchedFields)]);
};
