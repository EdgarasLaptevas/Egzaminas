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
import { LogInSchema } from "@/schemas/LogInSchema";
import { UIStatus } from "@/constants/UIStatus";
import { useUI } from "@/contexts/UIContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { useClearBackendErrors } from "@/hooks/useClearBackendErrors";

export const LogIn = () => {
  const form = useForm({
    resolver: zodResolver(LogInSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useClearBackendErrors({
  fields: ["username", "password"],
  form,
  clearErrorCallback: () => {
    if (errorMessage || errorStatus) {
      setErrorMessage(null);
      setErrorstatus(null);
    }
  }
});

  const [errorStatus, setErrorstatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null);
  const { Loading, Success, Error } = UIStatus;
  const { setStatus } = useUI();
  const { login } = useAuth();
  const navigate = useNavigate()

  const handleLogIn = async (data) => {
    try {
      setStatus(Loading);
      console.log(data);
      
      await login(data);
        toast.success("Welcome")
        setStatus(Success);
        form.reset()
        navigate("/home")
      }
     catch (error) {
        setErrorMessage(error.message);
        setErrorstatus(error.status)
      setStatus(Error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-l from-[#dfe9f3] to-white">
      <h1 className="text-xl font-semibold mb-5 text-sky-950 ">Login</h1>
      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(handleLogIn)}
        className=" w-80 md:w-100 flex flex-col gap-2 text-sky-950 bg-gradient-to-br from-gray-300 via-white to-gray-200 p-5 rounded-lg shadow-lg">
          <FormField
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage 
                className="text-red-500">
                  {errorMessage && errorStatus === 404 ? errorMessage : form.formState.errors.username?.message}
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
                  <Input placeholder="Password" {...field}
                  type="password" />
                </FormControl>
                <FormMessage
                className="text-red-500">
                  {errorMessage && errorStatus === 400 ? errorMessage : form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}
          className="bg-gray-200 hover:bg-blue-200">
            {form.formState.isSubmitting ? "Submiting" : "Submit"}
          </Button>
        </Form>
      </FormProvider>
      <NavLink to="/register">
          <p className="text-md hover:underline">Dont have an account? Register </p>
      </NavLink>
    </div>
  );
};
