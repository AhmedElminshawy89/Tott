import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      window.scrollTo(0, 0);
    };
    document.addEventListener("mousedown", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleScroll);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
