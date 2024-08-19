import axios from "axios"
import { useReducer } from "react"

const initialState = {
  loading: true,
  data: {},
  error: ''
}

export default function fetchReducer({ state, action }: fetchReducer) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        data: {},
        error: ""
      }
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        data: {},
        error: "something wrong"
      }
    default:
      return state
  }
}

export { initialState }

// const fetchGIF = async () => {

//   try {
//     console.log('fetch')
//     const response = await axios.get('https://api.giphy.com/v1/gifs/trending?api_key=3q5pxzLsape8AUyfllbZqHp7mTar7osz&limit=25&offset=0&rating=g&bundle=messaging_non_clips')
//     console.log(response)
//     return response.data
//   }
//   catch (e) {
//   }
// }