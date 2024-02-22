import { Button, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import SharedModal from "../../Shared/SharedModal";
import SimpleMultiStepForm from "./Stepper/FormMultiple";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TripPlane = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    onClose();
  }, [navigate, onClose]);

  const handleButtonClick = () => {
    onOpen();
  };

  return (
    <>
      <Button
        onClick={handleButtonClick}
        mx={1}
        height={"33px"}
        px={"38px"}
        color={useColorModeValue("white", "black")}
        variant="outline"
        border={useColorModeValue("1px solid #fff", "1px solid #000")}
        _hover={useColorModeValue(
          { bg: "#fff", color: "#CA933F", border: "1px solid #CA933F" },
          { bg: "#000", color: "#CA933F", border: "1px solid #CA933F" }
        )}
      >
        Trip
      </Button>
      <SharedModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
        <SimpleMultiStepForm />
      </SharedModal>
    </>
  );
};

export default TripPlane;
