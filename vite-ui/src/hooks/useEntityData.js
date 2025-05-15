import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { UIStatus } from "@/constants/UIStatus";
import { useUI } from "@/contexts/UIContext";
import { getEntityById } from "@/utils/entityHelpers";
import { useEntityPath } from "./usePath";

export const useEntityData = () => {

    const { entityId } = useParams();
    const [initialData, setInitialData] = useState(null);
    const [error, setError] = useState(null);

    const { Loading, Success, Error } = UIStatus;
    const { setStatus } = useUI();
   const entityPath = useEntityPath();
    
    useEffect(() => {
      const GetEntity = async () => {
        try {
          setStatus(Loading);
          const response = await getEntityById(entityPath, entityId);

          const { data, success } = response.data;
       
          if (data && success) {
            setStatus(Success);
            setInitialData(data);
          } else {
            setInitialData(null);
          }
        } catch (error) {
          
          const errorMessage =
            error.response?.data?.message ?? error.message ?? "Unknown error";
          setStatus(Error);
          setError(errorMessage);
          setInitialData(null);
        }
      };
  
     if (entityId) GetEntity();
    }, [entityId]);

    return (
        {initialData, error}
    )
}