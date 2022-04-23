<p align="middle" >
  <img src="https://techcourse-storage.s3.ap-northeast-2.amazonaws.com/3e6c6f30b11d4b098b5a3e81be19ce3a" width="400">
</p>
<h2 align="middle">장바구니</h2>
<p align="middle">React & Redux 데스크탑 장바구니 애플리케이션</p>
</p>

## 🚀 Getting Started

> 다수의 컴포넌트를 페이지로 구성하고 복잡해진 상태를 관리합니다.

✔️ `데스크탑 타겟`의 웹 앱을 구현하며 구매로 이어지는 것에 끊김이 없고 `재방문을 고려한 UI/UX`에 대해 고민해봅니다.  
✔️ 상태 관리를 위해 `Flux Architecture` 기반의 `Redux`를 활용합니다.  
✔️ `Router`를 활용해 여러 페이지 전환을 고려합니다.  
✔️ [배민상회](https://mart.baemin.com) 서비스 참고

<br />

## �� Requirements step 1
​
### 필수 요구사항
​
- [ ] `React Testing Library` & `Jest`를 활용해 자유로운 단위의 테스트를 진행한다.
​
#### GNB
​
- [x] `로고`를 누르면 상품목록 페이지로 이동한다.
- [x] `장바구니` 버튼을 누르면 장바구니 페이지로 이동한다.
- [x] `주문목록` 버튼을 누르면 주문목록 페이지로 이동한다.
​
#### 상품목록
​
- [x] 상품들은 n x 4 레이아웃으로 보여진다.
  - [x] 반응형 레이아웃을 구현한다.
- [x] 상품들에는 사진, 이름, 금액이 보여진다.
- [x] 장바구니 버튼을 클릭하면 장바구니 페이지로 이동한다.
- [ ] 페이징을 적용한다.
​
### 심화 요구사항
​
- [x] 도출된 요구사항을 기반으로 `User Flow Diagram` 혹은 `Flow Chart` 작성
- [ ] UI/UX
    - [ ] 사용자를 위한 로딩 환경 개선
    - [ ] 페이징 혹은 인피니티 스크롤 적용 (별도의 API 없음)
        - [ ] 뒤로가기 및 페이지 전환시 기존 페이지 및 스크롤 위치 기억
    - [ ] 상품이 없을 때와 같은 다양한 `Edge Case` 대응
    - [ ] 반응형 레이아웃 구현
    - [ ] 별도의 모바일 레이아웃 추가 제공
    - [ ] [배민상회](https://mart.baemin.com)를 참고하여 추가 개선 사항 반영
- [ ] 매출 증대 및 마케팅을 위해 별도의 기능 구현 (별도의 API 없음)
    - [ ] 브라우저 새로고침시 모든 상태 유지
    - [ ] 흐름을 고려한 맞춤 큐레이팅 **상품 추천** 기능
    - [ ] 구매 유도를 위한 **상품 찜** 페이지
- [ ] 매출 증대 및 마케팅을 위한 별도의 도구 추가
    - [ ] Google Analytics
    - [ ] Google Tag Manager
​
### 리뷰 포인트

## �� Requirements
​
​
### 필수 요구사항
​
- [ ] `React Testing Library` & `Jest`를 활용해 자유로운 단위의 테스트를 진행한다.
- [ ] `Redux` 상태와 `Hooks`를 조합할 수 있는 패턴과 구조를 시도한다.
​
#### 장바구니 step 2
​
- [x] 해당 상품의 수량을 변경할 수 있다.
  - [x] 상품의 수량은 항상 1이상, 20이하여야 한다
    - [x] 상품의 수량이 1이면 상품 수량 감소할 수 없다.
    - [x] 상품의 수량이 20이면 상품 수량 증가할 수 없다.
  - [x] 해당 상품의 총 금액이 변경된다.
  - [x] 해당 상품이 체크되어있으면, 결제예상금액도 변경된다.
- [x] 모두선택 버튼이 체크되면, 상품들이 모두 선택된다.
  - [x] 모두선택 버튼이 체크가 풀리면, 상품들의 선택이 모두 해제된다.
- [x] 상품 삭제 버튼을 누르면, confirm 메시지가 보여진다.
  - [x] 확인을 누르면, 선택된 상품이 모두 삭제된다.
  - [x] 결제예상금액이 0원이 된다.
- [x] �� 버튼을 누르면 confirm 메시지가 보여진다.
  - [x] 확인을 누르면, 해당 상품이 삭제된다.
- [x] 체크된 상품 개수에 따라 주문하기 버튼 내부에 수량이 변경된다.
- [x] 주문하기 버튼을 누르면, confirm 메시지가 보여진다.
  - [x] 확인을 누르면, 주문/결제 페이지로 이동한다.
  - [x] 확인을 누르면, 장바구니에서 선택된 상품들이 삭제된다.
  - [x] 확인을 누르면, 체크된 상품들을 데이터베이스에서 제거한다.
- [x] 주문할 상품이 0개이면 버튼이 비활성화된다.
​
#### 주문/결제
​
- [x] 주문할 상품들의 정보가 보여진다.
- [x] 총 결제금액을 보여준다.
- [x] 결제하기 버튼을 클릭하면, confirm 메시지가 보여진다.
  - [x] 확인 버튼을 누르면, 주문 목록페이지로 이동한다.
​
#### 주문목록
​
- [x] 주문 정보들이 보여진다.
- [x] 장바구니 버튼을 클릭하면, 해당 상품이 장바구니에 담기고 장바구니 이동 선택 모달이 보여진다.
  - [x] 장바구니 이동 버튼을 누르면 장바구니 페이지로 이동한다.
​
### 심화 요구사항
​
- [ ] 도출된 요구사항을 기반으로 `User Flow Diagram` 혹은 `Flow Chart` 작성
- [ ] UI/UX
    - [ ] 사용자를 위한 로딩 환경 개선
    - [ ] 페이징 혹은 인피니티 스크롤 적용 (별도의 API 없음)
        - [ ] 뒤로가기 및 페이지 전환시 기존 페이지 및 스크롤 위치 기억
    - [ ] 상품이 없을 때와 같은 다양한 `Edge Case` 대응
    - [ ] 반응형 레이아웃 구현
    - [ ] 별도의 모바일 레이아웃 추가 제공
    - [ ] [배민상회](https://mart.baemin.com)를 참고하여 추가 개선 사항 반영
- [ ] 매출 증대 및 마케팅을 위해 별도의 기능 구현 (별도의 API 없음)
    - [ ] 브라우저 새로고침시 모든 상태 유지
    - [ ] 흐름을 고려한 맞춤 큐레이팅 **상품 추천** 기능
    - [ ] 구매 유도를 위한 **상품 찜** 페이지
- [ ] 매출 증대 및 마케팅을 위한 별도의 도구 추가
    - [ ] Google Analytics
    - [ ] Google Tag Manager
​
### 리뷰 포인트

### 장바구니 step 3

## �� Requirements
​
​
### 필수 요구사항
​
- [ ] `React Testing Library` & `Jest`를 활용해 자유로운 단위의 테스트를 진행한다.
- [ ] 사용자의 환경 개선을 위해 영속성 데이터를 관리합니다.
- [ ] Redux 상태를 Normalize 관리합니다.
​
#### 상품상세
​
- [x] 페이지에는 상품 사진, 이름, 금액 정보가 보여진다.
- [x] 장바구니 버튼을 클릭하면 장바구니 페이지로 이동한다.
- [x] 장바구니 버튼을 클릭하면 해당 상품이 장바구니에 담긴다.
​
#### 주문 상세
​
- [x] 주문 정보가 보여진다.
- [x] 장바구니 버튼을 클릭하면, 해당 상품이 장바구니에 담기고 장바구니 이동 선택 모달이 보여진다.
  - [x] 장바구니 이동 버튼을 누르면 장바구니 페이지로 이동한다.
​
## 리뷰 포인트
​
- **Architecture**
    - 애플리케이션의 레이어 구분이 명확한가 
    - Component 분리 기준을 명확하게 가지며 일관성을 지키기위해 노력하고 있는가
    - Component, Hooks, Redux 의 역할이 명확하게 구분되어 있는가
    - Component, Hooks, Redux 간의 의존 관계가 적절한가
    - 영속성 데이터를 관리하는 기준이 명확한가
- **TDD**
    - `React Testing Library` & `Jest`를 사용하여 TDD를 적용했는가
    - 테스트 단위를 적절하게 가지고 있는가
    - 애플리케이션의 핵심 로직을 테스트하고 있는가
    - 비동기 로직에 대한 테스트가 없다면 그에 대한 에러 처리는 되어있는가
    - `Hooks` 로직이 추가되며 그에 대한 TDD 대응이 있는가
- **비동기 로직 & Data Fetch**
    - 비동기 로직을 잘 분리하고 있는가
    - 비동기 상황에 환경 개선은 잘 되어있는가
        - 예) `Loader`, `Lazy Loading`
    -  엣지 케이스나 예외처리가 잘 되어있는가
        -  예) `Timeout`, `Catch Error`, `User Alert`, `Error Page`
- **Redux**
    - `3가지 원칙`에 대한 이해가 있는가
    - Normalize 상태 모델링이 적절한가
    - Reducer 역할 분리가 서비스와 요구사항을 잘 고려하고 있는가
    - Reducer 간의 중복 코드나 로직을 공통으로 분리하고 있는가
    - 특정 패턴을 설계했다면 잘 반영되어있는가
        - 예) `Ducks Pattern`, `Doman-Driven Design`
    - 영속성 데이터를 가지고 있다면 그에 대한 Redux에서의 개입이 적절하게 되어있는가
- **UI/UX**
    - 데스크탑에서의 사용성에 문제가 있는가
    - 유저의 흐름을 끊지않는 편리한 사용성을 지니고 있는가
    - 구매까지 가는 흐름에 방해가는 요소가 있는가
    - 사용자가 사용하기 편리한 장바구니 UI/UX인가
    - 장바구니 Validation이 꼼꼼하게 잘 되어 있는가

## 🕋 Server 실행 방법

> **react-shopping-cart/client** 디렉토리에서 실행해주세요.

- 최초 실행 시

```shell
# npm
npm run server:first

# yarn
yarn server:first
```

- 이후 실행 시

```shell
# npm
npm run server

# yarn
yarn server
```

<br />

## 📝 API 명세

### 🌏 baseUrl

```
http://localhost:3003
```

### 🎁 상품

#### 상품 목록 조회

| method | uri       |
| ------ | --------- |
| GET    | /products |

```json
{
  "response": [
    {
      "id": 1,
      "price": 10000,
      "name": "치킨",
      "imageUrl": "http://example.com/chicken.jpg"
    },
    {
      "id": 2,
      "price": 20000,
      "name": "피자",
      "imageUrl": "http://example.com/pizza.jpg"
    }
  ]
}
```

#### 상품 추가

| method | uri       |
| ------ | --------- |
| POST   | /products |

```json
{
  "requestBody": {
    "products": {
      "price": 10000,
      "name": "치킨",
      "imageUrl": "http://example.com/chicken.jpg"
    }
  }
}
```

#### 상품 단일 조회

| method | uri            |
| ------ | -------------- |
| GET    | /products/{id} |

```json
{
  "response": {
    "id": 1,
    "price": 10000,
    "name": "치킨",
    "imageUrl": "http://example.com/chicken.jpg"
  }
}
```

#### 상품 단일 삭제

| method | uri            |
| ------ | -------------- |
| DELETE | /products/{id} |

```json
{
  "response": {}
}
```

### 🛒 장바구니

#### 장바구니 아이템 목록 조회

| method | uri    |
| ------ | ------ |
| GET    | /carts |

```json
{
  "response": {
    "id": 1,
	  "product": {
			"name": "test",
			"price": 1234,
			"imageUrl": "test.com",
			"id": 1
		},
	},
	{
    "id": 5,
		"product": {
			"name": "tes11111t",
			"price": 1234,
			"imageUrl": "test.com",
			"id": 10
		}
	},
}
```

#### 장바구니 아이템 추가

| method | uri    |
| ------ | ------ |
| POST   | /carts |

```json
{
  "requestBody": {
    "product": {
      "id": 10,
      "name": "tes11111t",
      "price": 1234,
      "imageUrl": "test.com"
    }
  }
}
```

#### 장바구니 아이템 단일 삭제

| method | uri             |
| ------ | --------------- |
| DELETE | /carts/{cartId} |

```json
{
  "response": {}
}
```

### 🗒 주문

#### 주문 추가(주문하기)

| method | uri     |
| ------ | ------- |
| POST   | /orders |

```json
{
  "requestBody": {
    "orderDetails": [
      {
        "id": 1,
        "price": 10000,
        "name": "치킨",
        "imageUrl": "http://example.com/chicken.jpg",
        "quantity": 5
      },
      {
        "id": 2,
        "price": 20000,
        "name": "피자",
        "imageUrl": "http://example.com/pizza.jpg",
        "quantity": 3
      }
    ]
  }
}
```

#### 주문 목록(내역) 조회

| method | uri     |
| ------ | ------- |
| GET    | /orders |

```json

{
  "response": [
    {
      "id": 1,
      "orderDetails": [
        {
          "id": 1,
          "price": 10000,
          "name": "치킨",
          "imageUrl": "http://example.com/chicken.jpg",
          "quantity": 5
        },
        {
          "id": 2,
          "price": 20000,
          "name": "피자",
          "imageUrl": "http://example.com/pizza.jpg",
          "quantity": 3
        }
      ]
    },
    {
      "id": 2,
      "orderDetails": [
        {
          "id": 1,
          "price": 10000,
          "name": "치킨",
          "imageUrl": "http://example.com/chicken.jpg",
          "quantity": 5
        },
        {
          "id": 2,
          "price": 20000,
          "name": "피자",
          "imageUrl": "http://example.com/pizza.jpg",
          "quantity": 3
        }
      ]
    }
  ]
```

#### 주문 단일 조회

| method | uri          |
| ------ | ------------ |
| GET    | /orders/{id} |

```json
{
  "response": {
    "id": 1,
    "orderDetails": [
      {
        "id": 1,
        "price": 10000,
        "name": "치킨",
        "imageUrl": "http://example.com/chicken.jpg",
        "quantity": 5
      },
      {
        "id": 2,
        "price": 20000,
        "name": "피자",
        "imageUrl": "http://example.com/pizza.jpg",
        "quantity": 3
      }
    ]
  }
}
```
