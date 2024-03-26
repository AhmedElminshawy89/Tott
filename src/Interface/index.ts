import { ReactNode } from "react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

export interface UserState {
  email: string;
  password: string;
}
export interface UserSignUp {
  id?:string|number;
  fname: string;
  lname: string;
  email: string;
  password?: string;
  com_password?: string;
  phone: string;
  age: string;
  gender: string;
  city: string;
  country: string;
  photo: File | null | string | undefined;
  [key: string]: string | number | File | null | undefined;
}
export interface IUserData {
  id: string | undefined;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  age: string | number;
  gender: string;
  city: string;
  country: string;
  photo: File | null | string | undefined;
  [key: string]: string | number | File | null | undefined;
}

export interface IUserDataMap {
  data: {
    name: string;
    desc: string;
    city_id: string;
    category_name: string;
    longitude: string;
    latitude: string;
    id: string | number;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    age: string | number;
    gender: string;
    city: string;
    country: string;
    photo: File | null | string | undefined;
  };
  id: string | number;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  age: string | number;
  gender: string;
  city: string;
  country: string;
  photo: File | null | string | undefined;
}

export interface NetworkState {
  isOnline: boolean;
}
export interface InternetConnectionProviderProps {
  children: React.ReactNode;
}

export interface SharedModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  //   footer: ReactNode;
}

export interface handleNextStepProps {
  handleNextStep: () => void;
  handlePrevStep?: () => void;
}

export interface DateRangeProps {}
export interface CalendarTripProps {
  range: DateRange;
  setRange: SelectRangeEventHandler;
  handleMonthClick: (clickedMonthIndex: number) => void;
}
export interface HelmetProps {
  children: ReactNode;
  title: string;
}

export interface IWeatherIcons {
  [key: string]: string;
}

export interface UserData {
  id?: number;
  user?: {
    username?: string;
    api_token?: string;
  };
  fname?: string;
  lname?: string;
  email?: string;
  password?: string;
  com_password?: string;
  phone?: string;
  age?: string;
  gender?: string;
  city?: string;
  country?: string;
  photo?: File | null;
}
export interface AdminDataLogin {
  id?: number;
  admin?: {
    username?: string;
    api_token?: string;
  };
  fname?: string;
  lname?: string;
  email?: string;
  password?: string;
  com_password?: string;
  phone?: string;
  age?: string;
  gender?: string;
  city?: string;
  country?: string;
  photo?: File | null;
}

export interface LoginState {
  loading: boolean;
  data: UserData | null;
  error: boolean;
}

export interface CountryOption {
  label: string;
  value: string;
}
export interface ICategoryData {
  id?: string | number;
  name: string;
}
export interface ICityData {
  id?: string | undefined | number;
  city_id: string;
  desc: string;
  photo?: File | null | string | undefined;
}
export interface ICityDataUpdate {
  id: string | number;
  city_id: string;
  desc: string;
  photo: File | null | string | undefined;
  selectedImage?: File | null | string | undefined;
}
export interface IPlaceData extends ICityData {
    id: string;
    name: string;
    desc: string;
    city_id: string;
    photo: string | File | null;
    category_name: string;
    longitude: string;
    latitude: string;
    [key: string]: string | File | null;
}
export interface IPlaceDataMap {
  dataPlace: {
    id?: string | number;
    name?: string | undefined;
    desc: string;
    city_id: string;
    photo: File | null;
    category_name: string;
    longitude: string;
    latitude: string;
  };
  id?: string | number;
  name: string | undefined;
  desc: string;
  city_id: string;
  photo?: File | null;
  category_name: string;
  longitude: string;
  latitude: string;
}
export interface IAdminData {
  id?: string;
  fname: string;
  lname: string;
  phone: string;
  gender: string;
  email: string;
  password?: string | undefined;
  com_password?: string | undefined;
  photo: File | null | string | undefined;
}
export interface IAdminDataMap {
  age: unknown;
  country: string;
  id?: string;
  fname: string;
  lname: string;
  phone: string;
  gender: string;
  email: string;
  password: string;
  com_password: string;
  photo: string | undefined;
}
export interface ICategoryDataMap {
  data: {
    id?: string | number;
    name: string;
  };
  id?: string;
  name: string;
}

export interface ICityDataMap {
  data: {
    com_password?: string;
    id?: string | number;
    name: string;
    desc: string;
    photo: string | undefined | File;
  };
  id?: string | number;
  name: string;
  desc: string;
  photo: string | undefined;
}
export type FormDataa = {
  id?: string;
  fname: string;
  lname: string;
  phone: string;
  gender: string;
  email: string;
  photo?: string | File | null; 
  [key: string]: string | File | null | undefined; 
};

