import { GoCheckCircleFill } from "react-icons/go";
import { BiWifiOff } from "react-icons/bi";

const Disconnect = () => {
  return (
    <div className="flex flex-col justify-center items-center h-96 space-y-4">
      <BiWifiOff className="text-8xl text-main-400" />
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">No Internet Connection</h2>
        <p className="text-2xl">Try these to get back online:</p>
        <p className="flex items-center gap-2 text-xl"><GoCheckCircleFill/>Check your modem and router</p>
        <p className="flex items-center gap-2 text-xl"><GoCheckCircleFill/>Reconnect to Wi-Fi</p>
      </div>
    </div>
  );
};

export default Disconnect;
