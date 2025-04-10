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
  const setUserPassword = async newPassword => {
    try {
      // 기존 user 데이터 가져오기
      const currentUser = await apiClient.get('./user')
      const currentName = currentUser.data.name
      // password만 새로운 것으로 수정
      const res = await apiClient.put('./user', {
        name: currentName,
        password: newPassword,
      })
      return res.data
    } catch (e) {
      console.error('비밀번호 저장 실패:', e)
      return null
    }
  }
  const setUserName = async newName => {
    try {
      // 기존 user 데이터 가져오기
      const currentUser = await apiClient.get('./user')
      const currentPassword = currentUser.data.password
      // password만 새로운 것으로 수정
      const res = await apiClient.put('./user', {
        name: newName,
        password: currentPassword,
      })
      return res.data
    } catch (e) {
      console.error('name 저장 실패:', e)
      return null
    }
  }
  const resetUser = async () => {
    try {
      const res = await apiClient.put('./user', {
        name: 'name',
        password: null,
      })
      return res.data
    } catch (e) {
      console.log('reset 에러', e)
      return null
    }
  }
  return {
    getUser,
    setUserPassword,
    setUserName,
    resetUser,
  }
}
