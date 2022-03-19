import IInput from './IInput';

export default interface IInputWithError extends IInput{
  errorText : string,
}
