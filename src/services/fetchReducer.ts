import { GIFImageType } from "../utils/GIF"

type fetchActionType = {
  type: "FETCH_SUCCESS" | "FETCH_ERROR",
  payload: GIFImageType[]
}

type initialStateType = {
  loading: boolean,
  data: [] | null,
  error: string
}

export const fetchInitialState = {
  loading: true,
  data: [],
  error: ''
}

export default function fetchReducer(state: initialStateType, action: fetchActionType) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        data: [],
        error: ""
      }
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        data: null,
        error: "something wrong"
      }
    default:
      return state
  }
}
