import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

class HashService {
  createToken(information: string) {
    return jsonwebtoken.sign({ information }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
  }

  verifyToken(token: string) {
    return jsonwebtoken.verify(token, process.env.JWT_SECRET);
  }

  async encryptPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }

  async decryptPassword(password: string, hashPassowrd: string) {
    return await bcrypt.compare(password, hashPassowrd);
  }
}

export const hashService = new HashService();
