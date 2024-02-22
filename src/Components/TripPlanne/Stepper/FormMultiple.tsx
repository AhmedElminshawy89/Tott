import { useState } from "react";
import StepA from "./StepA";
import StepB from "./StepB";
import StepC from "./StepC";

// const initialFormData = {
//   Dates:'',
//   Days:'',
//   month:'',
//   chooseOne:''
// };

// const stepsArray = ['1', '2', '3', '4'];

const SimpleMultiStepForm = () => {
  const [step, setStep] = useState("A");
  // const [formData, setFormData] = useState(initialFormData);

  const handleNextStep = () => {
    if (step === "A") setStep("B");
    else if (step === "B") setStep("C");
    else if (step === "C") setStep("D");
  };

  const handlePrevStep = () => {
    if (step === "D") setStep("C");
    else if (step === "C") setStep("B");
    else if (step === "B") setStep("A");
  };

  // const handleChangeInput = (event: { target: { name: any; checked: any; value: any; }; }) => {
  //   const fieldName = event.target.name;
  //   let fieldValue;
  //   if (fieldName === 'agreeToTerms') {
  //     fieldValue = event.target.checked;
  //   } else {
  //     fieldValue = event.target.value;
  //   }
  //   setFormData({
  //     ...formData,
  //     [fieldName]: fieldValue,
  //   });
  // };

  // // We need a method to do final operation
  // const handleSubmitFormData = () => {
  //   console.log("Done");
  //   console.log(formData);

  // };

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  // Section for render StepNumbers
  // const renderTopStepNumbers = () => {
  //   // if (!showStepNumber || step === 'Final') {
  //   //   return null;
  //   // }
  //   return (
  //     // <section className='mt-2 mb-4 flex justify-between'>
  //     //   {stepsArray.map((item) => (
  //     //     <div
  //     //       key={item}
  //     //       className={`w-8 h-8 flex justify-center items-center border-2 border-gray-600 rounded-full cursor-pointer ${
  //     //         item === step ? 'bg-blue-500' : ''
  //     //       }`}
  //     //       onClick={() => setStep(item)}
  //     //     >
  //     //       {item}
  //     //     </div>
  //     //   ))}
  //     // </section>
  //   );
  // };

  return (
    <div>
      {step === "A" ? <StepA handleNextStep={handleNextStep} /> : null}
      {step === "B" ? (
        <StepB
          // formData={formData}
          // handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
        />
      ) : null}
      {step === "C" ? (
        <StepC
          // formData={formData}
          // handleChangeInput={handleChangeInput}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          // handleSubmitFormData={handleSubmitFormData}
        />
      ) : null}
      {/* {step === 'Final' ? < /> : null} */}
    </div>
  );
};

export default SimpleMultiStepForm;
