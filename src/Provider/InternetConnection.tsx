import React, { useEffect, useRef, useCallback } from "react";
import { useToast, ToastId } from "@chakra-ui/react";
import { BsWifiOff } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { InternetConnectionProviderProps } from "../Interface"
import { NetworkMode } from "../app/feature/NetworkSlice";

const InternetConnection: React.FC<InternetConnectionProviderProps> = ({ children }) => {
    const toast = useToast();
    const toastIdRef = useRef<ToastId | undefined>();
    const dispatch = useDispatch();

    const addToast = useCallback(() => {
        toastIdRef.current = toast({
            title: "You're offline",
            description: "Please make sure you have an internet connection",
            status: 'warning',
            duration: null,
            isClosable: true,
            icon: <BsWifiOff size={20} />,
        });
    }, [toast]);

    const updateNetworkMode = useCallback((isOffline: boolean) => {
        dispatch(NetworkMode(isOffline));
    }, [dispatch]);

    const closeAllToast = useCallback(() => {
        toast.closeAll();
    }, [toast]);


    const setOnline = useCallback(() => {
        updateNetworkMode(true);
        closeAllToast();
    }, [updateNetworkMode, closeAllToast]);

    const setOffline = useCallback(() => {
        updateNetworkMode(false);
        addToast();
    }, [updateNetworkMode, addToast]);

    useEffect(() => {
        window.addEventListener('online', setOnline);
        window.addEventListener('offline', setOffline);

        return () => {
            window.removeEventListener('online', setOnline);
            window.removeEventListener('offline', setOffline);
        };
    }, [setOnline, setOffline]);




    return <>{children}</>;
}

export default InternetConnection;
