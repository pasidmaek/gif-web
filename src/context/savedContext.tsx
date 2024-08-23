import { ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import savedReducer, { initialSavedState } from "../reducer/savedReducer";
import { initialSavedStateType, saveActionType } from "../utils/save";

export const SavedContext = createContext<{ state: initialSavedStateType; dispatch: React.Dispatch<saveActionType> } | undefined>(undefined);

type ContextProviderProps = {
  children: ReactNode;
};

export default function SavedContextProvider({ children }: ContextProviderProps) {
  const [state, dispatch] = useReducer(savedReducer, initialSavedState);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('saveList') || '[]');
    dispatch({ type: 'INIT_LIST', payload: savedList });
  }, []);

  return (
    <SavedContext.Provider value={{ state, dispatch }}>
      {children}
    </SavedContext.Provider>
  );
}


export const useSavedList = () => {
  const context = useContext(SavedContext);
  if (context === undefined) {
    throw new Error('useSavedList must be used within a SavedListProvider');
  }
  return context;
};