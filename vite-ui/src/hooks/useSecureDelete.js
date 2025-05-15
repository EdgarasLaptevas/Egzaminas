import { toast } from "react-hot-toast";
import { verifyPassword } from "@/utils/entityHelpers";
import { deleteEntity } from "@/utils/entityHelpers";
import { useList } from "@/contexts/ListContext";
import { UIStatus } from "@/constants/UIStatus";
import { useUI } from "@/contexts/UIContext";

export const useSecureDelete = () => {
  const { setUpdate } = useList();
  const { setStatus } = useUI();
  const { Loading, Success, Error } = UIStatus;

  const secureDelete = async (entityPath, entityId) => {
    const password = prompt("Enter your password to confirm deletion:");
    if (!password) return ;

    try {
      setStatus(Loading);
      const isValid = await verifyPassword(password);
      if (!isValid) {
        toast.error("Incorrect password");
        return false
      }

      const response = await deleteEntity(entityPath, entityId);
      const { message, success } = response.data;
      if (message && success) setStatus(Success);
      setUpdate((prev) => prev + 1);
      toast.success(message);
      
    } catch (error) {
      const errorMessage = error?.response?.data?.message ?? error?.message ?? "Delete failed";
      toast.error(errorMessage);
      setStatus(Error)
    }
  };

  return secureDelete;
};
