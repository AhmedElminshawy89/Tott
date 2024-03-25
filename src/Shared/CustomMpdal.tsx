import {
    // Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    // ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface ICustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

const CustomModal = ({ isOpen, onClose, title, children }: ICustomModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {children}
                </ModalBody>
                {/* <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter> */}
            </ModalContent>
        </Modal>
    );
};

export default CustomModal;
