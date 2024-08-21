import database from "../../utils/database";

export class adminAuthModel {
    async login(id, password) {
        try {
            const admin = await this.adminModel.findUserById(id);

            if (await bcrypt.compare(password, admin.password)) {
                const {token} = jwtIssue(admin.id)
                return token;
            } else {
                return null;
            }

        } catch (error) {
            console.error('NO MATCH PASSWORD', error);
            throw {status: 403, message:"로그인 중 오류가 발생하였습니다."}
        }
    }



    // 추가적인 함수들도 비슷한 방식으로 작성
}