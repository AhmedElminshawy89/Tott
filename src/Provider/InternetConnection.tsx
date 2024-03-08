import React, { useEffect, useRef, useCallback } from "react";
import { useToast, ToastId } from "@chakra-ui/react";
import { BsWifi, BsWifiOff } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { InternetConnectionProviderProps } from "../Interface";
import { NetworkMode } from "../app/feature/NetworkSlice";

const InternetConnection: React.FC<InternetConnectionProviderProps> = ({
  children,
}) => {
  const toast = useToast();
  const toastIdRef = useRef<ToastId | undefined>();
  const dispatch = useDispatch();

  const OfflineToast = useCallback(() => {
    toastIdRef.current = toast({
      title: "You're offline",
      description: "Please make sure you have an internet connection",
      status: "warning",
      duration: null,
      isClosable: true,
      icon: <BsWifiOff size={20} />,
    });
  }, [toast]);
  const OnlineToast = useCallback(() => {
    toastIdRef.current = toast({
      title: "You're online",
      description: "Internet connection has been restored",
      status: "warning",
      duration: null,
      isClosable: true,
      icon: <BsWifi size={20} />,
    });
  }, [toast]);

  const updateNetworkMode = useCallback(
    (isOffline: boolean) => {
      dispatch(NetworkMode(isOffline));
    },
    [dispatch]
  );

  const closeAllToast = useCallback(() => {
    toast.closeAll();
  }, [toast]);

  const setOnline = useCallback(() => {
    updateNetworkMode(true);
    closeAllToast();
    OnlineToast();

    setTimeout(() => {
      if (toastIdRef.current) return toast.close(toastIdRef.current);
    }, 3000);
  }, [updateNetworkMode, closeAllToast, OnlineToast, toast, toastIdRef]);

  const setOffline = useCallback(() => {
    updateNetworkMode(false);
    OfflineToast();
  }, [updateNetworkMode, OfflineToast]);

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, [setOnline, setOffline]);

  return <>{children}</>;
};

export default InternetConnection;
