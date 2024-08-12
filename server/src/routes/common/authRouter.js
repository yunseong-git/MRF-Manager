import { Router } from "express";
import { authController } from "../../controllers/user/authController";

/**유저의 인증/인가에 대한 서버측 라우터*/
export class authRouter {
    router;
    path = "/auth";
    controller;

    constructor() {
        this.router = Router();
        this.controller = new authController();
        this.init();
    }

    init() {
        //get Method
        this.router.post("/login", this.controller.login.bind(this.controller)); //로그인
        this.router.post("/logout", this.controller.logout.bind(this.controller)); //로그아웃
        this.router.post("/refresh",  this.controller.refreshToken.bind(this.controller)); //토큰 리프레쉬

        this.router.post("/register", this.controller.registUser.bind(this.controller)); //회원가입
    }
}
