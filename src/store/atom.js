
import { atom } from "recoil";

export const countAtom = atom({
  key : "countState", // 전역적으로 고유한 값
  default : 0 //초깃값
})