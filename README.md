# 깃 저장소 내용 보기 프로젝트

특정 저장소에 있는 md 파일을 볼 수 있도록 하는 프로젝트

## 폴더 구조

📂 src  
┗ 📂 app  
&ensp;┗ 📂 _components  
&ensp;┗ 📂_fonts  
&ensp;┗ 📂 storages



## 에러 발생

[test](https://stackoverflow.com/questions/76903959/nextjs-typeerror-cannot-read-properties-of-null-reading-removechild-when)

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

> 출처 : [Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)

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

> 출처 : [Next.js Cache Function](https://nextjs.org/docs/app/building-your-application/caching#react-cache-function)  
> 출처 : [React Cache Function](https://react.dev/reference/react/cache)  

### api 라우터 만들기 
> 출처: [router.ts](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)  
> 출처: [사용법](https://maryetokwudo.hashnode.dev/nextjs-13-route-handlers-with-typescript)  


```typescript
export async function GET() {
  const now = new Date();
  const year = new Date(now.getFullYear(), 0, 1, 0, 0, 0).toISOString();
  const toDay = now.toISOString();
  const res = await fetch(`api 링크`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer 토큰 값`,
    },
    body: JSON.stringify({
      query: `
        query {
          viewer {
            pinnedItems(first: 10) {
              totalCount
            }
          contributionsCollection(from: "시간" to: "시간") {
            contributionCalendar {
              totalContributions
            }
          }
        }
      }`,
    })
  });
  if (!res.ok)
    throw new Error("fetch error response");
  const { data } = await res.json();
  return Response.json({
    totalPinStorages: data.viewer.pinnedItems.totalCount,
    totalContributions: data.viewer.contributionsCollection.contributionCalendar.totalContributions
  });
}
```
