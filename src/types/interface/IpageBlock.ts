import Ilocals from './Ilocals';

export default interface IpageBlock extends Ilocals{
  template? : (locals : Record<string, any>) => string
}
