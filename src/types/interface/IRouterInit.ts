import IRoute from "./IRoute";

export default interface IRouterInit {
  routes : IRoute[],
  defaultRoute : IRoute,
  loginRoute : string,
  noAuthRoute : string[],
  errorRoute: IRoute;
}
