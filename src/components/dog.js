import { useRecoilValue } from "recoil"
import { randomDog } from "../store/selectors"


const Dog = () => {
  const imageUrl = useRecoilValue(randomDog);

  return (
    <div>
      <img src={imageUrl} width="100px" height="100px"/>
    </div>
  )
}

export default Dog