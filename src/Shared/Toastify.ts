import { UseToastOptions, createStandaloneToast } from "@chakra-ui/react";
const { toast } = createStandaloneToast();

type ToastifyProps = {
  title: string;
  description: string;
  status: "info" | "warning" | "success" | "error" | "loading" | undefined;
};

export const Toastify = ({ title, description, status }: ToastifyProps) => {
  const toastOptions: UseToastOptions = {
    title: title,
    description: description,
    status: status,
    duration: 5000,
    isClosable: true,
  };

  toast(toastOptions);
};
