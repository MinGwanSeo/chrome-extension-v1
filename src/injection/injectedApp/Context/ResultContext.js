import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [imageData, setImageData] = useState(undefined);

  const cachingImage = useCallback(
    (newImageData) => {
      setImageData(newImageData);
    },
    [setImageData]
  );

  const value = useMemo(
    () => ({ imageData, cachingImage }),
    [imageData, cachingImage]
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
