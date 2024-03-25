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
  Image
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface IModelDash {
  size?: string;
  title: string;
  children: ReactNode;
  ButtonName?: string;
  image?: string; // Image URL
  onClose?:()=>void
}

const ModelDash = ({
  size,
  title,
  children,
  ButtonName,
  image,
  onClose, 
}: IModelDash) => {
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      {ButtonName && <Button
        onClick={onOpen}
        bg={"#000"}
        color={"white"}
        _hover={{ bg: "#272626" }}
      >
        {ButtonName}
      </Button>}
      {image && <Image src={image} alt="Button Image" onClick={onOpen} w={35} h={35} cursor={'pointer'}
        className=" absolute right-[52px] top-[120px]" />}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        size={size}
        isOpen={isOpen}
        onClose={() => {
          closeModal(); 
          onClose?.(); 
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bg={useColorModeValue("white", "white")}>
          <ModalHeader color={"#000"}>{title}</ModalHeader>
          <ModalCloseButton onClick={closeModal}/> 
          <ModalBody pb={6} color={"#000"}>
            {children}
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModelDash;

