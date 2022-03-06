export default interface IValidate{
  errors : Record<string, any>;
  data : Record<string, any>;
  status : boolean;
}
