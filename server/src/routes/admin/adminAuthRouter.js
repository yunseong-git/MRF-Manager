import { Router } from "express";

/**유저 인증/인가 라우터 */
export class adminAuthRouter {
  router;
  path = "/land";
  //controller;

  constructor() {
    this.router = Router();
    //this.controller = new landController();
    this.init();
  }

  init() {
  }

}
