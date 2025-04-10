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

const maxPattyAreaHeight = 220 // px

function getPattyHeight(percentage) {
  const height = (percentage / 100) * maxPattyAreaHeight
  return Math.max(height, 24) + 'px'
}
</script>

<template>
  <div class="burger-chart">
    <div class="bun top-bun">
      <span
        >수입:<br />
        {{ totalIncome.toLocaleString() }}</span
      >
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
      <span>총 합계: <br />{{ totalAmount.toLocaleString() }}</span>
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
  gap: 6px;
  border-radius: 20px;
  padding: 12px 0;
  box-sizing: border-box;
  text-shadow: 2px 3px 4px rgba(0, 0, 0, 0.5);
}

.bun {
  background-color: #f6b544;
  color: white;
  border-radius: 40px;
  padding: 8px 30px;
  font-size: 16px;
  height: 55px;
  box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3);
}

.top-bun {
  display: flex;
  align-items: flex-end;
  justify-content: left;
  background-image: url('/public/image.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 83% 45%;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  text-align: left;
}

.bottom-bun {
  background-image: url('/public/image.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 83% 45%;
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
  padding: 6px 0;
  border-radius: 16px;
}

.patty {
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: height 0.3s ease;
  box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.3);
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
