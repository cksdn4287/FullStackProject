import jwtAxios from "../util/jwtUtil"
import { API_SERVER_HOST } from "./todoApi"

const host = `${API_SERVER_HOST}/api/cart`

export const  getCartItems = async () => {

  const res = await jwtAxios.get(`${host}/items`)

  return res.data
}

export const postChangeCart = async (cartItem) => {

  // const res = await jwtAxios.post(`${host}/change` , cartItem)

  // return res.data

  try {
    const res = await jwtAxios.post(`${host}/change`, cartItem);
    return res.data;
  } catch (error) {
    console.error("장바구니 변경 실패:", error);
    throw error; // 에러를 상위로 던져서 컴포넌트에서 처리하게 함
  }
}