import Iroute from "./Iroute";

export default interface IrouterInit {
  routes : Iroute[],
  defaultRoute : Iroute,
  loginRoute : string,
  noAuthRoute : string[],
  errorRoute: Iroute;
}
