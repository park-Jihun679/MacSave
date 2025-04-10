<!-- <template>
  <div>
    <div class="title">내역 수정</div>
    <div class="type-toggle">
      <button
        :class="['toggle-btn', type === '수입' ? 'income' : '']"
        @click="setType('수입')"
      >
        수입
      </button>
      <button
        :class="['toggle-btn', type === '지출' ? 'expense' : '']"
        @click="setType('지출')"
      >
        지출
      </button>
    </div>

    <div class="modal-content">
      <div class="form-group-row">
        <label>날짜</label>
        <input type="date" v-model="date" class="input-box" />
      </div>

      <div class="form-group-row">
        <label>금액</label>
        <input
          type="text"
          :value="formattedAmount"
          @input="handleAmountInput"
          @keypress="preventNonNumeric"
          @paste="filterPaste"
          placeholder="금액 입력"
          class="input-box"
        />
      </div>

      <div class="form-group-row">
        <label>분류</label>
        <div class="category-buttons">
          <button
            v-for="cat in categories[type]"
            :key="cat"
            :class="['category-btn', category === cat ? 'selected' : '']"
            @click="category = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <div class="form-group-row">
        <label>내용</label>
        <input
          type="text"
          v-model="title"
          placeholder="내용을 입력하세요"
          class="input-box"
        />
      </div>

      <div class="form-group-row">
        <label>메모</label>
        <textarea
          v-model="memo"
          placeholder="메모를 입력하세요"
          rows="4"
          class="input-box"
        ></textarea>
      </div>

      <div class="form-actions">
        <button @click="submitTransaction" :disabled="!isValid">저장</button>
        <button @click="handleClose">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import apiClient from '@/utils/axios'

const emit = defineEmits(['close', 'saved'])

// 입력값 상태 정의
const type = ref('수입')
const date = ref(getTodayDate())
const amount = ref(0)
const category = ref('')
const title = ref('')
const memo = ref('')

const categories = {
  수입: ['월급', '용돈', '기타'],
  지출: ['생활', '교통', '식비', '문화', '기타'],
}

// 금액 포맷
const formattedAmount = computed(() =>
  amount.value ? `${amount.value.toLocaleString()} 원` : '',
)

// 현재 날짜 반환
function getTodayDate() {
  const today = new Date()
  return today.toISOString().slice(0, 10)
}

// 금액 입력 핸들링
function handleAmountInput(e) {
  const raw = e.target.value.replace(/\D/g, '')
  amount.value = raw ? parseInt(raw, 10) : 0
}

// 숫자 외 입력 방지
function preventNonNumeric(e) {
  const char = String.fromCharCode(e.which)
  if (!/[0-9]/.test(char)) {
    e.preventDefault()
  }
}

// 붙여넣기 숫자만
function filterPaste(e) {
  e.preventDefault()
  const pasted = (e.clipboardData || window.clipboardData).getData('text')
  const numbersOnly = pasted.replace(/\D/g, '')
  amount.value = numbersOnly ? parseInt(numbersOnly, 10) : 0
}

// 유효성 검사
const isValid = computed(() => {
  return date.value && amount.value > 0 && category.value && title.value
})

// 저장
async function submitTransaction() {
  if (!isValid.value) return

  const payload = {
    id: Date.now().toString(),
    date: date.value,
    amount: amount.value,
    category: category.value,
    title: title.value,
    memo: memo.value,
  }

  const endpoint = type.value === '수입' ? '/incomes' : '/expenses'

  try {
    await apiClient.post(endpoint, payload)
    emit('saved', payload)
    alert('저장되었습니다') // ✅ 저장 후 알림창
    emit('close')
  } catch (error) {
    console.error('저장 실패:', error)
  }
}
// 폼 초기화
function resetForm() {
  type.value = '수입'
  date.value = getTodayDate()
  amount.value = 0
  category.value = ''
  title.value = ''
  memo.value = ''
}

// 타입 바뀌면 카테고리도 초기화
function setType(selectedType) {
  type.value = selectedType
  category.value = ''
}

// 닫기 + 초기화
function handleClose() {
  resetForm()
  emit('close')
}
</script> -->

<template>
  <div>
    <div class="title">내역 수정</div>
    <div class="type-toggle">
      <button
        :class="['toggle-btn', type === '수입' ? 'income' : '']"
        @click="setType('수입')"
      >
        수입
      </button>
      <button
        :class="['toggle-btn', type === '지출' ? 'expense' : '']"
        @click="setType('지출')"
      >
        지출
      </button>
    </div>

    <div class="modal-content">
      <div class="form-group-row">
        <label>날짜</label>
        <input type="date" v-model="date" class="input-box" />
      </div>

      <div class="form-group-row">
        <label>금액</label>
        <input
          type="text"
          :value="formattedAmount"
          @input="handleAmountInput"
          @keypress="preventNonNumeric"
          @paste="filterPaste"
          placeholder="금액 입력"
          class="input-box"
        />
      </div>

      <div class="form-group-row">
        <label>분류</label>
        <div class="category-buttons">
          <button
            v-for="cat in categories[type]"
            :key="cat"
            :class="['category-btn', category === cat ? 'selected' : '']"
            @click="category = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <div class="form-group-row">
        <label>내용</label>
        <input
          type="text"
          v-model="title"
          placeholder="내용을 입력하세요"
          class="input-box"
        />
      </div>

      <div class="form-group-row">
        <label>메모</label>
        <textarea
          v-model="memo"
          placeholder="메모를 입력하세요"
          rows="4"
          class="input-box"
        ></textarea>
      </div>

      <div class="form-actions">
        <button @click="submitTransaction" :disabled="!isValid">저장</button>
        <button @click="handleClose">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import apiClient from '@/utils/axios'

const props = defineProps({
  transaction: Object, // 부모로부터 전달받는 transaction 데이터
})

const emit = defineEmits(['close', 'saved'])

// 입력값 상태 정의
const type = ref('수입')
const date = ref('')
const amount = ref(0)
const category = ref('')
const title = ref('')
const memo = ref('')

const categories = {
  수입: ['월급', '용돈', '기타'],
  지출: ['생활', '교통', '식비', '문화', '기타'],
}

// 금액 포맷
const formattedAmount = computed(() =>
  amount.value ? `${amount.value.toLocaleString()} 원` : '',
)

// 부모로부터 전달받은 데이터를 초기화
onMounted(() => {
  if (props.transaction) {
    type.value = props.transaction.type
    date.value = props.transaction.date
    amount.value = props.transaction.amount
    category.value = props.transaction.category
    title.value = props.transaction.title
    memo.value = props.transaction.memo
  }
})

// 부모로부터 transaction 데이터가 변경될 경우 반영
watch(
  () => props.transaction,
  (newTransaction) => {
    if (newTransaction) {
      type.value = newTransaction.type
      date.value = newTransaction.date
      amount.value = newTransaction.amount
      category.value = newTransaction.category
      title.value = newTransaction.title
      memo.value = newTransaction.memo
    }
  },
  { immediate: true }
)

// 금액 입력 핸들링
function handleAmountInput(e) {
  const raw = e.target.value.replace(/\D/g, '')
  amount.value = raw ? parseInt(raw, 10) : 0
}

// 숫자 외 입력 방지
function preventNonNumeric(e) {
  const char = String.fromCharCode(e.which)
  if (!/[0-9]/.test(char)) {
    e.preventDefault()
  }
}

// 붙여넣기 숫자만
function filterPaste(e) {
  e.preventDefault()
  const pasted = (e.clipboardData || window.clipboardData).getData('text')
  const numbersOnly = pasted.replace(/\D/g, '')
  amount.value = numbersOnly ? parseInt(numbersOnly, 10) : 0
}

// 유효성 검사
const isValid = computed(() => {
  return date.value && amount.value > 0 && category.value && title.value
})

// 저장
async function submitTransaction() {
  if (!isValid.value) return

  const payload = {
    id: props.transaction.id, // 기존 ID 유지
    date: date.value,
    amount: amount.value,
    category: category.value,
    title: title.value,
    memo: memo.value,
  }

  const endpoint = type.value === '수입' ? '/incomes' : '/expenses'

  try {
    await apiClient.put(`${endpoint}/${props.transaction.id}`, payload) // 수정 요청
    emit('saved', payload)
    alert('수정되었습니다') // ✅ 수정 후 알림창
    emit('close')
  } catch (error) {
    console.error('수정 실패:', error)
  }
}

// 닫기 + 초기화
function handleClose() {
  emit('close')
}
</script>
<style scoped>

.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
}
.type-toggle {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
}

.toggle-btn {
  padding: 10px 150px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: #f7f0e5;
  transition: all 0.2s ease;
}

.toggle-btn.income {
  background-color: #4a90e2;
  color: white;
}
.toggle-btn.expense {
  background-color: #e74c3c;
  color: white;
}

.modal-content {
  padding: 24px;
  background-color: cyan;
  border-radius: 8px;
  max-width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

label {
  min-width: 50px;
  font-weight: bold;
}

.input-box {
  flex: 1;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 14px;
}

.category-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-btn {
  padding: 10px 48px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #f7f0e5;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.category-btn.selected {
  background-color: #ffd700;
  font-weight: bold;
  border-color: #e1b000;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
}
</style>
