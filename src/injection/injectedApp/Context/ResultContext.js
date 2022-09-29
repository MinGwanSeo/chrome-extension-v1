import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const API_URL = "http://localhost:3000";

const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [imageData, setImageData] = useState(undefined);

  const cachingImage = useCallback(
    (newImageData) => {
      setImageData(newImageData);
    },
    [setImageData]
  );

  const uploadImage = useCallback(({ videoId, time, file }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${API_URL}/commons/upload`);
        const { url, cdn } = await response.json();
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "image/png",
          },
          body: file,
        });

        await fetch(`${API_URL}/screenshots`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vid: videoId,
            image: cdn,
            vTime: time,
          }),
        });

        resolve({
          result: "success",
        });
      } catch (error) {
        reject({
          result: "fail",
          reason: error,
        });
      }
    });
  });

  const value = useMemo(
    () => ({ imageData, cachingImage, uploadImage }),
    [imageData, cachingImage, uploadImage]
  );

  return (
    <ResultContext.Provider value={value}>{children}</ResultContext.Provider>
  );
};

export const useResult = () => {
  const context = useContext(ResultContext);
  if (context === undefined) {
    throw new Error(`useResult must be used within a <RouterProvider/>`);
  }

  return context;
};
