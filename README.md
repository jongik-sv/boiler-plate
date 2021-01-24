# boiler-plate

참고 : [강사 소스](https://github.com/jaewonhimnae/boiler-plate-ko)

## 2강 Node JS, Express 다운로드 하기

vscode 설치

node js 설치

express 설치

```sh
npm install express --save
```

[hello world example](http://expressjs.com/en/starter/hello-world.html)

port번호만 5000으로 바꾸자

```js
const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

## 3강 몽고 DB 연결

1. [몽고DB](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_apac_south_korea_search_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=1718986522&gclid=CjwKCAiAr6-ABhAfEiwADO4sfUJ19d-bNccf3BWka6XBTO6ZBQ3-iGbtOQoI8k4yvqlc2FxNZXzLDxoCcucQAvD_BwE) 회원 가입
2. Cluster 만들기 (시간이 좀 걸림)
3. 유저 생성
   - connect 버튼을 눌러라
   - Whitelist your connection IP address 에서 IP설정
   - Username, Password 입력 후 유저 생성 버튼 클릭
   - Choose a connection method 버튼 클릭, 다음 Connect your Application 선택, 접속 주소 복사
4. mongoose 설치

```sh
npm install mongoose --save
```

5. mongodb 연결

```js
const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://<user>:<password>@boiler.dwcw2.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hello world"));

app.listen(port, () => console.log(`Exapmle app listening on port ${port}!`));
```

## 4강 MongoDB Model & Schema

### 모델이란?

스키마를 감싸주는 역할

### 스키마 [[참고]](https://nicewoong.github.io/development/2018/02/10/mongodb-feature/)

1. 스키마란?
   - 데이터베이스를 구성하는 개체(Entity), 속성(Attribute), 관계(Relationship) 및 데이터 조작 시에 데이터 값들이 갖는 제약조건 등에 관해 전반적으로 정의하는 것이다.
   - Schema가 존재한다는 것은 그 구조가 미리 정의되어 있어야 한다는 의미. 이는 데이터의 급격한 변화에 대응하기 힘듬.
2. MongoDB 는 이러한 스키마가 사전에 정의되지 않아도 된다.
3. 데이터베이스에 저장된 Document는 각기 다른, 다양한 필드를 가질 수 있다.
4. 각 필드는 서로 다른 데이터타입을 가질 수 있다.
5. 실제로 동적 형식의 스키마를 의미합니다.
6. 구조화 되지 않은 데이터를 쉽게 저장할 수 있음

### `mongoose.Schema` [[참고]](https://www.zerocho.com/category/MongoDB/post/59a1870210b942001853e250)

nosql의 고질적인 문제가 데이터의 스키마가 없어도 되기 때문에 에러가 안나서 편리한것 같지만 실제 사용 시 오타나 기타 이유로 발생하는 오류를 찾아 내기 힘들다.

위의 문제를 방지하기 위해 몽구스에서는
작성된 스키마 기준으로 데이터 검증을 하여 RDBMS와 비슷한 효과를 얻을 수 있다.

아래의 기능이 있다.

- 스키마에 어긋나는 데이터에 대해 에러 발생
- 스키마를 설정할 때 인덱스가지 걸수 있음
- 기본값 지정 가능
- virtual 필드
- 스키마나 다큐먼트에 사용자 정의 메소드 붙임
- 모델이나 쿼리에 직접 static method를 붙일 수 있음

### 모델 메소드

#### find, findOne, findById

#### findOneAndRemove, findOneAndUpdate, findByIdAndRemove, findByIdAndUpdate

### UserSchema (User.js)

```JS
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {type: String,maxLength: 50,},
  email: {type: String,trim: true,unique: 1,},
  password: {type: String,minLength: 1,},
  lastName: {type: String,maxLength: 50,},
  role: {type: Number,default: 0,},
  image: String,
  token: {type: String,},
  tokenExp: {type: Number,},
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
```

## 5강 Git설치

## 6강

## 7강

### body-Parser

request 데이터의 body를 parsing

설치

```sh
npm install body-parser --save
```

index.js에 body-parser를 이용하여 회원가입 코딩

```js
const bodyParser = require("body-parser");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//application/json
app.use(bodyParser.json());


...


...

app.post("/api/users/register", (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 넣어준다.
  const user = new User(req.body);
  console.log(req.body);
  // return;
  user.save((err, userInfo) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    }
    return res.status(200).json({ success: true });
  });
});
```

### postman [[다운로드]](https://www.postman.com/downloads/)

![Screenshot](resources/노드 리액트 기초 강의 #7 BodyParser & PostMan & 회원 가입 기능.png)

document/images/노드 리액트 기초 강의 #7 BodyParser & PostMan & 회원 가입 기능.png)

[![Cors image](https://mdn.mozillademos.org/files/14295/CORS_principle.png)](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)

## 8강

딩

## 9강

## 20강

[react-router](https://reactrouter.com/web/guides/quick-start) 참고

[basic](https://reactrouter.com/web/example/basic) 참고

```jsx
<Route exact path="/">
  <LandingPage />
</Route>
```

위 처럼 쓴 것을 아래처럼 바꿀 수 있다.

```jsx
<Route exact path="/" component={LandingPage} />
```

### app.use, 미들웨어

- [app.use](https://github.com/xzcv1994/My-Study/issues/15)
- 미들웨어 [[1]](https://psyhm.tistory.com/8), [[2]](https://jinbroing.tistory.com/126)

## 21강

### AXIOS

- React JS에서 Request를 보내는데 그때 AXIOS를 사용 할것
- jQuery를 사용할때 AJAX

설치

```sh
npm install axios --save
```

## 22강

### Cors(Cross-Origin Resource Sharing)가 무엇인가?

보안을 위해 각각 다른 서버(Origin)간 아무 설정 없이 Request를 보낼 수 없다.

[![Cors image](https://mdn.mozillademos.org/files/14295/CORS_principle.png)](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)
**잘안보이면 그림 클릭**

### Cors를 해결방안

client에 proxy를 설치 한다. [[참고]](https://create-react-app.dev/docs/proxying-api-requests-in-development/)

```sh
npm install http-proxy-middleware --save
```

`src/setupProxy.js` 파일 생성 후 아래 처럼 기입

```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
```

## 24강

### Concurrently 설치

서버와 클라이언트를 동시에 실행하기 위한 모듈

```sh
npm install concurrently --save
```

root의 package.json 파일에서 스크립트 부분 편집

```json

  "scripts": {
    "start": "node index.js",
    "backend": "nodemon server/index.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "concurrently \"npm run backend\" \"npm run start --prefix client\""
  },
```

이제 루트에서 `npm run dev` 만 실행하면 서버, 클라이언트 모두 실행 된다.

## 25강

React JS를 위한 CSS Framework 종류

- Meterial UI
- React Bootstrap
- Semantic UI
- [`Ant Design`](https://ant.design/docs/react/introduce)
- Materialize
- ...

여기서는 And Design을 사용함

설치방법 :

```sh
npm install antd --save

```

## 26강

### `props`

- 부모 컴포넌트에서 자식컴포넌트로 데이터를 주고 받을때 사용
- 자식 컴포넌트에서는 수정 불가(immutable), 수정을 위해서는 부모에서 수정해서 자식으로 전달 해야 함

### `state`

- 컴포넌트 안에서 사용하는 변수(mutable)
- 변경하면 rerandering 가능 하다.

### [redux](https://www.youtube.com/watch?v=dJC_uAR7d60&list=PL9a7QRYt5fqkZC9jc7jntD1WuAogjo_9T&index=26)

state를 체계적으로 관리하는 도구

[![redux](https://www.tutorialandexample.com/wp-content/uploads/2019/12/React-Redux-Example.png)](https://www.tutorialandexample.com/react-redux/)

Redux가 없을 경우는 state 변경을 위해 복잡한 데이터 전달 과정이 필요하지만, Redux가 있으면 Store에 의해 간단하게 처리 된다.
한 방향으로만 데이터가 흐른다.

[![플로우 전체도](https://miro.medium.com/max/700/0*Z18iLsM7Bf1xoNth.)](https://medium.com/@ca3rot/%EC%95%84%EB%A7%88-%EC%9D%B4%EA%B2%8C-%EC%A0%9C%EC%9D%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-%EC%89%AC%EC%9A%B8%EA%B1%B8%EC%9A%94-react-redux-%ED%94%8C%EB%A1%9C%EC%9A%B0%EC%9D%98-%EC%9D%B4%ED%95%B4-1585e911a0a6)

#### 구조 (참고 : [[1]](https://medium.com/@ca3rot/%EC%95%84%EB%A7%88-%EC%9D%B4%EA%B2%8C-%EC%A0%9C%EC%9D%BC-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-%EC%89%AC%EC%9A%B8%EA%B1%B8%EC%9A%94-react-redux-%ED%94%8C%EB%A1%9C%EC%9A%B0%EC%9D%98-%EC%9D%B4%ED%95%B4-1585e911a0a6))

- `Action` : 어떤 일이 있어났는지 설명하는 객체

- `Reducer` : state변경이 어떻게 일어났는지 설명하는 함수, 이전 State와 Action Object를 리턴한다.

- `Store`
  - state는 기본적으로 여기서 집중 관리됨
  - 커다란 JSON으로 생각하면 됨
  - 규모가 클 경우 카테고리로 나누어 분류 하는 것이 일반적

```json
{
    // 세션과 관련된 것
    session: {
        loggedIn: true,
        user: {
            id: "114514",
            screenName: "@mpyw",
        },
    },
​
    // 표시중인 타임라인에 관련된 것
    timeline: {
        type: "home",
        statuses: [
            {id: 1, screenName: "@mpyw", text: "hello"},
            {id: 2, screenName: "@mpyw", text: "bye"},
        ],
    },
​
    // 알림과 관련된 것
    notification: [],
}
```

## 27강 Redux up

설치

```sh
npm install redux react-redux redux-promise redux-thunk --save
```

store에서 모든 state관리를 한다. 값을 변경하고자 할때는 Dispatch를 이용해서 Action으로 변경한다.

Action은 객체 형식이어야 한다. 그런데 promise, function을 받기 위해 `redux-promise`, `redux-thunk` 미들웨어를 사용한다.

> redux-thunk : 디스페치에게 어떻게 Function을 받는지 알려줌

> redux-promise : promise가 왔을때 어떻게 대처하는지 알려줌

## 29강 로그인 페이지 #1

Formik, Yup 라이브러리를 사용해서 다이나믹 기능을 넣으면 좋음

여기에는 빠져 있음, 나중에 업그레이드 해보자~
