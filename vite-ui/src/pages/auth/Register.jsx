import { FormProvider, useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/RegisterShema";
import { UIStatus } from "@/constants/UIStatus";
import { useUI } from "@/contexts/UIContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { useClearBackendErrors } from "@/hooks/useClearBackendErrors";

export const Register = () => {
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      repeatPassword: "",
    },
  });

  useClearBackendErrors({
    fields: ["username"], form,
    clearErrorCallback: () => {
        setErrorstatus(null)
        setError(null)
    }
  })

  const [errorStatus, setErrorstatus] = useState(null)
  const [error, setError] = useState(null);
  const { Loading, Success, Error } = UIStatus;
  const { setStatus } = useUI();
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegFormSubmit = async (data) => {
    try {
      const payload = { username: data.username, password: data.password };

      setStatus(Loading);
      const response = await register(payload);
      const { message, success } = response.data;

      if (message && success) {
        toast.success(message);
        setStatus(Success);
        form.reset();
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError("Unknown error");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ?? error?.message ?? "Unknown error";
        const errorStatus = error?.response?.status
      setError(errorMessage);
      setErrorstatus(errorStatus)
      setStatus(Error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-[#dfe9f3] to-white">
      <h1 className="text-xl font-semibold mb-5 text-sky-950 ">Register</h1>
      <FormProvider {...form}>
        <Form
          onSubmit={form.handleSubmit(handleRegFormSubmit)}
          className="w-80 md:w-100 flex flex-col gap-2 text-sky-950 bg-gradient-to-br from-gray-300 via-white to-gray-200 p-5 rounded-lg shadow-lg"
        >
          <FormField
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage className="text-red-500">
                  {error && errorStatus === 400 ? error : form.formState.errors.username?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>
                <FormMessage className="text-red-500">
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Repeat Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage className="text-red-500">
                  {form.formState.errors.repeatPassword?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-gray-200 hover:bg-blue-200"
          >
            {form.formState.isSubmitting ? "Submiting" : "Submit"}
          </Button>
        </Form>
      </FormProvider>
      <NavLink to="/login">
        <p className="text-md hover:underline">Already have account? Login </p>
      </NavLink>
    </div>
  );
};
