import { ReactNode } from "react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

export interface UserState {
  identifier: string;
  password: string;
}
export interface UserSignUp {
  username: string;
  email: string;
  password: string;
  com_password: string;
  phone: string;
  age: string;
  gender: string;
  city: string;
  country: string;
  Media: File | null;
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
  };
  username?: string;
  jwt?: string;
  identifier?: string;
  password?: string;
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
