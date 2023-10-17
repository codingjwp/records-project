# 깃 저장소 내용 보기 프로젝트

특정 저장소에 있는 md 파일을 볼 수 있도록 하는 프로젝트

## 폴더 구조

📂 src  
┗ 📂 app  
  ┗ 📂 list  
  ┗ 📂 records  
┗ 📂 component  

## 서버 및 클라이언트 구성 요소를 언제 사용합니까?

### 다음은 서버 및 클라이언트 구성 요소의 다양한 사용 사례에 대한 간략한 요약입니다

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

### `use client`

`use client`는 Next.js에서 사용하는 서버 컴포넌트를 클라이언트 컴포넌트로 바꿔 클라이언트에서 렌더링 할 수 있게 요청하는 지시어입니다.

또한 공식문서에는 아래와 같이 내용이 적혀있습니다.

> [This means that by defining a "use client" in a file, all other modules imported into it, including child components, are considered part of the client bundle.](https://nextjs.org/docs/app/building-your-application/rendering/client-components#using-client-components-in-nextjs)

해당 글자를 번역해보면 아래와 같이

**파일에 `"use client"`를 정의하면 하위 구성 요소를 포함하여 해당 파일로 가져온 다른 모든 모듈이 클라이언트 번들의 일부로 간주됩니다.**

> 상태 관리 라이브러리의 선택은 프로젝트의 복잡성, 확장성, 요구사항, 개인 선호도 차이에 따라 결정됩니다.


## 에러 발생
[](https://stackoverflow.com/questions/76903959/nextjs-typeerror-cannot-read-properties-of-null-reading-removechild-when)

## 도움 받은 사이트
>
> [Next.js13 App Router state management](https://medium.com/@ahmedenany9812/state-management-in-next-js-13-app-router-3892a56261ce)  
> [Next.js13 구성 패턴](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)
