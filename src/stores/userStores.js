// import { ref } from 'vue'
import axios from 'axios'

const API_URL = 'http://localhost:5000/user'

export const useUsers = () => {
  const getUser = async () => {
    try {
      const res = await axios.get(API_URL)
      return res.data
    } catch (e) {
      console.error('유저 정보 가져오기 실패:', e)
      return null
    }
  }
  const setUserPassword = async password => {
    try {
      // 기존 user 데이터 가져오기
      const currentUser = await axios.get(API_URL)
      const currentName = currentUser.data.name
      // password만 새로운 것으로 수정
      const res = await axios.put(API_URL, {
        name: currentName,
        password: password,
      })
      return res.data
    } catch (e) {
      console.error('비밀번호 저장 실패:', e)
      return null
    }
  }
  return {
    getUser,
    setUserPassword,
  }
}
