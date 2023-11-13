# GITHUB API를 이용한 블로그

특정 저장소 데이터를 GITHUB API를 이용하여 블로그를 생성한 프로젝트입니다.

## 시간 및 인원

프로젝트 인원 : 1명
일정 : 2023.10 ~ 2023.11

## 폴더 구조

📂 src  
┗ 📂 app  
&ensp;┗ 📂 _api : api 관련 내용  
&ensp;┗ 📂 _components  : 컴포넌트 관련 내용  
&ensp;&ensp;&ensp;┗ 📂 _cc  : 클라이언트  
&ensp;&ensp;&ensp;┗ 📂 _sc  : 서버  
&ensp;┗ 📂 markdown  : 마크다운 관련 페이지  
&ensp;┗ 📂 records  : 저장소 데이터 관련 페이지  
&ensp;┗ 📂 storages   : 저장소 관련 페이지  

## 실행 방법

```bash
git clone https://github.com/codingjwp/records-project.git
cd records-project
yarn && yarn dev
```

## 기능

- Github Graphql API중 query(GET) 부분을 이용한 데이터 가져오기
- NextJS App Router를 이용한 프로젝트 작성(version 13)
  - Data Fetching
  - Server Components를 최대한 사용
- Github Pinned 되어있는 저장소 가져오기
- Github의 contributions 값 가져오기
- 특정 저장소 markdown 목록 가져오기
  - markdown 데이터를 표시하기

## 사용 라이브러리

