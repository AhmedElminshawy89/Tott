import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  // ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
} from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { SharedModalProps } from "../Interface";
import iconModal from "../assets/Images/iconModal.png";
import iconTrip from "../assets/Images/iconTrip.png";

const SharedModal: React.FC<SharedModalProps> = ({
  isOpen,
  // onOpen,
  onClose,
  title = "Powered by AI",
  children,
  // footer
}) => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Modal onClose={onClose} size="4xl" isOpen={isOpen} isCentered>
        <ModalOverlay bg={"rgba(51, 51, 51, 0.75)"} />
        <ModalContent
          className={`border-solid border-main-400 border-2 `}
          style={{ backgroundColor: colorMode == "dark" ? "black" : "white" }}
        >
          <ModalHeader
            className="flex justify-center items-center gap-2  text-main-400"
            style={{ fontSize: "22px" }}
          >
            {title}
            <Image src={iconModal} w={"20px"} h={"20px"} />
          </ModalHeader>
          <Image
            src={iconTrip}
            w={"120px"}
            h={"120px"}
            position={"absolute"}
            top={"-10px"}
            left={"0px"}
            zIndex={-1}
          />
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          {/* <ModalFooter>{footer}</ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SharedModal;
