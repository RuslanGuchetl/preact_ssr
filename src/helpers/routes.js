import {App} from "../routes/App/App";
import {About} from "../routes/About/About";
import {Login} from "../routes/Login/Login";
import {Protected} from "../routes/Protected/Protected";

export const routes = [
  {
    path: "/",
    component: App,
    exact: true,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/protected",
    component: Protected,
    isPrivate: true
  }
];
