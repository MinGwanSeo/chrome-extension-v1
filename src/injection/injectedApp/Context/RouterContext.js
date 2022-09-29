import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMediaQuery } from "react-responsive";

const RouterContext = createContext();

export const RouterProvider = ({ children }) => {
  const [layout, setLayout] = useState(undefined);
  const [history, setHistory] = useState(["/"]);
  const [pathname, setPathname] = useState("/");
  const [videoId, setVideoId] = useState("");
  const [href, setHref] = useState(location.href);

  const isLandscape = useMediaQuery({ maxWidth: 1000 });

  window.hrefObserver = undefined;

  useEffect(() => {
    window.onmessage = (event) => {
      if (event.data === "hrefchange") {
        setHref(location.href);
      }
    };
  }, []);

  useEffect(() => {
    const query = location.search
      .substring(1)
      .split("&")
      .reduce((acc, cur) => {
        const [key, value] = cur.split("=");
        acc[key] = value;
        return acc;
      }, {});
    const newVideoId = query.v;
    setVideoId(newVideoId);
    clear();
  }, [href]);

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

  const clear = useCallback(() => {
    setHistory(["/"]);
    setPathname("/");
  }, [setHistory, setPathname]);

  const value = useMemo(
    () => ({ layout, pathname, push, back, history, clear, videoId }),
    [layout, pathname, push, back, history, clear, videoId]
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
