<template>
  <div>
    <div class="type-toggle">
      <button :class="['toggle-btn', type === '수입' ? 'income' : '']" @click="type = '수입'">
        수입
      </button>
      <button :class="['toggle-btn', type === '지출' ? 'expense' : '']" @click="type = '지출'">
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
        <input type="text" v-model="title" placeholder="내용을 입력하세요" class="input-box" />
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
        <button @click="$emit('close')">취소</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import apiClient from '@/utils/axios'

const emit = defineEmits(['close', 'saved'])

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

const formattedAmount = computed(() =>
  amount.value ? `${amount.value.toLocaleString()} 원` : '',
)

function handleAmountInput(e) {
  const raw = e.target.value.replace(/\D/g, '')
  amount.value = raw ? parseInt(raw, 10) : 0
}

function preventNonNumeric(e) {
  const char = String.fromCharCode(e.which)
  if (!/[0-9]/.test(char)) {
    e.preventDefault()
  }
}

function filterPaste(e) {
  e.preventDefault()
  const pasted = (e.clipboardData || window.clipboardData).getData('text')
  const numbersOnly = pasted.replace(/\D/g, '')
  amount.value = numbersOnly ? parseInt(numbersOnly, 10) : 0
}

const isValid = computed(() => {
  return date.value && amount.value > 0 && category.value && title.value
})

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
    emit('close')
  } catch (error) {
    console.error('저장 실패:', error)
  }
}
</script>

<style scoped>
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
  background-color: #F7F0E5;
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
  background-color: #fff8f8;
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
  background-color: #F7F0E5;
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
