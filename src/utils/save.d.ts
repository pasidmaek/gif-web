export type saveActionType = {
  type: "SAVED_GIF" | "UNSAVED_GIF" | "INIT_LIST",
  payload: GIFImageType
}

export type initialSavedStateType = {
  save_list: GIFImageType[]
};
