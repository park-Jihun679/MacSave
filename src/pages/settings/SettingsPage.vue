<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUsers } from '@/stores/userStores.js'

const userName = ref('')
const newName = ref('')
const userPassword = ref('')
const newPassword = ref('')
const editingPassword = ref(false)
const showRight = ref(false)
const editingName = ref(false)

const { getUser, setUserPassword, setUserName, resetUser } = useUsers()

function openRightBox() {
  showRight.value = true
}

const router = useRouter()

onMounted(async () => {
  const user = await getUser()
  userName.value = user.name
  userPassword.value = user.password
})

const updateName = async () => {
  userName.value = newName.value
  await setUserName(newName.value)
  editingName.value = false
  newName.value = ''
  console.log('✅ 닉네임 변경 완료 후 alert 실행됨')
  alert('닉네임이 변경되었습니다 !')
}

const updatePassword = async () => {
  userPassword.value = newPassword.value
  newPassword.value = parseInt(newPassword.value)
  await setUserPassword(newPassword.value)
  alert('비밀번호가 변경되었습니다 !') // ✅ 알림 추가
  editingPassword.value = false
  newPassword.value = ''
}

const deleteAccount = async () => {
  await resetUser()

  userName.value = 'name을 설정해주세요'
  newPassword.value = ''

  editingPassword.value = false // ?
  showRight.value = false
  console.log('csaaaaa')
  alert('회원 탈퇴가 완료되었습니다.')
  sessionStorage.removeItem('authToken')
  router.push('/lock')
}
</script>

<template>
  <h2 class="settings-title"><i class="fa-solid fa-gear"> </i> Setting</h2>
  <div class="settings-container">
    <!-- 왼쪽 박스 -->
    <div class="receipt-box left">
      <h2 class="user-name">
        {{ userName === 'name' || !userName ? 'name님,' : userName + '님,' }}
      </h2>
      <p class="day-msg">우리가 만난지 +1일째 🍔</p>

      <div class="spacer"></div>
      <hr class="divider" />
      <button @click="openRightBox">개인 정보 변경</button>
      <p class="footer-logo">MacSave 🍔</p>
    </div>

    <!-- 오른쪽 박스 -->
    <div class="receipt-box right" v-if="showRight">
      <!-- 프로필 설정 헤더 -->
      <div class="section-title">
        <span class="icon">⚙️</span>
        <span class="text">Profile</span>
      </div>
      <!-- 닉네임 -->
      <div class="field-row">
        <!-- 닉네임 보기 모드 -->
        <div class="input-line" v-if="!editingName">
          <label>• name : {{ userName }}</label>
          <button class="align-right" @click="editingName = true">변경</button>
        </div>

        <!-- 닉네임 수정 모드 -->
        <div class="input-line" v-else>
          <label>• name : </label>
          <input
            v-model.trim="newName"
            placeholder="please set your name"
            @keyup.enter="updateName"
          />
          <button class="align-right" @click="updateName">저장</button>
        </div>
      </div>
      <!-- 비밀번호 -->
      <div class="field-row">
        <div class="password-line" v-if="!editingPassword">
          <label>• password : </label>
          <span>xxxx</span>
          <button class="align-right" @click="editingPassword = true">
            변경
          </button>
        </div>

        <!-- 비밀번호 변경 모드 -->
        <div class="password-line" v-else>
          <label>• password : </label>
          <input
            v-model.number.trim="newPassword"
            placeholder="please change your password"
            maxlength="4"
            minlength="4"
            type="text"
            @keyup.enter="updatePassword"
          />
          <button class="align-right" @click="updatePassword">저장</button>
        </div>
      </div>
      <div class="spacer"></div>
      <hr class="divider" />

      <!-- 회원 탈퇴 -->
      <button class="delete-btn" @click="deleteAccount">회원 탈퇴</button>
      <p class="footer-logo">MacSave 🍔</p>
    </div>
  </div>
</template>

<style scoped>
.settings-container {
  display: flex;
  justify-content: center;
  gap: 80px;
  align-items: flex-start;
  margin-top: 32px;
  transform: translateX(-60px);
}

.receipt-box {
  width: 350px;
  height: 500px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  z-index: 0;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.15);
}

.receipt-box::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: white;
  opacity: 0.8;
  z-index: -1;
  border-radius: 8px;
}

.receipt-box.left {
  flex-shrink: 0;
  margin-right: 500px;
}

.receipt-box.right {
  width: 600px;
  height: 500px;
  position: absolute;
  top: 0;
  left: 35%;
  transform: translateX(190px);
}

.user-name {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
}

.day-msg {
  font-size: 16px;
  font-weight: 600;
}

.spacer {
  flex-grow: 1;
}

.divider {
  width: 100%;
  height: 2px;
  background-color: #999;
  margin-top: auto;
  margin-bottom: 16px;
}

button {
  margin-top: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: #ffdf91;
  box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.25);
}

.footer-logo {
  text-align: center;
  font-weight: 700;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  color: #5f5f5f;
}

.field-row {
  margin-bottom: 20px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
}

.section-title .icon {
  margin-right: 8px;
  font-size: 20px;
}

.input-line {
  display: flex;
  align-items: center;
  gap: 10px; /* 요소 간 간격 */
  font-size: 16px;
  font-weight: 600;
}

.password-line {
  display: flex;
  align-items: center;
  gap: 10px; /* 요소 간 간격 */
  font-size: 16px;
  font-weight: 600;
}

input {
  margin-top: 6px;
  padding: 8px;
  width: 48%;
  box-sizing: border-box;
}

.delete-btn {
  background-color: #ffdf91;
  margin-top: 8px;
}
.align-right {
  margin-left: auto;
  background-color: #ffb400;
}
.settings-title {
  color: #ffb400;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 16px;
}
</style>
