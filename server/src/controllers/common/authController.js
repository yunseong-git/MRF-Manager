import { models } from "../../models";

export class authController {
    constructor() {
        this.userModel = new models.userModel()
        this.userAuthModel = new models.userAuthModel()
        this.adminAuthModel = new models.adminAuthModel();
    }

    // 로그인 처리
    async login(req, res, next) {
        try {
            const { id, password, isAdmin } = req.body;

            if (isAdmin == true) {//관리자 로그인
                //추후 로직 추가 예정
            }
            else { //유저 로그인
                await this.userAuthModel.checkUser(id, password);
                const token = await this.userAuthModel.createTokens(id)
                if (token) {
                    res.status(200).json(token);
                } else {
                    res.status(401).json({ message: "잘못된 정보입니다. 다시 입력해주세요" });
                }
            }
            ;
        } catch (err) {
            next(err);
        }
    }

    //회원가입
    async registUser(req, res, next) {
        try {
            const { id, password, name, birthDate } = req.body;

            if (await this.userModel.searchUserById(id)) {//관리자 로그인
                res.status(401).json({ message: "이미 존재하는 회원정보입니다. ID를 확인해주세요." });
            }
            else { 
                const user = await this.userAuthModel.createUser(id, password, name, birthDate);
                if (user) {
                    res.status(200).json({ message: "회원가입이 완료되었습니다. 해당 정보로 로그인해주세요." });
                } else {
                    res.status(401).json({ message: "회원가입 중 오류가 발생하였습니다. 다시 시도해주세요" });
                }
            }
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

    async deleteUser(req, res, next) {
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
            const { name, birthDate } = req.body;
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
            const { id, name, birthDate } = req.body;
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
            const { id, password } = req.body;
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