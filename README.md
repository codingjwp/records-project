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


## 데이터 캐싱

fetch 요청은 다음 경우에 캐시되지 않습니다:

- fetch 요청에 cache: 'no-store'가 추가된 경우: 이는 fetch 요청에 대한 응답이 캐시에 저장되지 않도록 지정합니다.
- 개별 fetch 요청에 revalidate: 0 옵션이 추가된 경우: 이는 캐시된 응답이 유효한지 확인하지 않고 항상 서버에서 새로운 응답을 가져오도록 지정합니다.
- POST 메서드를 사용하는 라우터 핸들러 내부의 fetch 요청인 경우: POST 메서드는 일반적으로 데이터를 서버로 전송하므로, 이러한 요청은 캐시되지 않습니다.
- 헤더나 쿠키의 사용 후 fetch 요청이 이루어진 경우: 헤더나 쿠키의 사용은 요청의 상태를 변경할 수 있으므로, 이후의 요청은 캐시되지 않습니다.
- const dynamic = 'force-dynamic' 라우트 세그먼트 옵션이 사용된 경우: 이 옵션은 라우트가 동적으로 처리되도록 강제하므로, 해당 라우트의 요청은 캐시되지 않습니다.
- fetchCache 라우트 세그먼트 옵션이 기본적으로 캐시를 건너뛰도록 설정된 경우: 이는 해당 라우트의 모든 요청이 캐시되지 않도록 지정합니다.
- fetch 요청이 Authorization 또는 Cookie 헤더를 사용하고 컴포넌트 트리에서 그 위에 캐시되지 않은 요청이 있는 경우: 이는 보안상의 이유로 인해, 이러한 요청은 캐시되지 않습니다.

### 캐싱이 되고 있지 않은 코드

```typescript
  const options = {
    next: { revalidate: 60 },
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.ACESS_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        query {
          viewer {
            pinnedItems(first: 10) {
              totalCount
            }
            contributionsCollection(from: "${year}" to: "${toDay}") {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }`,
    }),
  }
  const response = await fetch(`${process.env.GITHUB_API}`, options)
```

> 출처 : [Opting out of Data Caching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#opting-out-of-data-caching)

### graphql에 캐쉬
"React 캐시 함수"에 대한 내용은 다음과 같이 해석될 수 있습니다:

React 캐시 함수는 함수의 반환 값을 메모이제이션(기억)하는 데 사용할 수 있습니다. 이를 통해 동일한 함수를 여러 번 호출하면서 한 번만 실행할 수 있습니다.

fetch 요청은 자동으로 메모이제이션되므로, React 캐시로 감쌀 필요가 없습니다. 그러나 fetch API가 적합하지 않은 사용 사례에 대해 데이터 요청을 수동으로 메모이제이션하기 위해 캐시를 사용할 수 있습니다. 예를 들어, 일부 데이터베이스 클라이언트, CMS 클라이언트 또는 GraphQL 클라이언트 등입니다.

즉, 이 기능은 동일한 함수를 반복적으로 호출해야 하는 경우에 유용하며, 특히 데이터 요청과 같은 비용이 많이 드는 작업을 최적화하는 데 도움이 됩니다. 이렇게 하면 한 번만 실행하고 그 결과를 재사용하여 성능을 향상시킬 수 있습니다.

> 출처 : [React Cache Function](https://nextjs.org/docs/app/building-your-application/caching#react-cache-function)