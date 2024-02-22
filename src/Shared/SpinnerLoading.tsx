import { Stack, Spinner } from "@chakra-ui/react";

const SpinnerLoading = () => {
  return (
    <Stack
      position="absolute"
      top="600%"
      left="50%"
      transform="translate(-50%, -50%)"
      align="center"
    >
      <Spinner size="xl" />
    </Stack>
  );
};

export default SpinnerLoading;
