import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
const AccordingReport = () => {
  return (
    <Accordion allowToggle>
      <AccordionItem pt={3} className="according">
        <h2>
          <AccordionButton _expanded={{ bg: "#CA933F", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              Section 1 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <AccordionPanel
            pb={4}
            className="accordingPannel"
            style={{ overflow: "visible" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </motion.div>
      </AccordionItem>
      <AccordionItem pt={3} className="according">
        <h2>
          <AccordionButton _expanded={{ bg: "#CA933F", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              Section 1 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <AccordionPanel
            pb={4}
            className="accordingPannel"
            style={{ overflow: "visible" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </motion.div>
      </AccordionItem>
      <AccordionItem pt={3} className="according">
        <h2>
          <AccordionButton _expanded={{ bg: "#CA933F", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              Section 1 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <AccordionPanel
            pb={4}
            className="accordingPannel"
            style={{ overflow: "visible" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </motion.div>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordingReport;
