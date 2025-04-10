<script setup>
defineProps({
  incomeItems: Object,
  expenseItems: Object,
  totalIncome: Number,
  totalExpense: Number,
  netTotal: Number,
})
</script>

<template>
  <div class="receipt-container">
    <h3 class="receipt-title">4월 카테고리별 영수증</h3>

    <div class="section">
      <h4 class="section-title">지출</h4>
      <div v-for="(item, category) in expenseItems" :key="category" class="row">
        <span>{{ category }}:</span>
        <span
          >-{{ item.amount.toLocaleString() }}원 ({{ item.percentage }}%)</span
        >
      </div>
      <div class="summary total-expense">
        합계: -{{ totalExpense.toLocaleString() }} 원
      </div>
    </div>

    <hr class="divider" />

    <div class="section">
      <h4 class="section-title">수입</h4>
      <div v-for="(item, category) in incomeItems" :key="category" class="row">
        <span>{{ category }}:</span>
        <span
          >+{{ item.amount.toLocaleString() }}원 ({{ item.percentage }}%)</span
        >
      </div>
      <div class="summary total-income">
        합계: +{{ totalIncome.toLocaleString() }} 원
      </div>
    </div>

    <hr class="divider" />

    <div class="net-total">
      총 합계:
      <span :class="netTotal >= 0 ? 'plus' : 'minus'">
        {{ netTotal >= 0 ? '+' : '-'
        }}{{ Math.abs(netTotal).toLocaleString() }} 원
      </span>
    </div>

    <div class="footer">
      <p class="brand">MacSave 🍔</p>
      <img src="/public/Barcord.png" alt="바코드" class="barcode" />
    </div>
  </div>
</template>

<style scoped>
.receipt-container {
  background: #f9f9f9;
  border: 1px solid #ccc;
  padding: 24px;
  font-family: 'Arial', sans-serif;
  color: #333;
  width: 400px;
  height: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.receipt-title {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 0;
}

.row {
  display: flex;
  font-size: 14px;
  font-weight: bold;
  margin: 2px 0;
}

.summary {
  font-weight: bold;
  text-align: right;
  margin-top: 12px;
}

.total-expense {
  color: red;
}

.total-income {
  color: #2980b9;
}

.divider {
  border: none;
  border-top: 3px solid #5f5f5f;
  margin: 6px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.net-total {
  font-weight: bold;
  font-size: 15px;
  text-align: right;
  margin-top: 24px;
}

.net-total .minus {
  color: red;
}

.footer {
  text-align: center;
  justify-content: right;
  display: flex;
}

.barcode {
  width: 50%;
  height: auto;
}

.brand {
  margin-top: 50px;
  font-weight: bold;
  font-size: 16px;
  color: #555;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
</style>
