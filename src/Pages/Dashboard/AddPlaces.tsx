/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Select,
  useColorModeValue,
  FormHelperText,
} from "@chakra-ui/react";
import { CgClose } from "react-icons/cg";
import { FiUploadCloud } from "react-icons/fi";
import { IPlaceData } from "../../Interface";

const AddPlaces = () => {
  const [placeData, setPlaceData] = useState<IPlaceData>({
    placeName: "",
    cityName: "",
    categoryName: "",
    location: "",
    initRate: "",
    description: "",
    Image: null,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSelectChange = (
    selectedOption: { label: string; value: string },
    type: string
  ) => {
    setPlaceData((prevCourseData) => ({
      ...prevCourseData,
      [type]: selectedOption.value,
    }));
  };

  const onChangeHandlerImg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPlaceData((prevCourseData) => ({
        ...prevCourseData,
        Image: file,
      }));
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlaceData((prevCourseData) => ({
      ...prevCourseData,
      [name]: value,
    }));
  };
  const onChangeHandlerTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPlaceData((prevCourseData) => ({
      ...prevCourseData,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!placeData.placeName.trim()) {
      newErrors.placeName = "Place name is required";
    }
    if (!placeData.cityName.trim()) {
      newErrors.cityName = "City name is required";
    }
    if (!placeData.categoryName.trim()) {
      newErrors.categoryName = "Category name is required";
    }
    if (!placeData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!placeData.location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!placeData.initRate.trim()) {
      newErrors.initRate = "Rate is required";
    }
    if (!placeData.Image) {
      newErrors.Image = "Image is required";
    }

    if (Object.keys(newErrors).length === 0) {
      console.log(placeData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Box className="flex flex-col text-2xl p-6 rounded-xl bg-">
      <form onSubmit={handleSubmit} className="p-0 block">
        <>
          <Box className="flex gap-3 sm:flex-row flex-col">
            <FormControl mb={4}>
              <FormLabel color={'#000'}>Place name</FormLabel>
              <Input
                placeholder="Place name"
                border={"1px solid #eee"}
                color={'#000'}
                name="placeName"
                value={placeData.placeName}
                onChange={onChangeHandler}
              />
              {errors.placeName && (
                <FormHelperText
                  color={"red.500"}
                  fontSize={"18px"}
                  fontWeight={"500"}
                >
                  {errors.placeName}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel color={'#000'}>Category</FormLabel>
              <Select
                        border={"1px solid #eee"}
                        color={'#000'}
                placeholder="Select Category"
                value={placeData.categoryName}
                onChange={(e) =>
                  handleSelectChange(
                    { label: e.target.value, value: e.target.value },
                    "categoryName"
                  )
                }
              >
                <option value="City">City</option>
                <option value="Resturant">Resturant</option>
                <option value="Hotels">Hotels</option>
              </Select>
              {errors.categoryName && (
                <FormHelperText
                  color={"red.500"}
                  fontSize={"18px"}
                  fontWeight={"500"}
                >
                  {errors.categoryName}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel color={'#000'}>City Name</FormLabel>
              <Select
                placeholder="Select City"
                border={"1px solid #eee"}
                color={'#000'}
                value={placeData.cityName}
                onChange={(e) =>
                  handleSelectChange(
                    { label: e.target.value, value: e.target.value },
                    "cityName"
                  )
                }
              >
                <option value="Alex">Alex</option>
                <option value="Cairo">Cairo</option>
                <option value="Giza">Giza</option>
              </Select>
              {errors.cityName && (
                <FormHelperText
                  color={"red.500"}
                  fontSize={"18px"}
                  fontWeight={"500"}
                >
                  {errors.cityName}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box className="flex gap-3 sm:flex-row flex-col">
            <FormControl mb={4}>
              <FormLabel color={'#000'}>Location</FormLabel>
              <Input
                placeholder="Location"
                border={"1px solid #eee"}
                color={'#000'}
                name="location"
                value={placeData.location}
                onChange={onChangeHandler}
              />
              {errors.location && (
                <FormHelperText
                  color={"red.500"}
                  fontSize={"18px"}
                  fontWeight={"500"}
                >
                  {errors.location}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl mb={4}>
              <FormLabel color={'#000'}>Rate</FormLabel>
              <Select
                placeholder="Select Rate"
                border={"1px solid #eee"}
                color={'#000'}                value={placeData.initRate}
                onChange={(e) =>
                  handleSelectChange(
                    { label: e.target.value, value: e.target.value },
                    "initRate"
                  )
                }
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Select>
              {errors.cityName && (
                <FormHelperText
                  color={"red.500"}
                  fontSize={"18px"}
                  fontWeight={"500"}
                >
                  {errors.cityName}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <FormControl mb={4}>
            <FormLabel color={'#000'}>Description</FormLabel>
            <Textarea
              resize={"none"}
              height={"100px"}
              placeholder="Description"
              border={"1px solid #eee"}
              color={'#000'}              name="description"
              value={placeData.description}
              onChange={onChangeHandlerTextarea}
            />
            {errors.description && (
              <FormHelperText
                color={"red.500"}
                fontSize={"18px"}
                fontWeight={"500"}
              >
                {errors.description}
              </FormHelperText>
            )}
          </FormControl>
          <FormLabel color={'#000'}>Image</FormLabel>
          <div
          className="w-[100%] bg-transparent text-center  rounded-lg 
        flex flex-col justify-center items-center border-2 border-dotted border-[#eee]"
        >
          {selectedImage ? (
            <div className="relative  py-5">
              <img
                className="w-[100%] h-[160px]"
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
              />
              <p
                onClick={() => setSelectedImage(null)}
                className="cursor-pointer w-[25px] h-[25px] absolute top-2 -right-4 w-25 h-25 bg-[#000] text-white rounded-bl-xl rounded-tr-xl flex justify-center items-center"
              >
                <CgClose />
              </p>
            </div>
          ) : (
            <>
              <FormControl>
                <Input
                  height="423%"
                  opacity={0}
                  type="file"
                  className="v"
                  placeholder="photo"
                  name="Image"
                  onChange={onChangeHandlerImg}
                  bg={useColorModeValue("transparent", "transparent")}
                  autoComplete="off"
                />
              </FormControl>
              <p className="text-2xl font-medium text-black">Upload Image</p>
              <em className=" text-gray-500">
                (Upload only jpg, jpeg, and png images, please)
              </em>
              <FiUploadCloud className="mb-8 mt-4 text-2xl text-black" />
            </>
          )}
        </div>
          <FormControl>
            {errors.Image && (
              <FormHelperText
                color={"red.500"}
                fontSize={"18px"}
                fontWeight={"500"}
              >
                {errors.Image}
              </FormHelperText>
            )}
          </FormControl>
        </>
        <Box className="flex justify-end mt-4">
          <button
            type="submit"
            className="text-white bg-black px-4  py-2 rounded-lg duration-300  text-xl"
          >
            Add Place
          </button>
        </Box>
      </form>
    </Box>
  );
};

export default AddPlaces;
