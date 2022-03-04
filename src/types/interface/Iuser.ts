export default interface Iuser {
  id : number,
  avatar : string | null,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
  password? : string
}
