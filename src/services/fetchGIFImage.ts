import axios from "axios";
import { GifType } from "../utils/GIF";

export async function fetchGifTrending(offset?: number) {
  const url = 'https://api.giphy.com/v1/gifs'

  try {
    const response = await axios.get(`${url}/trending?api_key=3q5pxzLsape8AUyfllbZqHp7mTar7osz&limit=25&offset=${offset ?? 0}&rating=g&bundle=messaging_non_clips`)
    const data = await response.data.data.map((gif: GifType) => {
      return {
        id: gif?.id,
        images: gif?.images,
        alt: gif?.alt_text,
        title: gif?.title,
        import_time: gif?.import_datetime
      }
    })
    return { status: response.status, message: "", data: data }
  } catch (e: any) {
    console.error(e.message)
    return { status: e.status, message: e.message, data: null }
  }
}