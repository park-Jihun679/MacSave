<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUsers } from '@/stores/userStores.js'
import { useAuthStore } from '@/stores/authStores.js'

const router = useRouter()
const { getUser, setUserPassword } = useUsers()
const authStore = useAuthStore()

const isNew = ref(true)
const userPassWord = ref('')
const inputValue = ref('')

const inputRef = ref(null)
// isNew 초기 설정 확인
onMounted(async () => {
  authStore.initAuth()
  const user = await getUser()
  console.log(user)
  if (user && user.password) {
    userPassWord.value = user.password
    isNew.value = false
  } else {
    isNew.value = true
  }
})

function checkpw() {
  inputValue.value = parseInt(inputValue.value)

  if (isNew.value) {
    alert('비밀번호가 설정되었습니다')
    // db.json에 password 저장하기
    setUserPassword(inputValue.value)
    // 내역 화면 가기!

    userPassWord.value = inputValue.value
    authStore.login() // 👈 로그인 처리
    router.push('/history')
  } else {
    if (userPassWord.value === inputValue.value) {
      // 내역 가기!
      inputValue.value = ''
      authStore.login() // 👈 로그인 처리

      router.push('/history')
    } else {
      // 흔들림 효과
      const input = inputRef.value
      input.classList.add('shake')

      setTimeout(() => {
        input.classList.remove('shake')
        inputValue.value = ''
      }, 300)
    }
  }
}
</script>

<template>
  <div class="container">
    <img class="macSaveLogo" src="/public/logo.png" alt="macSave" />
    <div class="lockSet">
      <div class="title" v-if="isNew">초기 비밀번호 설정</div>
      <div class="title" v-else>비밀번호를 입력하세요.</div>
      <input
        type="password"
        class="passwordInput"
        maxlength="4"
        v-model.number.trim="inputValue"
        @keyup.enter="checkpw"
        ref="inputRef"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 헤더 높이 빼줌 */
  background-color: #fefcf7;
}

.macSaveLogo {
  width: 200px;
}

.lockSet {
  text-align: center;
  background-color: #fff9e6;
  width: 320px;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: 'Nunito', sans-serif;
}

/* 글씨 스타일 */
.title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
}

/* input 스타일 */
.passwordInput {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 80%;
  font-size: 16px;
  text-align: center;
}

/* 흔들리는 애니메이션 */
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-10px);
  }
  40%,
  80% {
    transform: translateX(10px);
  }
}
.passwordInput:focus.shake {
  color: red;
}
.shake {
  animation: shake 0.3s;
}
</style>
