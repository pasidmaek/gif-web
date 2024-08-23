import { GIFImageType } from "../utils/GIF";
import { initialSavedStateType, saveActionType } from "../utils/save";

const getInitialList = (): GIFImageType[] => {
  const savedList = localStorage.getItem('saveList');
  return savedList ? JSON.parse(savedList) : [];
};

export const initialSavedState = {
  save_list: getInitialList()
}


export default function savedReducer(state: initialSavedStateType, action: saveActionType) {
  let updatedList: GIFImageType[];

  switch (action.type) {
    case "SAVED_GIF": {
      const currentList = getInitialList();  // Read from localStorage
      updatedList = currentList.some(item => item.id === action.payload.id)
        ? currentList
        : [...currentList, action.payload];

      localStorage.setItem('saveList', JSON.stringify(updatedList));
      return { ...state, save_list: updatedList };
    }
    case "UNSAVED_GIF": {
      const currentList = getInitialList();  // Read from localStorage
      updatedList = currentList.filter(item => item.id !== action.payload.id);

      localStorage.setItem('saveList', JSON.stringify(updatedList));
      return { ...state, save_list: updatedList };
    }
    default:
      return state;
  }
}