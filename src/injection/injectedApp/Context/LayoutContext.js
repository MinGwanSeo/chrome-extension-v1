import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  const [layout, setLayout] = useState();
  const isLandscape = useMediaQuery({ maxWidth: 1000 });

  useEffect(() => {
    if (isLandscape) {
      setLayout("landscape");
    } else {
      setLayout("portrait");
    }
  });

  const value = useMemo(() => ({ layout }), [layout]);

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error(`useLayout must be used within a <LayoutProvider/>`);
  }

  return context;
};
