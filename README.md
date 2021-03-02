# 프로젝트 설명 - BDD-case-study

TDD / BDD를 적용해보며 공부.

## 사용 스택 및 개발 환경

- React
- Jest, Jest-Dom, testing-library/react
- React-Query
- Formatting : TSlint, prettier, Husky
- CI/CD Tool : Travis CI, Coveralls

## 테스트 커버리지

[![Coverage Status](https://coveralls.io/repos/github/Seunghyum/BDD-case-study/badge.svg)](https://coveralls.io/github/Seunghyum/BDD-case-study)

| Statements                  | Branches                | Functions                 | Lines                |
| --------------------------- | ----------------------- | ------------------------- | -------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-93.02%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-55.56%25-red.svg) | ![Functions](https://img.shields.io/badge/Coverage-90.91%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/Coverage-95%25-brightgreen.svg)    |

## 작업 내용 및 배운점

### ✅ 프리즌테이션 컴포넌트(Stateless)

- 예시 : ```src/components/LifestyleCard```
- 배운점
  - TDD 처럼 해당 컴포넌트의 props 설정값들이 제대로 작동하는지는 TDD처럼 함수별, 기능별로 테스트 하는게 적합
  - A컴포넌트가 사용하는 B컴포넌트의 기능테스트는 B컴포넌트의 단위 테스트에서 진행한다고 가정하고 제외하는 것이 테스트에 의존성을 막을 수 있음.
    > 예를들어, 
    > LifestyleCard안에서 사용하는 src/components/buttons/BookmarkButton 컴포넌트는 props 설정값에 따라 북마크 아이콘의 색상이 변해야 함.
    > LifestyleCard 안에서 BookmarkButton를 테스트할 경우 테스트에 *의존성이 생기김*
    > BookmarkButton 컴포넌트 테스트는 해당 테스트안에서 동작한다고 가정하고 스킵.

### 컨테이너 컴포넌트(Stateful)

- 예시 : ```src/containers/LifestyleCardListContainer.tsx```
- 기능 : LifestyleCard의 리스트를 관리하는 컨테이너
  - 필터링 기능 - 북마크만 볼 수 있게. 서버에 북마크한 데이터를 업데이트 하지 않으므로 프론트엔드에서 북마크한 리스트를 저장함.
  - 페이지 무한스크롤

### ✅ 서버 API 요청 로직(React-Query & Hook)

- with React-Query & Fetch API
- 예시 : ```src/hooks/useLifestyleList.tsx```
- 기능
  - 서버 API 콜로 데이터를 가져옴.
  - React Hook으로 래핑하여 bookmark 한 데이터들도 따로 다룸.
  - sessionStorage에 저장하여 컨트롤.

- 작업 설명 [issue 4](https://github.com/Seunghyum/TDD-BDD-case-study/issues/4)
  - mock으로 실제 API 콜이 아닌 fixture를 읽어와 실행하는 것으로 작업.

- 테스트 대상
  - [x] React-Query의 주기적 패치 -> cachTime 옵션
  - [x] 북마크 체크 추가 & 삭제 로직 검증
  - ~~sessionStorage에 재대로 저장하고 있는지 검증~~ -> 유저 경험상 앱을 새로고침했을 때 모든 데이터가 리셋되는 것이 더 자연스러움. 

- 배운점
  - React-Query를 이용하여 품목 리스트같은 catchTime(캐싱시간), staleTime(업데이트)가 중요한 데이터들을 캡슐화해서 체계적으로 관리할 수 있음.
  - plugin을 이용해서 localstorage, sessionstorage와 연동하여 쓸 수도 있음 - [createLocalStoragePersistor plugin](https://react-query.tanstack.com/plugins/createLocalStoragePersistor)
  - 상태관리 툴은 데이터 성격에 따라 아래와 같은 경우를 나누어 사용하면 될 것 같다.
    - 서버와 동기화와 캐싱등의 관리가 중요한 데이터 : React-Query / SWR
    - 유저정보와 같이 한번 받아서 동기화가 중요하지 않고 firebase같은 비동기 처리 로직가 많이 필요한 경우 : Redux / Redux-Saga or Thunk
  - Redux-Saga or Thunk 등의 비동기 로직 처리가 많이 필요 없는 경우 굳이 Redux를 쓸 이유는 없을 것 같다. 유저 정보도 Custom hook 모듈화해서 브라우저 저장소에 저장하여 쓰면 됨.
  - 참고
    - [React-Query Caching 라이프 사이클]https://react-query.tanstack.com/guides/caching

# 결론

## 상태관리 툴은 데이터 성격에 따라 아래와 같은 경우를 나누어 사용하면 될 것 같다

- 서버와 동기화와 캐싱등의 관리가 중요한 데이터 : React-Query / SWR
- 유저정보와 같이 한번 받아서 동기화가 중요하지 않고 firebase같은 비동기 처리 로직가 많이 필요한 경우 : Redux / Redux-Saga or Thunk
- Redux-Saga or Thunk 등의 비동기 로직 처리가 많이 필요 없는 경우 굳이 Redux를 쓸 이유는 없을 것 같다. 유저 정보도 Custom hook 모듈화해서 브라우저 저장소에 저장하여 쓰면 됨.

## 컴포넌트, 모듈의 테스트는 그것의 성격별로 다른 컨셉으로 작성

- 프리즌테이션 컴포넌트(Stateless), 기능모듈(ex-서버 API 요청) : TDD처럼... 해당 컴포넌트의 기능별, props별로
- 컨테이너 컴포넌트(Stateful) : BDD처럼... 유저의 행동시나리오대로

# 개념정리

## BDD(Behaviour-Driven Development)란?

TDD는 테스트 자체에 집중. BDD는 비즈니스 요구사항에 집중.
BDD는 시나리오를 기반으로 테스트 케이스를 작성하며 함수 단위 테스트를 권장하지 않는다.

위의 내용을 개발 측면에서 더 간략하게 정리하면 테스트 대상의 상태 변화를 테스트하는 것이다.

테스트 대상은 A 상태에서 출발하며(Given) 어떤 상태 변화를 가했을 때(When) 기대하는 상태로 완료되어야 한다. (Then)

또는 Side Effect가 전혀 없는 테스트 대상이라면 테스트 대상의 환경을 A 상태에 두고(Given) 어떤 행동을 요구했을 때(When) 기대하는 결과를 돌려받아야 한다. (Then)

- Feature : 테스트에 대상의 기능/책임을 명시한다.
- Scenario : 테스트 목적에 대한 상황을 설명한다.
- Given : 시나리오 진행에 필요한 값을 설정한다.
- When : 시나리오를 진행하는데 필요한 조건을 명시한다.
- Then : 시나리오를 완료했을 때 보장해야 하는 결과를 명시한다

## 참고

- [pop it 블로그 링크](https://www.popit.kr/bdd-behaviour-driven-development%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B0%84%EB%9E%B5%ED%95%9C-%EC%A0%95%EB%A6%AC/)
- [실용적인 프론트엔드 테스트 전략 1](https://meetup.toast.com/posts/174)

## 좋은 글

### 좋은 테스트의 조건

[원본 글 링크](https://meetup.toast.com/posts/174)

테스트의 기회 비용을 가늠해보기 위해서는 좋은 테스트가 무엇인지를 알아야 한다. 어떤 테스트 코드를 작성하느냐에 따라서 작성이나 유지보수에 드는 비용도 다르고, 얻을 수 있는 효과도 다르기 때문이다.

그러면 어떤 테스트가 좋은 테스트일까? 사실 이 질문에 대답하는 것은 참 어렵다. 테스트의 가치는 애플리케이션의 성격, 개발 도구 및 언어, 사용자 환경 등 다양한 요인에 의해 영향을 받기 때문이다. 하지만 비록 완벽한 테스트의 기준을 잡을 수는 없어도, 좋은 테스트가 공통적으로 갖고 있는 특징들에 대해서는 아래 5가지 정도로 정리할 수 있을 것 같다.

#### 1. 실행 속도가 빨라야 한다

테스트의 실행 속도가 빠르다는 것은 코드를 수정할 때마다 빠른 피드백을 받을 수 있다는 의미이다. 이는 개발 속도를 빠르게 하고, 테스트를 더 자주 실행할 수 있도록 한다. 결과를 보기 위해 수십 분을 기다려야 하는 테스트는 개발 과정에서 거의 무용지물에 가까울 것이다.

#### 2. 내부 구현 변경 시 깨지지 않아야 한다

이 말은 "인터페이스를 기준으로 테스트를 작성하라"거나 "구현 종속적인 테스트를 작성하지 말라"는 지침과 같은 맥락이라 볼 수 있다. 좀 더 넓은 관점에서는 테스트의 단위를 너무 작게 쪼개는 경우도 해당된다. 작은 리팩토링에도 테스트가 깨진다면 코드를 개선할 때 믿고 의지할 수 없을 뿐 아니라, 오히려 테스트를 수정하는 비용을 발생시켜 코드 개선을 방해하는 결과를 낳게 된다.

#### 3. 버그를 검출할 수 있어야 한다

달리 표현하면 "잘못된 코드를 검증하는 테스트는 실패해야 한다"라고 할 수 있다. 테스트가 기대하는 결과를 구체적으로 명시하지 않거나 예상 가능한 시나리오를 모두 검증하지 않으면 제품 코드에 있는 버그를 발견하지 못할 수 있다. 또한 모의 객체(Mock)를 과하게 사용하면 의존성이 있는 객체의 동작이 바뀌어도 테스트 코드가 연결 과정에서의 버그를 전혀 검출하지 못하게 된다. 그러므로 테스트 명세는 구체적이어야 하며, 모의 객체의 사용은 최대한 지양하는 것이 좋다.

#### 4. 테스트의 결과가 안정적이어야 한다

어제 성공했던 테스트가 오늘은 실패하거나, 특정 기기에서 성공했던 테스트가 다른 기기에서는 실패한다면 해당 테스트를 신뢰할 수 없을 것이다. 즉, 테스트는 외부 환경의 영향을 최소화해서 언제 어디서 실행해도 동일한 결과를 보장해야 한다. 이러한 외부 환경은 현재 시간, 현재 기기의 OS, 네트워크 상태 등을 포함하며, 직접 조작할 수 있도록 모의 객체나 별도의 도구를 활용해야만 한다.

#### 5. 의도가 명확히 드러나야 한다

제품 코드의 가독성이 중요하다는 것은 이제 누구나 인정하는 사실이다. 좋은 품질의 코드는 "기계가 읽기 좋은" 코드가 아닌 "사람이 읽기 좋은" 코드이다. 테스트 코드도 품질을 높이기 위해 제품 코드와 동일한 기준을 갖고 관리해야 한다. 즉, 테스트 코드를 보고 한 눈에 어떤 내용을 테스트하는지를 파악할 수 있어야 한다. 그렇지 않으면 추후에 해당 코드를 수정하거나 제거하기가 어려워져서 관리 비용이 늘어나게 된다. 테스트 준비를 위한 장황한 코드가 반복해서 사용되거나 결과를 검증하는 코드가 불필요하게 복잡하다면 별도의 함수 또는 단언문을 만들어서 추상화시키는 것이 좋다.
