export default interface Ivalidate{
  errors : Record<string, any>;
  data : Record<string, any>;
  status : boolean;
}
