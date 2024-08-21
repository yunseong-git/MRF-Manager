import database from "../../utils/database";

import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export class userSearchModel {
    /**id를통해 단일 유저 검색 / 반환값 : user */
    async searchUserById(id) { 
        try {
            const query = 'SELECT * FROM users WHERE id = ?';
            const [user] = await database.promise().query(query, id);
            return user;
        } catch (error) {
            console.error('No user in DB:', error);
            throw error;
        }
    }
    /**name이 일치하는 유저들을 검색 / 반환값 : user */
    async searchUserByName(name) { 
        try {
            const query = 'SELECT * FROM users WHERE name = ?';
            const [users] = await database.promise().query(query, name);
            return users;

        } catch (error) {
            console.error('No user in DB:', error);
            throw error;
        }
    }
    /**birthDate가 일치하는 유저들을 검색 / 반환값 : user */
    async searchUserByBirthDate(birthDate) { 
        try {
            const query = 'SELECT * FROM users WHERE birthDate = ?';
            const [users] = await database.promise().query(query, birthDate);
            return users;

        } catch (error) {
            console.error('No user in DB:', error);
            throw error;
        }
    }
}