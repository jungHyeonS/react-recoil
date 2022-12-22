import {selector} from "recoil"
import { countAtom } from "./atom"



//selector는 전역상태 값을 기반으로 어떤 계산을 통해 파생된 상태를 반환하는 순수함수이다
export const countNextState = selector({
  key : "countNextState",
  get : ({get}) => {
    //countert상태를 가져오고 해당 상태에서 *2한값을 리턴합니다
    return get(countAtom) * 2;
  }
});