import { LeaveReviewPage } from "./LeaveReviewPage";
import { useEntityData } from "@/hooks/useEntityData";
import { Loading } from "@/components/feedback/Loading";
import { useUI } from "@/contexts/UIContext";
;

export const EditReviewPage = () => {

  const {initialData, error} = useEntityData();
  const { isLoading } = useUI()
  
    if (isLoading) {
      return (
        <div className="h-[20rem] md:h-[35rem]">
          <Loading />
        </div>
      );
  }

  if (!initialData) return

  return <LeaveReviewPage initialData={initialData} getReviewError={error} />;
};
