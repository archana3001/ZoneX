import { useRef, useEffect } from "react";
export const useInterval = (callback, delay) => {
  const saveCallBack = useRef();

  useEffect(() => {
    function tick() {
      if (typeof saveCallBack?.current !== "undefined") {
        saveCallBack.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
