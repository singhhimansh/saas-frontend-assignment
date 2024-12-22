import { useCallback, useEffect, useRef, useState } from "react";

export const useFetch = (url, errMsg, delayTime = 500) => {
  const [data, setData] = useState(null);
  const callMadeRef = useRef(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    let timeout;
    try {
      // setTimeout to mimic the delay in fetching data to display loader
      const response = await new Promise((resolve, reject) => {
        timeout = setTimeout(async () => {
          try {
            const res = await fetch(url);
            resolve(res);
          } catch (e) {
            reject(e);
          }
        }, delayTime);
      });

      const data = await response.json();
      setData(data);
    } catch (error) {
      callMadeRef.current = false;
      console.error("Error in fetching data: ", error);
      setError(
        error?.message ||
          errMsg ||
          "Unable to fetch data at the moment. Please try again later."
      );
    } finally {
      timeout && clearTimeout(timeout);
      setIsFetching(false);
    }
  }, [url, errMsg, delayTime]);

  useEffect(() => {
    if (!callMadeRef.current) {
      callMadeRef.current = true;
      fetchData();
    }
  }, []);
  return { data, isFetching, error };
};
