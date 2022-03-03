export default interface IhttpTransportOptions {
  data? : Record<string, any>,
  timeout? : number
  type? : string
  headers? : Record<string, any>
  method? : string
}
