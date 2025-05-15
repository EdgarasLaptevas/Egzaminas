import { RegisterPostPage } from "./RegisterPostPage";
import { useEntityData } from "@/hooks/useEntityData";
import { useUI } from "@/contexts/UIContext";
import { Loading } from "@/components/feedback/Loading";

export const EditPostPage = () => {
  const { isLoading} = useUI();
  const { initialData, error } = useEntityData();

  if (isLoading) {
    return (
      <div className="h-[20rem] md:h-[35rem]">
        <Loading />
      </div>
    );
  }

  if (!initialData) return null;

  return (
    <>
      <RegisterPostPage initialData={initialData} getPostError={error} />
    </>
  );
};
