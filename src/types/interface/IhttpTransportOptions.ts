import Iobject from "./Iobject";

export default interface IhttpTransportOptions {
  data? : object,
  timeout? : number
  type? : string
  headers? : Iobject
  method : string
}
