import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/ui/input";
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
import { RegisterPostSchema } from "@/schemas/RegisterPostSchema";
import { useNavigate } from "react-router";
import { Loading } from "@/components/feedback/Loading";
import { getAllEntitys, postEntity, putEntity } from "@/utils/entityHelpers";
import { useUI } from "@/contexts/UIContext";
import { UIStatus } from "@/constants/UIStatus";
import toast from "react-hot-toast";
import { useEntityPath } from "@/hooks/usePath";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const RegisterPostPage = ({ initialData = {}, getPostError }) => {
  const form = useForm({
    resolver: zodResolver(RegisterPostSchema),
    mode: "onChange",
    defaultValues: {
      title: initialData.title ?? "",
      content: initialData.content ?? "",
      price: initialData.price ?? null,
      town: initialData.town ?? "",
      posType: initialData.posType ?? "",
    },
  });

  const [postCategories, setPostCategories] = useState([]);
  const [error, setError] = useState(getPostError || null);
  const isEditMode = useMemo(() => !!initialData?.postId, [initialData]);
  const navigate = useNavigate();
  const entityPath = useEntityPath();
  const { Loading: Fetching, Success, Error } = UIStatus;
  const { isLoading, setStatus } = useUI();

  const categoriesPath = "categories";

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getAllEntitys(categoriesPath);
        const { data } = response.data;
        setPostCategories(data.categoryResponseDTOList || []);
      } catch (e) {
        console.error("Failed to fetch categories:", e);
      }
    };

    getCategories();
  }, []);

  const handlePostFormSubmit = async (data) => {
    try {
      setStatus(Fetching);
      const response = isEditMode
        ? await putEntity(entityPath, initialData.postId, data)
        : await postEntity(entityPath, data);

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
        }, 1000);
      } else {
        setStatus(Error);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ?? error.message ?? "Unknown error";
      toast.error(errorMessage);
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
    <div className="flex flex-col items-center mt-10 h-screen">
      <h2 className="responsive-text-xl p-3">Register new post</h2>
      <FormProvider {...form}>
        <Form
          onSubmit={form.handleSubmit(handlePostFormSubmit)}
          className="space-y-4 max-w-md mx-auto p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow w-full sm:w-2/3 md:w-1/2"
        >
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
      <FormField
  name="postType"
  control={form.control}
  render={({ field }) => (
    <FormItem>
      <FormLabel>Post Type</FormLabel>
      <FormControl>
        <Select
          value={field.value}
          onValueChange={field.onChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select post type" />
          </SelectTrigger>
          <SelectContent>
            {postCategories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="Write content..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price..."
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="town"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Town</FormLabel>
                <FormControl>
                  <Input placeholder="Enter town..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-end pt-2">
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
              onClick={() => form.reset()}
              disabled={form.formState.isSubmitting}
              variant="ghost"
            >
              Reset
            </Button>
          </div>
        </Form>
      </FormProvider>
    </div>
  );
};
