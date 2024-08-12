import database from "../../utils/database";

export class adminModel {
    async login(militaryId, password) {
        try {
            const query = 'SELECT * FROM users WHERE militaryId = ?';
            const [rows] = await database.promise().query(query, [militaryId]);
            const user = rows[0];

            if (user && bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            console.error('DB Error:', error);
            throw new Error('Database error');
        }
    }

    async register(militaryId, name, birthDate, password) {
        try {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const query = 'INSERT INTO users (militaryId, name, birthDate, password) VALUES (?, ?, ?, ?)';
            const [result] = await database.promise().query(query, [militaryId, name, birthDate, hashedPassword]);
            return result;
        } catch (error) {
            console.error('DB Error:', error);
            throw new Error('Database error');
        }
    }

    // 추가적인 함수들도 비슷한 방식으로 작성
}