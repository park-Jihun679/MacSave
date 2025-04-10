<script setup>
const props = defineProps({
  totalIncome: Number,
  totalAmount: Number,
  expenseItems: Object,
})
defineEmits(['select-category'])

const categoryClassMap = {
  생활: 'patty-life',
  교통: 'patty-transport',
  식비: 'patty-food',
  문화: 'patty-culture',
  기타: 'patty-etc',
}

const maxPattyAreaHeight = 240 // px

function getPattyHeight(percentage) {
  const height = (percentage / 100) * maxPattyAreaHeight
  return Math.max(height, 24) + 'px'
}
</script>

<template>
  <div class="burger-chart">
    <div class="bun top-bun">
      <span>수입: {{ totalIncome.toLocaleString() }}</span>
    </div>

    <div class="patty-area">
      <div
        v-for="(item, category) in expenseItems"
        :key="category"
        class="patty"
        :class="categoryClassMap[category] || 'default-patty'"
        :style="{ height: getPattyHeight(item.percentage) }"
        @click="$emit('select-category', category)"
      >
        {{ category }}: {{ item.amount.toLocaleString() }}
      </div>
    </div>

    <div class="bun bottom-bun">
      <span>총 합계: {{ totalAmount.toLocaleString() }}</span>
    </div>
  </div>
</template>

<style scoped>
.burger-chart {
  width: 413px;
  height: 463px;
  margin: auto;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px;
  padding: 12px 0;
  box-sizing: border-box;
}

.bun {
  background-color: #f4a949;
  color: white;
  border-radius: 40px;
  padding: 8px;
  margin: 6px 0;
  font-size: 16px;
  height: 50px;
}

.top-bun {
  display: flex;
  align-items: flex-end;
  justify-content: left;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  text-align: left;
  padding: 8px;
}

.bottom-bun {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  text-align: right;
}

.patty-area {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 0;
  background: #fffbe7;
  border-radius: 16px;
}

.patty {
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: height 0.3s ease;
}

.patty-life {
  background-color: #a65f35;
}

.patty-transport {
  background-color: #eee042;
  color: black;
}

.patty-food {
  background-color: #ff8c42;
}

.patty-culture {
  background-color: #6cd86c;
}

.patty-etc {
  background-color: #f5544d;
}
</style>
