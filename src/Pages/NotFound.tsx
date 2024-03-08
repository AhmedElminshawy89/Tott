import { Image } from "@chakra-ui/react";
import notFound from "../assets/Images/error-6482984_1280.png";

const NotFound = () => {
  return (
    <div className="flex items-center justify-around flex-wrap p-4 gap-4 flex-row-reverse">
      <Image src={notFound} w={600} />
      <div>
        <h1 className=" sm:text-9xl text-6xl font-extrabold text-main-400 mb-10">
          Oops!
        </h1>
        <p className="text-gray-500 text-4xl">
          The page you are looking <br />
          for can`t be found
        </p>
        <button className="px-8 py-2  rounded-xl mt-8 text-xl bg-main-400 hover:bg-transparent hover:border-main-400 border duration-300">
          Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
