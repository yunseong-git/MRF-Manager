import database from "../../utils/database";

import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export class userModel {
    async findUserById(id) { // user을 반환
        try {
            const query = 'SELECT * FROM users WHERE id = ?';
            const [result] = await database.promise().query(query, [id]);

            const user = result[0];
            return user;

        } catch (error) {
            console.error('DB Error:', error);
            throw new Error('Database error');
        }
    }

    async login(id, password) {
        try {
            const user = await this.findUserById(id);

            if (user && await bcrypt.compare(password, user.password)) {
                return user;
            } else {
                return null;
            }

        } catch (error) {
            console.error('DB Error:', error);
            throw new Error('Database error');
        }
    }

    async signUp(id, name, birthDate, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.PASSWORD_SALT));

            const query = 'INSERT INTO users (id, name, birthDate, password) VALUES (?, ?, ?, ?)';
            const [result] = await database.promise().query(query, [id, name, birthDate, hashedPassword]);

            return result;

        } catch (error) {
            console.error('DB Error:', error);
            throw new Error('Database error');
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
            throw new Error('Database error');
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
            throw new Error('Database error');
        }
    }
}