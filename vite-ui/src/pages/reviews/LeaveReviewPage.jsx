import { useMemo, useState } from "react";
import { NavLink } from "react-router";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeaveReviewSchema } from "@/schemas/LeaveReviewSchema";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useUI } from "@/contexts/UIContext";
import { UIStatus } from "@/constants/UIStatus";
import { postEntity, putEntity } from "@/utils/entityHelpers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Loading } from "@/components/feedback/Loading";
import { useParams } from "react-router";

export const LeaveReviewPage = ({ initialData, getReviewError }) => {
  const form = useForm({
    resolver: zodResolver(LeaveReviewSchema),
    mode: "onChange",
    defaultValues: {
      rating: initialData?.rating ?? undefined,
      comment: initialData?.comment ?? "",
    },
  });

  const [error, setError] = useState(getReviewError || null);
 
  const isEditMode = useMemo(() => !!initialData?.reviewId, [initialData]);

  const navigate = useNavigate();
  const { entityId } = useParams()
  const entityPath = "reviews"
  
  const { Loading: Fetching, Success, Error } = UIStatus;
  const { isLoading, setStatus } = useUI();

  const handleReviewFormSubmit = async (data) => {
    try {
      let response;
      setStatus(Fetching);

      const postPayload = {
        postId: Number(entityId),
        rating: data.rating,
        comment: data.comment
      }

      const editPayload = {
        postId: initialData?.postId,
        rating: data.rating,
        comment: data.comment
      }

      if (isEditMode) {
        response = await putEntity(entityPath, initialData?.reviewId, editPayload);
      } else {
        response = await postEntity(entityPath, postPayload);
      }

      const { data: result, message, success } = response.data;

      if (result && success) {
        setStatus(Success);
        toast.success(message);
        if (isEditMode) {
          form.reset(result);
        } else {
          form.reset();
        }
        setTimeout(() => {
          navigate("/posts");
          return;
        }, 1000);
      } else {
        setStatus(Error);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ?? error.message ?? "Unknown error";
      form.reset();
      setStatus(Error);
      setError(errorMessage);
    }
  };

      if (isLoading) {
        return (
          <div className="h-[20rem] md:h-[35rem]">
            <Loading />
          </div>
        );
    }

  return (
    <div
      className="flex flex-col items-center p-5
    h-screen relative bg-gradient-to-b via-sky-transparent xs:via-sky-900 to-sky-900 xs:to-transparent"
    >
      <div className="flex items-center flex-col w-full sm:w-2/3  relative bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg border border-white/50 rounded-xl p-6 shadow-lg">
       
          <h1 className="responsive-text-lg font-semibold text-amber-800 pb-3 md:pb-5">
           Leave Your Feedback
          </h1>
          <FormProvider {...form}>
            <Form onSubmit={form.handleSubmit(handleReviewFormSubmit)} className="w-full md:w-3/5 text-amber-900 ">
              <FormField
                name="rating"
                render={({ field }) => (
                  <FormItem className="flex items-center flex-col mb-1">
                    <FormLabel>
                      Rate Post*
                    </FormLabel>
                    <FormControl>
                      <Rating
                        style={{ maxWidth: 150 }}
                        value={field.value }
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500">
                      {form.formState.errors.rating?.message}
                    </FormMessage>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a content..."
                        {...field}
                        className="border-2 h-35"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500">
                      {form.formState.errors.comment?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-end">
                <div className="inline-flex pt-2 gap-2">
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting
                      ? isEditMode
                        ? "Editing..."
                        : "Submitting..."
                      : isEditMode
                      ? "Edit"
                      : "Submit"}
                  </Button>
                  <Button
                    type="button"
                    className="text-white/90"
                    onClick={() => {
                      form.reset();
                    }}
                    disabled={form.formState.isSubmitting}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </Form>
          </FormProvider>
      </div>
    </div>
  );
};
