import { useRecoilValue } from "recoil";
import { countNextState } from "../store/selectors";


const DoubleCounter = () => {

  //useRecoilValue 훅으로 selectors에 접근할수있다
  const nextCount = useRecoilValue(countNextState);
  return (
    <div>
      <p>{nextCount}</p>
    </div>
  )
}

export default DoubleCounter;