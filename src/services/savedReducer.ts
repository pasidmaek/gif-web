import { GIFImageType } from "../utils/GIF";

type fetchActionType = {
  type: "SAVED_GIF" | "UNSAVED_GIF",
  payload: GIFImageType
}

type initialSavedStateType = {
  save_list: GIFImageType[]
};

const getInitialList = (): string[] => {
  const savedList = localStorage.getItem('saveList');
  return savedList ? JSON.parse(savedList) : [];
};

export const initialSavedState = {
  save_list: getInitialList()
}


export default function savedReducer(state: initialSavedStateType, action: fetchActionType) {
  switch (action.type) {
    case "SAVED_GIF":
      return { ...state, save_list: [...state.save_list, action.payload] };
    case "UNSAVED_GIF":
      return { ...state, save_list: state.save_list.filter(item => item !== action.payload) };
    default:
      return state
  }
}
