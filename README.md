# 깃 저장소 내용 보기 프로젝트

특정 저장소에 있는 md 파일을 볼 수 있도록 하는 프로젝트

## 서버 및 클라이언트 구성 요소를 언제 사용합니까?
### 다음은 서버 및 클라이언트 구성 요소의 다양한 사용 사례에 대한 간략한 요약입니다.

|뭘하길 원해?|서버 구성 요소|클라이언트 구성요소|
|:---|:---:|:---:|
|데이터 가져오기|✅|✖️|
|백엔드 리소스에 (직접) 액세스|✅|✖️|
|민감한 정보를 서버에 보관하세요(액세스 토큰, API 키 등)|✅|✖️|
|서버에 대한 큰 의존성 유지 / 클라이언트 측 JavaScript 감소|✅|✖️|
|상호작용 및 이벤트 리스너( onClick(), onChange()등) 추가|✖️|✅|
|상태 및 수명주기 효과 사용( useState(), useReducer(), useEffect()등)|✖️|✅|
|브라우저 전용 API 사용|✖️|✅|
|상태, 효과 또는 브라우저 전용 API에 따라 달라지는 사용자 정의 후크를 사용하세요.|✖️|✅|
|React 클래스 구성요소 사용|✖️|✅|


## Next.js에 React-query 사용
### 키워드 : prefetch, hydrate, optimistic, update


## 도움 받은 사이트
> [Next.js13 react-query](https://velog.io/@baby_dev/Next13-with-react-query)