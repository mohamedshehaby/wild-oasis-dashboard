import { useEffect, useRef } from "react";

export function useOutsideClick(callback, listenCapture = true) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("click", handleClick, listenCapture);

    return () => {
      document.removeEventListener("click", handleClick, listenCapture);
    };
  }, [callback, listenCapture]);

  return ref;
}

export function useInsideClick(callback, listenCapture = true) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("click", handleClick, listenCapture);

    return () => {
      document.removeEventListener("click", handleClick, listenCapture);
    };
  }, [callback, listenCapture]);

  return ref;
}
