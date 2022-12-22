import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { countAtom } from "../store/atom";


const Counter = () => {

  //useRecoilState hook은 atom의 상태를 get,set 할수있다
  const [count,setCount] = useRecoilState(countAtom);

  //get만 할경우
  // const count = useRecoilValue(countAtom);
  
  //set만 할경우
  // const setCount = useSetRecoilState(countAtom)

  const increase = () => {
    setCount(count+1);
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => increase()}>+</button>
    </div>
  )
}

export default Counter;