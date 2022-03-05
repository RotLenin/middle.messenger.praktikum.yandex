export default interface IhttpTransportOptions {
  data? : object,
  timeout? : number
  type? : string
  headers? : Record<string, any>
  method : string
}
