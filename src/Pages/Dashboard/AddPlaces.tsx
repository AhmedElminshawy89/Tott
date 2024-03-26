/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { CgClose } from "react-icons/cg";
import { FiUploadCloud } from "react-icons/fi";
import { IPlaceData } from "../../Interface";
import { useFetchCategoryQuery } from "../../app/feature/CategorySlice";
import { useFetchCityQuery } from "../../app/feature/CitySlice";
import { useAddPlaceMutation } from "../../app/feature/PlaceSlice";

const AddPlaces = () => {
  const toast = useToast()
  const { data: CategoryData } = useFetchCategoryQuery("")
  const { data: CityData } = useFetchCityQuery("")
  const [addPlace, { isLoading }] = useAddPlaceMutation()
  const [placeData, setPlaceData] = useState<IPlaceData>({
    name: "",
    desc: "",
    city_id: "",
    photo: null,
    category_name: "",
    longitude: "",
    latitude: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedImage, setSelectedImage] = useState<File | null>(null);


  const onChangeHandlerImg = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPlaceData((prevCourseData) => ({
        ...prevCourseData,
        photo: file,
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!placeData.name.trim()) {
      newErrors.placeName = "Place name is required";
    }
    if (!placeData.city_id.trim()) {
      newErrors.cityName = "City name is required";
    }
    if (!placeData.category_name.trim()) {
      newErrors.categoryName = "Category name is required";
    }
    if (!placeData.desc.trim()) {
      newErrors.description = "Description is required";
    }
    if (!placeData.longitude.trim()) {
      newErrors.longitude = "Longitude is required";
    }
    if (!placeData.latitude.trim()) {
      newErrors.latitude = "Latitude is required";
    }
    if (!placeData.photo) {
      newErrors.Image = "Image is required";
    }

    if (Object.keys(newErrors).length === 0) {
      const formData = new FormData();
      formData.append("name", placeData.name);
      formData.append("desc", placeData.desc);
      formData.append("city_id", placeData.city_id);
      formData.append("category_n ame", placeData.category_name);
      formData.append("longitude", placeData.longitude);
      formData.append("latitude", placeData.latitude);
      if (placeData.photo) {
        formData.append("photo", placeData.photo);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          Image: "Image is required",
        }));
        return;
      }
      try {
        await addPlace(formData);
        setPlaceData({
          name: "",
          desc: "",
          city_id: "",
          photo: null,
          category_name: "",
          longitude: "",
          latitude: "",
        })
        toast({
          title: "Place Added",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
      } catch (error) {
        console.error("Error adding place:", error);
      }
    } else {
      setErrors(newErrors);
    }
  };
  return (
    <>
      <h1 >
        <span className="text-black font-extrabold text-4xl font-sans">Create Place</span><br />
        <span className="text-xl text-gray-600">Create a New Place</span>
      </h1>
      <Box className="flex flex-col text-2xl pt-6 rounded-xl bg-">
        <form onSubmit={handleSubmit} className="p-0 block">
          <>
            <Box className="flex gap-3 sm:flex-row flex-col">
              <FormControl mb={4}>
                <FormLabel color={'#000'}>Place name</FormLabel>
                <Input
                  placeholder="Place name"
                  border={"1px solid #eee"}
                  color={'#000'}
                  name="name"
                  value={placeData.name}
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
                  value={placeData.category_name}
                  onChange={(e) => setPlaceData((prevData) => ({
                    ...prevData,
                    category_name: e.target.value
                  }))}
                >
                  {CategoryData && CategoryData.Categories && CategoryData.Categories.data.map((data: { name: string }, i: number) => (
                    <option key={i} value={data.name}>
                      {data.name}
                    </option>
                  ))}
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
                  value={placeData.city_id}
                  onChange={(e) => setPlaceData((prevData) => ({
                    ...prevData,
                    city_id: e.target.value
                  }))}
                >
                  {CityData && CityData.Cities && CityData.Cities.data.map((data: { id: string, name: string }, i: number) => (
                    <option key={i} value={data.id}>{data.name}</option>
                  ))}
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
                <FormLabel color={'#000'}>Longitude</FormLabel>
                <Input
                  placeholder="Location"
                  border={"1px solid #eee"}
                  color={'#000'}
                  name="longitude"
                  value={placeData.longitude}
                  onChange={onChangeHandler}
                />
                {errors.longitude && (
                  <FormHelperText
                    color={"red.500"}
                    fontSize={"18px"}
                    fontWeight={"500"}
                  >
                    {errors.longitude}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel color={'#000'}>Latitude</FormLabel>
                <Input
                  placeholder="Location"
                  border={"1px solid #eee"}
                  color={'#000'}
                  name="latitude"
                  value={placeData.latitude}
                  onChange={onChangeHandler}
                />
                {errors.latitude && (
                  <FormHelperText
                    color={"red.500"}
                    fontSize={"18px"}
                    fontWeight={"500"}
                  >
                    {errors.latitude}
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
                color={'#000'}
                name="desc"
                value={placeData.desc}
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
              {isLoading ? (
                <>
                  Add Place <Spinner w={4} h={4} ml={2} />
                </>
              ) : (
                "Add Place"
              )}

            </button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddPlaces;
