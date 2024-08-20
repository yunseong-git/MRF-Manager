import { models } from "../../models";

export class authController {
    constructor() {
        this.userModel = new models.userModel()
        this.adminModel = new models.adminModel();
    }

    // 로그인 처리
    async login(req, res, next) {
        try {
            const { id, password, isAdmin } = req.body;

            if (isAdmin == true) {//관리자 로그인
                //추후 로직 추가 예정
            }
            else { //유저 로그인
                const user = await this.userModel.login(id, password);
                if (user) {
                    res.status(200).json({ message: "환영합니다", user });
                } else {
                    res.status(401).json({ message: "잘못된 정보입니다. 다시 입력해주세요" });
                }
            }
            ;
        } catch (err) {
            next(err);
        }
    }

    // 로그아웃 처리
    async logout(req, res, next) {
        try {
            res.status(200).json({ message: "로그아웃 되었습니다." });
        } catch (err) {
            next(err);
        }
    }

    // 토큰 리프레쉬 처리
    async refreshToken(req, res, next) {
        try {
            res.status(200).json({ message: "토큰이 갱신되었습니다." });
        } catch (err) {
            next(err);
        }
    }

    // 회원가입 처리
    async registerUser(req, res, next) {
        try {
            const { id, name, birthDate, password } = req.body;
            const user = await this.userModel.register(id, name, birthDate, password);
            if (user) {
                res.status(201).json({ message: "회원가입 성공! 로그인을 진행해주세요", user });
            } else {
                res.status(400).json({ message: "회원가입에 실패하였습니다." });
            }
        } catch (err) {
            next(err);
        }
    }

    // 비밀번호 변경 처리
    async findId(req, res, next) {
        try {
            const {name, birthDate} = req.body;
            const user = await this.userModel.findUserId(name, birthDate);
            if (user) {
                res.status(201).json({ message: "회원님의 ID는 ", user });
            } else {
                res.status(400).json({ message: "존재하지 않는 회원정보입니다." });
            }
        } catch (err) { 
            next(err);
        }
    }

    async resetPassword(req, res, next) {
        try {
            const {id, name, birthDate} = req.body;
            const user = await this.userModel.checkUser(id, name, birthDate);
            if (user) {
                const reset = await this.userModel.updatePassword(id, name, birthDate);
                res.status(201).json({ message: "비밀번호가 초기화되었습니다.", user });
            } else {
                res.status(400).json({ message: "존재하지 않는 회원정보입니다." });
            }
        } catch (err) {
            next(err);
        }
    }

    // 비밀번호 변경 처리
    async updatePassword(req, res, next) {
        try {
            const {id, password} = req.body;
            res.status(200).json({ message: "비밀번호가 변경되었습니다." });
        } catch (err) {
            next(err);
        }
    }

    // 회원탈퇴 처리
    async deleteUser(req, res, next) {
        try {
            res.status(200).json({ message: "회원탈퇴가 완료되었습니다." });
        } catch (err) {
            next(err);
        }
    }
}