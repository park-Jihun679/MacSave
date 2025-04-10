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

    <input
      type="password"
      class="passwordInput"
      maxlength="4"
      v-model.number.trim="inputValue"
      @keyup.enter="checkpw"
      :placeholder="
        isNew ? 'please set your password' : 'please enter your password'
      "
      ref="inputRef"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 헤더 높이 빼줌 */
  background-color: #1d2329;
}

.macSaveLogo {
  width: 350px;
  opacity: 70%;
}

/* input 스타일 */
.passwordInput {
  padding: 8px 12px;
  background-color: transparent; /* 예시: 어두운 배경 */
  color: #ccc;
  border: none;
  border-bottom: 3px solid #ffb400; /* 아래쪽 테두리만 */
  width: 300px;
  outline: none;
  padding: 5px 0;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  margin-top: 1rem;
  color: #ffb400;
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
  border-bottom: 3px solid red;
}
.shake {
  animation: shake 0.3s;
}
</style>
