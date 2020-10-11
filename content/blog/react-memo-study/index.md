---
category: 'blog'
title: "React.useMemo 가볍게 살펴보기"
date: '2020-07-05'
---

### React.useMemo 적용 계기

- 한 페이지에서 API 호출을 4-5개 정도 하는데, api 한 개씩 fetch 될 때마다 모든 element 가 다시 렌더링 되는 것을 막기 위해 효율적인 상태 관리가 필요해졌다.
- 예를 들어, 해당 페이지에 새로운 데이터가 들어와서 업데이트를 하더라도, 그 페이지 안에 있는 xx 컴포넌트는 업데이트 이전과 이후의 데이터 값이 다르지 않다면? xx 컴포넌트는 재-렌더링을 하지 않는 게 효율적이다.
- 그러려면 해당 컴포넌트의 이전 데이터 (prevState) 값을 기억하고 있다가 새로운 값이랑 비교해야 한다. 
- 이런 경우, callback 혹은 memo 를 사용하는데 이 글에서는 memo에 더 집중해본다.


### React.useCallback() vs React.useMemo()

1. useCallback vs useMemo 차이점
- useCallback
  - 내가 call 할 수 있는 함수를 새로 생성해서 반환한다.
- [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo) 
  - 함수를 알아서 실행하고, 새로운 리턴값만 반환한다.
  - 선언된 컴포넌트/클래스 내부에서 사용 가능하다. (React.memo 는 상관 없음)

> 참조: [영문 블로그 useCallback vs useMemo](https://medium.com/@jan.hesters/usecallback-vs-usememo-c23ad1dc60)

### React.memo vs React.useMemo 사용 문법

React의 functional/stateless component 클래스에서 React.useMemo 를 적용하려고 보니, 쓰는 문법/syntax 가 다소 헷갈렸다. 검색하면서 아래와 같은 예제들을 찾을 수 있었다.

**React.memo**

- React.memo() 란, props가 부분적으로 변경되어도, 변경되지 않은 컴포넌트들은 re-rendering 하지 않게 하는 기법
- *[React.memo는 고차 컴포넌트(Higher Order Component)입니다. React.PureComponent와 비슷하지만 class가 아니라 함수 컴포넌트라는 점이 다릅니다.](https://reactjs.org/docs/react-api.html#reactmemo)*

```js
const MyComponent = React.memo(function MyComponent(props) {
  /* props를 사용하여 렌더링 */
  /* 유의점:  props 변화에만 영향을 줍니다. 
  React.memo로 감싸진 함수 컴포넌트 구현에 useState 또는 useContext 훅을 사용한다면,
  여전히 state나 context가 변할 때 다시 렌더링됩니다. */
});
```

**React.useMemo**
- 1번째 인자: 함수, 2번째 인자: dependencies
- `React.useMemo(()=>{ /*function*/ }, [dep])`
  - dep 데이터/상태(state) 주소값이 바뀌면, function이 재실행된다. 주소값이 바뀌지 않으면 실행되지 않는다. 
  - 유의점: 내부적으로 깊이가 있는 (겹겹이 key:value 형태인) 오브젝트의 경우, 오브젝트의 특정 value값이 바뀌어도 오브젝트의 주소값은 그대로일 수 있다. **즉, 내부 데이터의 내용이 바뀌었지만, 주소값은 바뀌지 않았으므로 업데이트가 되지 않을 수 있다.**

#### 불가능

```js
const MyComponent = React.useMemo(({input}) => { 
  return (<Component>{input}</Component>) 
}, [input])

export default MyComponent
```

#### 가능 (1)

```js
const MyComponent = ({input}) => { 
  return (
    React.useMemo(
      return(
        <Component><div>{input}*2</div></Component>
        ), [input])
  )
}
```

#### 가능 (2)

```js
const MyComponent = ({input}) => { 

 const render = React.useMemo((input) => { 
   <div>input*2</div>}, [input])
  return(
    <Component>{render}</Component>
  ) 
}
```

#### 가능 (3) - 현재 쓰고 있는 문법 형태

```js
const MyComponent = ({input}) => { 

  return( 
      React.useMemo(() => {
        <Component>
          <div>input*2</div>
        </Component>
      }, [input])
  )}
```

### 느낀점: React State 자체와 익숙해지기

리액트에서 리덕스, api fetch/axios 로 데이터를 통신하고 업데이트하다보면 props 보다 state 상태 관리에 더 많은 머리를 써야 한다는 걸 느꼈다. useMemo 뿐만 아니라 기본적인 state 관리에도 아직 헷갈리는 게 많아서 차근차근 여러 case들을 모아 정리하려고 한다. 


### Other Reference Links
- [리액트 공식 문서: 최적화 Optimizing Performance](https://reactjs.org/docs/optimizing-performance.html#avoid-reconciliation)
- [useCallback vs useMemo: 영문](https://medium.com/@jan.hesters/usecallback-vs-usememo-c23ad1dc60)
- [벨로퍼트 react memo](https://react.vlpt.us/basic/19-React.memo.html)
- [vingle 테크 블로그: react-렌더링-이해하기](https://medium.com/vingle-tech-blog/react-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f255d6569849)
- [리액트 usememo 튜토리얼 : 영문](https://www.digitalocean.com/community/tutorials/react-usememo)
- [리액트 공식블로그 - memoization: 영문](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization)
- [함수형 컴포넌트와 useCallback, useMemo: 영문](https://blog.bitsrc.io/optimize-your-react-functional-components-with-usecallback-and-usememo-34bb52bc9a13)

