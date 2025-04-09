<script setup>
import { computed } from 'vue'
const props = defineProps(['category', 'items'])
const emits = defineEmits(['back'])

const filteredItems = computed(() =>
  props.items.filter(item => item.category === props.category),
)

const totalAmount = computed(() =>
  filteredItems.value.reduce((sum, item) => sum + item.amount, 0),
)
</script>

<template>
  <div>
    <button @click="$emit('back')">← 돌아가기</button>
    <h3>4월 {{ category }} 영수증</h3>
    <table>
      <thead>
        <tr>
          <th>날짜</th>
          <th>항목</th>
          <th>금액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredItems" :key="item.id">
          <td>{{ item.date }}</td>
          <td>{{ item.memo }}</td>
          <td>{{ item.amount.toLocaleString() }} 원</td>
        </tr>
      </tbody>
    </table>
    <p>총 합계: {{ totalAmount.toLocaleString() }} 원</p>
  </div>
</template>
