


export async function getRandomDog(){
  try{
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    return data.message;
  }catch(err){
    console.log(err);
  }
}