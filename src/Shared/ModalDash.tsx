import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
  } from "@chakra-ui/react";
  import React, { ReactNode } from "react";
  interface IModelDash {
    size?: string;
    title: string;
    children: ReactNode;
    ButtonName: string;
    handleSubmit?: (
      e: React.FormEvent<HTMLFormElement>
    ) => void | React.MouseEventHandler<HTMLButtonElement>;
  }
  const ModelDash = ({
    size,
    title,
    children,
    ButtonName,
    handleSubmit,
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
          <ModalContent>
            <ModalHeader color={"#000"}>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6} color={"#000"}>
              {children}
            </ModalBody>
            <ModalFooter>
              <Button
                _hover={{ bg: "#272626" }}
                mr={3}
                type="submit"
                color={"white"}
                bg={"#000"}
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ModelDash;
  