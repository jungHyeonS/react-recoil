# React Recoil

### Recoil 설치
```
npm install recoil
```

### Atom
Atom은 기존의 Redux에서 쓰이는 store와 유사한 개념이며, 상태의 단위 입니다<br>
atom이 업데이트 되면 해당 atom을 구독하고 있던 모든 컴포넌트들의 state가 새로운 값으로 리렌더링 됩니다<br>
atom은 unique한 id인 key로 구분이 되고, 여러 컴포넌트에서 atom을 구독하고 있다면 그 컴포넌트들로 똑같은 상태를 공유합니다
```
//atom 선언
export const countAtom = atom({
  key : "countState", // 전역적으로 고유한 값
  default : 0 //초깃값
})


//useRecoilState로 atom 데이터 사용
//useRecoilState hook은 atom의 상태를 get,set 할수있다
const [count,setCount] = useRecoilState(countAtom);

//get만 할경우
// const count = useRecoilValue(countAtom);
  
//set만 할경우
// const setCount = useSetRecoilState(countAtom)

const increase = () => {
  setCount(count+1);
}
```

### Selector
Selector는 derived state입니다. 즉 파생된 state를 나타낼수 있습니다<br>
원래의 state를 그냥 가져오는 것이 아닌 get프로퍼티를 통해 state를 가공하여 반환할수있습니다
```
//selector 선언
//selector는 전역상태 값을 기반으로 어떤 계산을 통해 파생된 상태를 반환하는 순수함수이다
export const countNextState = selector({
  key : "countNextState",
  get : ({get}) => {
    //countert상태를 가져오고 해당 상태에서 *2한값을 리턴합니다
    return get(countAtom) * 2;
  }
});

const DoubleCounter = () => {

  //useRecoilValue 훅으로 selectors에 접근할수있다
  const nextCount = useRecoilValue(countNextState);
  return (
    <div>
      <p>{nextCount}</p>
    </div>
  )
}
```


### Recoil 비동기 처리
selector get을 사용하여 비동기 처리를 할수있습니다<br>
redux에서 비동기 처리를 할때는 redux-thunk 나 redux-saga와 같은 미들웨어를 통해<br>
action을 중간에 인터셉트하여 추가 동작을 수행하였습니다<br>
하지만 recoil에서 비동기 처리는 react의 일반 state의 흐름을 벗어나지 않고 거의 동일하게 흘러갑니다
```
//recoil 비동기 처리
export const randomDog = selector({
  key : "randomDog",
  get : async () => {
    const message = await getRandomDog();
    return message;
  }
})
```

### Suspense
React.Suspense는 컴폰너트가 읽어 들이고 있는 데이터가 아직 준비되지 않았다고 React에게 알려주는 일종의 매커니즘입니다<br>
데이터불러오기 -> 렌더링 시작 -> 데이터 불러오기 완료 순서로 동작하는 데이터 호출 로직에서 데이터 호출 완료 여부를 인지하여<br>
데이터를 불러오기를 완료할때까지 Fallback 속성 값으로 넣어준 컴포넌트를 표시합니다
```
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //Recoil 를 사용할려면 RecoilRoot를 감싸줘야한다
  <RecoilRoot>
    <React.Suspense fallback={<div>Loading...</div>}>
      <App />
    </React.Suspense>
  </RecoilRoot>
);
```

### 매개변수가 있는 비동기 데이터 다루기
Recoil Atom + Recoil selector를 사용하여 매개변수가 있는 비동기 데이터를 다룰수있습니다<br>
randomDog selector는 countAtom에 의존성을 가지고 있기 때문에 countAtom의 상태가 변경이 되면 radomDog에 get 메소드가 호출이 됩니다
```
export const countAtom = atom({
  key : "countState", // 전역적으로 고유한 값
  default : 0 //초깃값
})


//recoil 비동기 처리
export const randomDog = selector({
  key : "randomDog",
  get : async ({get}) => {
    const count = get(countAtom);
    const message = await getRandomDog(count);
    return message;
  }
})
```

### 비동기 에러 처리하기
비동기 요청은 일반적으로 로딩,성공,실패 세가지 상태를 가집니다<br>
<Dog/> 컴포넌트는 성공의 상태일때만 다루게 되고<br>
<React.suspense>를 사용하여 비동기 요청에 로딩 상태를 나타냈습니다<br>
<br>
React에서는 컴포넌에서 에러가 발생하면 모든 컴포넌트를 언마운트 시키게 됩니다<br>
작은 에러가 발생하더라도 애플리케이션 전체가 중단됩니다<br>
<br>
Error Boundary 플러그인을 사용하여 하위 컴포넌트 트리의 어디에서든 에러를 리포트하며 애플리케이션 중단<br>
대신 fallback UI를 보여주는 플러그인 입니다<br>
정확히는 렌더링중 발생하는 에러, React와 관련된 에러를 캐치합니다<br>

#### react-error-boundary 설치
```
npm i react-error-boundary
```

```
import React from "react";
import Counter from "./components/counter";
import Dog from "./components/dog";
import DoubleCounter from "./components/double_counter";
import {ErrorBoundary} from "react-error-boundary"

function App() {
  return (
    <>
      <Counter/>
      <DoubleCounter/>
      <ErrorBoundary fallback={<div>Error!</div>}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Dog/>
        </React.Suspense>
      </ErrorBoundary>
    </>
  );
}
export default App;
```

