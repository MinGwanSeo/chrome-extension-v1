import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMediaQuery } from "react-responsive";

const RouterContext = createContext();

export const RouterProvider = ({ children }) => {
  const [layout, setLayout] = useState(undefined);
  const [history, setHistory] = useState(["/"]);
  const [pathname, setPathname] = useState("/");
  const isLandscape = useMediaQuery({ maxWidth: 1000 });

  useEffect(() => {
    if (isLandscape) {
      setLayout("landscape");
    } else {
      setLayout("portrait");
    }
  }, [isLandscape]);

  useEffect(() => {
    const cloneHistory = [...history];
    setPathname(cloneHistory.pop());
  }, [history]);

  const push = useCallback(
    (to) => {
      if (to) {
        setHistory([...history, to]);
      }
    },
    [history, setHistory]
  );

  const back = useCallback(() => {
    if (history.length > 1) {
      setHistory([...history.slice(0, -1)]);
    }
  }, [history, setHistory]);

  const value = useMemo(
    () => ({ layout, pathname, push, back, history }),
    [layout, pathname, push, back, history]
  );

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (context === undefined) {
    throw new Error(`useRouter must be used within a <RouterProvider/>`);
  }

  return context;
};
