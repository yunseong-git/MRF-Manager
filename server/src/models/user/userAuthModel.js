import database from "../../utils/database";
import { userModel } from "./userModel";
import { jwtIssue } from "../../middlewares/jwtIssue";

import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export class userAuthModel {
    userModel;

    constructor() {
        this.userModel = new userModel;
    }

    async checkUser(id, password) { 
        try {
            const user = await this.userModel.findUserById(id);
            if (await bcrypt.compare(password, user.password)) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            console.error('CHECK USER ERROR', error);
            throw error;
        }
    }

    async createTokens(id) {
        try {
            const accessToken = jwt.sign({ id: id }, process.env.JWT_KEY, {
                expiresIn: "2h",
            });
            const refreshToken = jwt.sign({ id: id }, process.env.JWT_KEY, {
                expiresIn: "14d",
            });
            return { accessToken, refreshToken };
        } catch (error) {
            console.error('CREATE TOKENS ERROR', error);
            throw error;
        }
    }

    async createUser(id, name, birthDate, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.PASSWORD_SALT));

            const query = 'INSERT INTO users (id, name, birthDate, password) VALUES (?, ?, ?, ?)';
            const [result] = await database.promise().query(query, [id, name, birthDate, hashedPassword]);

            return result;

        } catch (error) {
            console.error('DB Error:', error);
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const query = 'DELETE FROM users WHERE id = ?';
            const [result] = await database.promise().query(query, id);

            return result;
        } catch (error) {
            console.error('DELETE USER Error:', error);
            throw error;
        }
    }

    async resetPassword(id) { // 사용자가 비밀번호를 분실했을 때, 초기화
        try {
            const user = await this.findUserById(id);

            const initialPassword = await bcrypt.hash(user.birthDate, parseInt(process.env.PASSWORD_SALT));
            const query = 'UPDATE users SET password = ? WHERE id = ?';
            const [result] = await database.promise().query(query, [initialPassword, user.id]);

            return result;

        } catch (error) {
            console.error('DB Error:', error);
            throw error;
        }
    }

    async updatePassword(id, password) { // 사용자 비밀번호 변경
        try {
            const newPassword = await bcrypt.hash(password, parseInt(process.env.PASSWORD_SALT));
            const query = 'UPDATE users SET password = ? WHERE id = ?';
            const [result] = await database.promise().query(query, [newPassword, id]);

            return result;

        } catch (error) {
            console.error('DB Error:', error);
            throw error;
        }
    }
}