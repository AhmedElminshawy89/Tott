import { Box, useMediaQuery } from "@chakra-ui/react";
import DetailsModel from "../Components/TripPlanne/DetailsModel";
import Map from "../Components/TripPlanne/Map";
import Helmet from "../Shared/Helmet";

const TripsMaster = () => {
  const [isSmallerThanMd] = useMediaQuery("(max-width: 48em)");

  return (
    <Helmet title="Tripmaster">
      <Box
        className="flex justify-between"
        flexDirection={isSmallerThanMd ? "column-reverse" : "row"}
      >
        <Box className="flex-1 py-4 px-6">
          <DetailsModel />
        </Box>
        <Box className="flex-1 ">
          <Map />
        </Box>
      </Box>
    </Helmet>
  );
};
export default TripsMaster;
