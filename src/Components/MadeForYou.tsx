import { Box, Text } from "@chakra-ui/react";
import img from "../assets/Images/madeforyou1.png";
import img2 from "../assets/Images/madeforyou2.png";
import img3 from "../assets/Images/madeforyou3.png";
import img5 from "../assets/Images/madeforyou4.png";
import img6 from "../assets/Images/madeforyou5.png";
import img7 from "../assets/Images/madeforyou6.png";
import img4 from "../assets/Images/madeforyou7.png";
import "../Styles/MadeForYou.css";
const MadeForYou = () => {
  return (
    <Box mt={"60px"} px={"5"} mb={"60px"}>
      <Text color={"#CA933F"} fontWeight={"bold"} fontSize={"25px"} mb={"10px"}>
        Made for you
      </Text>
      <div className="gallery">
        <img className="img-madeforyou" src={img} alt="" />
        <img className="img-madeforyou" src={img2} alt="" />
        <img className="img-madeforyou" src={img3} alt="" />
        <img className="img-madeforyou" src={img4} alt="" />
        <img className="img-madeforyou" src={img5} alt="" />
        <img className="img-madeforyou" src={img6} alt="" />
        <img className="img-madeforyou" src={img7} alt="" />
      </div>
    </Box>
  );
};

export default MadeForYou;
