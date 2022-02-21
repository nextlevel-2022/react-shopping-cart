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

## �� Requirements
​
### 필수 요구사항
​
- [ ] `React Testing Library` & `Jest`를 활용해 자유로운 단위의 테스트를 진행한다.
​
#### GNB
​
- [ ] `로고`를 누르면 상품목록 페이지로 이동한다.
- [ ] `장바구니` 버튼을 누르면 장바구니 페이지로 이동한다.
- [ ] `주문목록` 버튼을 누르면 주문목록 페이지로 이동한다.
​
#### 상품목록
​
- [x] 상품들은 n x 4 레이아웃으로 보여진다.
  - [x] 반응형 레이아웃을 구현한다.
- [x] 상품들에는 사진, 이름, 금액이 보여진다.
- [ ] 장바구니 버튼을 클릭하면 장바구니 페이지로 이동한다.
- [ ] 페이징을 적용한다.
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
