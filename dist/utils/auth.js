import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
class HashService {
    createToken(information) {
        return jsonwebtoken.sign({ information }, process.env.JWT_SECRET, {
            expiresIn: "1hr",
        });
    }
    verifyToken(token) {
        return jsonwebtoken.verify(token, process.env.JWT_SECRET);
    }
    async encryptPassword(password) {
        return await bcrypt.hash(password, 12);
    }
    async decryptPassword(password, hashPassowrd) {
        return await bcrypt.compare(password, hashPassowrd);
    }
}
export const hashService = new HashService();
//# sourceMappingURL=auth.js.map