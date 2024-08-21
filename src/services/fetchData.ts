import axios from "axios"

export const fetchGIF = async () => {
  try {
    const response = await axios.get('https://api.giphy.com/v1/gifs/trending?api_key=3q5pxzLsape8AUyfllbZqHp7mTar7osz&limit=25&offset=0&rating=g&bundle=messaging_non_clips')
    return { status: response.status, data: response.data }
  } catch (e: any) {
    console.log(e)
    return { status: e.status, data: null }
  }
}

export const fetchGIFById = async (id: string) => {
  try {
    // console.log(id)
    const response = await axios.get(`https://api.giphy.com/v1/gifs/${id}?api_key=3q5pxzLsape8AUyfllbZqHp7mTar7osz&rating=g`)
    // console.log(response)
    return response.data
  } catch (e: any) {
    console.log(e.message)
    return null
  }
}