import { ReactNode, createContext, useEffect, useState } from "react";
import { GifType } from "../utils/GIF";

type SavedContextType = {
  data: GifType[];
};

export const SavedContext = createContext<SavedContextType | null>(null);

type ContextProviderProps = {
  children: ReactNode;
};

function SavedContextProvider({ children }: ContextProviderProps) {
  const [savedList, setSavedList] = useState<GifType[]>([]);

  useEffect(() => {
    const lists = localStorage.getItem('saved-GIF');
    if (lists) {
      try {
        setSavedList(JSON.parse(lists));
      } catch (error) {
        console.error("Failed to parse saved GIFs from localStorage", error);
      }
    }
  }, []);

  return (
    <SavedContext.Provider value={{ data: savedList }}>
      {children}
    </SavedContext.Provider>
  );
}

export default SavedContextProvider;
