import { Box, Image, Text } from "@chakra-ui/react";
import AccordingReport from "./AccordingReport";
import iconModal from "../../assets/Images/iconModal.png";
import { useEffect, useState } from "react";

const DetailsModel = () => {
  const autoText = "Your trip to Cancun for 3 days.";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDisplayText(autoText.slice(0, index));
      setIndex((prevIndex) =>
        prevIndex >= autoText.length ? prevIndex : prevIndex + 1
      );
    }, 100);

    return () => clearInterval(intervalId);
  }, [index]);

  return (
    <Box>
      <Box className="flex gap-2 justify-center">
        <Image src={iconModal} w={"24px"} h={"24px"} />
        <Text className=" text-main-400 text-xl font-medium">
          This trip is powered by AI.
        </Text>
      </Box>
      <Box>
        <Text className="text-3xl font-bold">{displayText}</Text>
        <Text className="my-4 font-bold">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi nostrum
          harum illum id consectetur magnam nulla enim. Aliquid rem fugiat dicta
          molestias labore doloribus id error, veritatis laborum pariatur ipsam?
        </Text>
      </Box>
      <Box className="my-5">
        <Text className="font-bold text-2xl">Day 1</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
          exercitationem, odio nam sapiente blanditiis ab qui repellat
          distinctio velit at quisquam magnam ad optio fuga aliquam quam aperiam
          temporibus ullam! Consequatur exercitationem porro dolor expedita et
          sapiente perspiciatis consequuntur aliquid?
        </Text>
        <AccordingReport />
      </Box>
      <Box className="my-5">
        <Text className="font-bold text-2xl">Day 2</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
          exercitationem, odio nam sapiente blanditiis ab qui repellat
          distinctio velit at quisquam magnam ad optio fuga aliquam quam aperiam
          temporibus ullam! Consequatur exercitationem porro dolor expedita et
          sapiente perspiciatis consequuntur aliquid?
        </Text>
        <AccordingReport />
      </Box>
      <Box className="my-5">
        <Text className="font-bold text-2xl">Day 3</Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
          exercitationem, odio nam sapiente blanditiis ab qui repellat
          distinctio velit at quisquam magnam ad optio fuga aliquam quam aperiam
          temporibus ullam! Consequatur exercitationem porro dolor expedita et
          sapiente perspiciatis consequuntur aliquid?
        </Text>
        <AccordingReport />
      </Box>
    </Box>
  );
};

export default DetailsModel;
