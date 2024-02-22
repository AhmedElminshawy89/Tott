/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useColorModeValue } from "@chakra-ui/react";
import { DateRange } from "react-day-picker";
import CalendarTrip from "./CalendarTrip";
import { handleNextStepProps } from "../../../Interface";
import { months, tabsTripPlane } from "../../../assets/data";

const StepB: React.FC<handleNextStepProps> = ({
  handlePrevStep,
  handleNextStep,
}) => {
  const [activeTabTrip, setActiveTabTrip] = useState(tabsTripPlane[0].id);
  const [range, setRange] = useState<DateRange>();
  const SelectedMonth = range?.from?.getMonth();

  const handleIncrease = (): void => {
    if (range && range.from && range.to) {
      const newFromDate = new Date(range.from);
      const newToDate = new Date(range.to);

      if (
        newToDate.getTime() - newFromDate.getTime() <
        6 * 24 * 60 * 60 * 1000
      ) {
        newToDate.setDate(newToDate.getDate() + 1);
        setRange({ from: newFromDate, to: newToDate });
      }
    }
  };
  const handleDecrease = (): void => {
    if (range && range.from && range.to) {
      const newFromDate = new Date(range.from);
      const newToDate = new Date(range.to);

      if (
        newToDate.getTime() - newFromDate.getTime() >
        0 * 24 * 60 * 60 * 1000
      ) {
        newToDate.setDate(newToDate.getDate() - 1);
        setRange({ from: newFromDate, to: newToDate });
      }
    }
  };
  const calculateDaysDifference = (): React.ReactNode => {
    if (range?.from && range?.to) {
      const differenceInMilliseconds =
        range.to.getTime() - range.from.getTime();
      const differenceInDays = differenceInMilliseconds / (24 * 60 * 60 * 1000);
      return Math.abs(Math.round(differenceInDays) + 1);
    }
    return 0;
  };
  const handleSendValue = (): void => {
    const count = calculateDaysDifference()?.toString() ?? "";
    const startDate = range?.from?.toLocaleDateString("en-GB") ?? "";
    const endDate = range?.to?.toLocaleDateString("en-GB") ?? "";
    localStorage.setItem("count", count);
    localStorage.setItem("StartDate", startDate);
    localStorage.setItem("EndDate", endDate);
  };
  const handleMonthClick = (clickedMonthIndex: number): void => {
    if (range && range.from) {
      if (
        range.from.getMonth() ===
        (range.to?.getMonth() ?? range.from.getMonth())
      ) {
        const newFromDate = new Date(
          range.from.getFullYear(),
          clickedMonthIndex,
          range.from.getDate()
        );
        const daysDiff =
          (range.to?.getDate() ?? range.from.getDate()) - range.from.getDate();
        const newToDate = new Date(
          newFromDate.getFullYear(),
          newFromDate.getMonth(),
          newFromDate.getDate() + daysDiff
        );
        setRange({ from: newFromDate, to: newToDate });
      } else {
        const newFromDate = new Date(
          range.from.getFullYear(),
          clickedMonthIndex,
          range.from.getDate()
        );
        const newToDate = new Date(newFromDate);
        if (range.to) {
          const differenceInMilliseconds =
            range.to.getTime() - range.from.getTime() ?? 0;
          const differenceInDays =
            differenceInMilliseconds / (24 * 60 * 60 * 1000);
          const daysDifference = Math.abs(Math.round(differenceInDays) + 1);
          newToDate.setDate(newToDate.getDate() + daysDifference - 1);
          setRange({ from: newFromDate, to: newToDate });
        }
      }
    }
  };
  const isMonthDisabled = (index: number): boolean => {
    const currentDate = new Date();
    return index < currentDate.getMonth();
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="flex justify-center text-4xl font-bold text-main-400">
        When do you want to go?
      </h1>
      <p className="flex justify-center text-xl my-2 text-main-400">
        Choose a date range or length of stay, up to 7 days.
      </p>
      <div className="my-4 relative h- w-[600px] max-w-full px-6 py-1 mx-auto">
        <div className="flex justify-center p-1 border-2 my-5 border-solid border-main-400 rounded-full">
          {tabsTripPlane.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabTrip(tab.id)}
              className={`${
                activeTabTrip === tab.id
                  ? `${useColorModeValue("text-main-400", "text-white")}`
                  : `${useColorModeValue(
                      "hover:text-black/60",
                      "hover:text-white/60"
                    )}`
              } relative flex-1 py-0.5 text-lg font-medium transition-all overflow-hidden outline-none`}
            >
              {activeTabTrip === tab.id && (
                <motion.span
                  layoutId="bubble"
                  className={`absolute inset-0 rounded-full bg-main-400 ${useColorModeValue(
                    "mix-blend-multiply",
                    "mix-blend-lighten"
                  )}`}
                  style={{ color: "white", backgroundColor: "#CA933F" }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        {activeTabTrip === "1" && (
          <>
            <div className="relative flex justify-center mx-4 items-center">
              <CalendarTrip
                range={range as DateRange}
                setRange={setRange}
                handleMonthClick={handleMonthClick}
              />
            </div>
            <div className="my-2 flex justify-between mx-4 items-center">
              <button
                className="text-main-400 px-8 py-1 rounded-xl border-2 transition-all border-main-400 mt-5 hover:bg-main-400 hover:text-black"
                onClick={handlePrevStep}
              >
                Back
              </button>
              <button
                className="text-main-400 px-8 py-1 rounded-xl border-2 transition-all border-main-400 mt-5 hover:bg-main-400 hover:text-black"
                onClick={() => setActiveTabTrip("2")}
              >
                Next
              </button>
            </div>
          </>
        )}
        {activeTabTrip === "2" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="relative mb-11  h- w-[600px] max-w-full mx-auto">
              <div className="flex justify-between mt-5 text-xl  text-main-400">
                <p className="text-2xl">Total days</p>
                <div className="flex gap-2 items-center text-3xl">
                  <p
                    onClick={handleDecrease}
                    className={`
                       rounded-full h-7 w-7 leading-5 text-center 
                        transition-all
                        ${
                          calculateDaysDifference() === 1
                            ? "text-gray-500 border-solid border-2 border-gray-500 hover:bg-transparent hover:text-gray-500 cursor-not-allowed"
                            : "border-solid border-2 border-main-400  cursor-pointer hover:bg-main-400 hover:text-black "
                        }`}
                  >
                    -
                  </p>
                  <p>{calculateDaysDifference()}</p>
                  <p
                    onClick={handleIncrease}
                    className={`
                      rounded-full h-7 w-7 leading-5 text-center 
                       transition-all
                       ${
                         calculateDaysDifference() === 7
                           ? "text-gray-500 border-solid border-2 border-gray-500 hover:bg-transparent hover:text-gray-500 cursor-not-allowed"
                           : "border-solid border-2 border-main-400  cursor-pointer hover:bg-main-400 hover:text-black "
                       }`}
                  >
                    +
                  </p>
                </div>
              </div>
            </div>
            <h1 className="text-xl font-semibold mb-3 text-main-400">
              During what month?
            </h1>
            <div className="relative">
              <Swiper
                slidesPerView={2}
                spaceBetween={30}
                breakpoints={{
                  542: { slidesPerView: 4, spaceBetween: 20 },
                  768: { slidesPerView: 4, spaceBetween: 20 },
                  992: { slidesPerView: 5, spaceBetween: 20 },
                  1200: { slidesPerView: 7, spaceBetween: 30 },
                  1400: { slidesPerView: 7, spaceBetween: 30 },
                }}
                className="mySwiperStepB"
              >
                {months.map((month, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={`flex flex-col items-center justify-center  border-solid border-2 border-main-400
                  rounded-2xl p-6 ${
                    SelectedMonth === index ? "bg-main-400" : ""
                  }
                  ${isMonthDisabled(index) ? "hidden" : ""}`}
                      onClick={() => handleMonthClick(index)}
                    >
                      {/* <Image src={calendarIcon} w={'20px'} h={'20px'}/> */}
                      <p
                        className={`text-xl font-bold  ${
                          SelectedMonth === index
                            ? "text-black"
                            : "text-main-400 "
                        }`}
                      >
                        {month}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="my-2 flex justify-between mx-4 items-center">
              <button
                className="text-main-400 px-8 py-1 rounded-xl border-2 transition-all border-main-400 mt-5 hover:bg-main-400 hover:text-black"
                onClick={() => setActiveTabTrip("1")}
              >
                Back
              </button>
              <button
                className="text-main-400 px-8 py-1 rounded-xl border-2 transition-all border-main-400 mt-5 hover:bg-main-400 hover:text-black"
                onClick={() => {
                  handleNextStep();
                  handleSendValue();
                }}
              >
                Next
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default StepB;
