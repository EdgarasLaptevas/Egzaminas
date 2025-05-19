import { useMemo, useState } from "react";
import { NavLink } from "react-router";
import "@smastrom/react-rating/style.css";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterCategorySchema } from "@/schemas/RegisterCategorySchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useEntityPath } from "@/hooks/usePath";

export const RegisterCategoryPage = ({ initialData, getCategoryError }) => {
  const form = useForm({
    resolver: zodResolver(RegisterCategorySchema),
    mode: "onChange",
    defaultValues: {
      name: initialData?.name ?? "",
      
    },
  });

  const [error, setError] = useState(getCategoryError || null);

  const isEditMode = useMemo(() => !!initialData?.categoryId, [initialData]);

  const navigate = useNavigate();
  const entityPath = useEntityPath()

  const { Loading: Fetching, Success, Error } = UIStatus;
  const { isLoading, setStatus } = useUI();

  const handleCategoryFormSubmit = async (data) => {
    try {
      let response;
      setStatus(Fetching);

      if (isEditMode) {
        response = await putEntity(
          entityPath,
          initialData?.categoryId,
          data
        );
      } else {
        response = await postEntity(entityPath, data);
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
          navigate("/home");
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
        <h1 className="responsive-text-lg font-semibold text-emerald-800 pb-3 md:pb-5">
          Register Category
        </h1>
        <FormProvider {...form}>
          <Form
            onSubmit={form.handleSubmit(handleCategoryFormSubmit)}
            className="w-full md:w-3/5 text-amber-900 "
          >
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem className="flex items-center flex-col mb-1">
                  <FormLabel>Category name</FormLabel>
                  <FormControl>
                  <Input placeholder="Enter name..." {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500">
                    {form.formState.errors.name?.message}
                  </FormMessage>
                </FormItem>
              )}
            ></FormField>
            <div className="flex justify-between items-end">
              <div className="inline-flex pt-2 gap-2">
                <Button type="submit" disabled={form.formState.isSubmitting}>
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
