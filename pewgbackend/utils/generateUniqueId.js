import { v4 as uuidv4 } from 'uuid';

export const GenerateUniquId = () =>{
  let value = uuidv4().split("-")
  value = value.join("")
  return value
}

