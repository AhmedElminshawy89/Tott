import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface IModelDash {
  size?: string;
  title: string;
  children: ReactNode;
  ButtonName: string;
  // onClick?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ModelDash = ({
  size,
  title,
  children,
  ButtonName,
  // onClick,
}: IModelDash) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button
        onClick={onOpen}
        bg={"#000"}
        color={"white"}
        _hover={{ bg: "#272626" }}
      >
        {ButtonName}
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        size={size}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bg={useColorModeValue("white", "white")}>
          <ModalHeader color={"#000"}>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} color={"#000"}>
            {children}
          </ModalBody>
          <ModalFooter>
            {/* <Button
              _hover={{ bg: "#272626" }}
              mr={3}
              color={"white"}
              bg={"#000"}
              onClick={onClick} 
            >
              Save
            </Button> */}
            {/* <Button onClick={onClose}>Cancel</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModelDash;
