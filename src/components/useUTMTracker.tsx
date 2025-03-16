import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useUTMTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const utmValue = params.get("utm");

    if (utmValue) {
      const storedUTM = localStorage.getItem("utm");
      if (!storedUTM || storedUTM !== utmValue) {
        localStorage.setItem("utm", utmValue);
      }
    }
  }, [location.search]); 
};


export default useUTMTracker;
