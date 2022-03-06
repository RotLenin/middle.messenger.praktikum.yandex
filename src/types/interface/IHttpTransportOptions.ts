export default interface IHttpTransportOptions {
  data? : Record<string, any>,
  timeout? : number
  type? : string
  headers? : Record<string, any>
  method? : string
}
