# 🍔 MacSave 가계부 프로젝트 

Vue.js와 json-server를 활용한 간단한 가계부 프로젝트입니다.
수입/지출을 입력하고, 카테고리별로 데이터를 필터링하며, 데이터를 손쉽게 수정 및 삭제할 수 있습니다.
햄버거 그래프를 활용하여 월 소비 내역을 직관적으로 쉽게 파악할 수 있습니다. 


이 저장소를 클론한 후 아래의 순서대로 실행하면 바로 가계부를 시작할 수 있습니다.

## 🚀 프로젝트 실행 방법

### 1. 저장소 클론

```bash
git clone 'https://github.com/sebin219/MacSave.git'
```

### 2. 의존성 설치

```
npm install
```

### 3. 개발 서버 실행

```
npm run dev
```

### 4. JSON DB 서버 실행

```
npm run db
```

### 5. 기타 설정

- **JSON DB 서버 주소**: [`http://localhost:5001`](http://localhost:5001)
- **개발 서버 주소 (Vite 기본값)**: [`http://localhost:5173`](http://localhost:5173)



## ⚙️ MacSave 가계부 주요 기능

- ✅ 수입/지출 추가 및 실시간 반영
- ✏️ 거래 내역 수정 모달
- ❌ 삭제 기능과 삭제 후 즉시 반영
- 📅 날짜별 필터링 
- 💬 메모 기능
- 📊 총합 계산
- 🗓️ 캘린더를 활용한 소비/지출 내역 파악
- 🍔 햄버거 그래프를 통한 나의 소비내역 분석
- 🍔 빅맥버튼 : 화폐단위를 원단위에서 빅맥단위로 변경하여 출력 (1🍔 = 5,500 원 )
- 🔄 json-server 연동 (REST API)

## 🛠️ 기술 스택

| 분야         | 사용 기술                |
|--------------|---------------------------|
| Frontend     | Vue 3, Composition API     |
| 상태 관리     | Pinia (수입/지출 각각 관리) |
| Backend (Mock) | json-server (`db.json`)   |
| HTTP 통신    | Axios                      |
| 기타         | Vite, ESLint, Prettier     |



## 🗂️ 프로젝트 구조

```bash
src/
├── components/
│   └── HeaderContainer.vue
├── layouts/
│   ├── DeafultLayout.vue
│   └── NoLayout.vue
├── router/
│   └── ...
├── stores/
│   ├── incomeStore.js
│   ├── expenseStore.js
│   └── ...
├── utils/
│   └── axios.js
├── pages/
│   ├── calendar/
│   │    └── ...
│   ├── history/
│   │    └── ...
│   ├── lock/
│   │    └── ...
│   ├── settings/
│   │    └── ...
│   └── stats/
│        └── ...
├── App.vue
└── main.js
```
## 🍔 MacSave 가계부 구성

### 1. 초기화면

![MacSave 초기화면](./public/readme/Lock.png)

MacSave 가계부의 초기화면입니다.
비밀번호를 설정하고 입력하면 가계부화면으로 넘어갑니다.
비밀번호 및 유저이름 정보는 db.json 에 저장됩니다.


### 2. Expense (소비/지출 내역)

![MacSave 소비/지출 내역](./public/readme/Expense.png)

MacSave 가계부의 소비/지출 내역입니다.
db.json에 저장된 내용을 불러와 지출/소비 내역을 출력합니다.
+ 주요기능
  +  필터기능을 활용하여 주/월/연별로 조회가 가능합니다.
  +  `+` 버튼을 클릭하여 실시간으로 소비/지출 내역 추가가 가능합니다.
  +  내역 클릭시 상세내역 영수증을 확인 할 수 있습니다.
  +  상세내역 영수증에서 삭제/수정 버튼을 통해 내역 삭제/수정 가능합니다.

### 3. Calendar (달력형식 내역)

![MacSave 달력형식 내역](./public/readme/Calendar.png)

MacSave 가계부의 달력형식 내역입니다.
캘린더형식의 디자인을 통해 요약된 일별 소비/지출 내역을 확인 가능합니다.

### 4. Analysis (월별 통계 햄버거 그래프)

![MacSave 햄버거 통계](./public/readme/Analysis.png)

햄버거형태의 소비내역 요약 그래프입니다.
카테고리별 소비금액을 바탕으로 카테고리별 패티의 크기가 변경됩니다.
카테고리별 지출/수입 영수증이 출력되며,
