// import { ref } from 'vue'
import apiClient from '@/utils/axios'

export const useUsers = () => {
  const getUser = async () => {
    try {
      const res = await apiClient.get('./user')
      return res.data
    } catch (e) {
      console.error('유저 정보 가져오기 실패:', e)
      return null
    }
  }
  const setUserPassword = async password => {
    try {
      // 기존 user 데이터 가져오기
      const currentUser = await apiClient.get('./user')
      const currentName = currentUser.data.name
      // password만 새로운 것으로 수정
      const res = await apiClient.put('./user', {
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
