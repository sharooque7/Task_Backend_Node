import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { GraphQLError } from "graphql";

class HashService {
  createToken(information: string) {
    return jsonwebtoken.sign({ information }, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    });
  }

  verifyToken(token: string) {
    // return jsonwebtoken.verify(token, process.env.JWT_SECRET);
    let decoded;
    try {
      decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: 401, message: "Please try again" },
        });
      }
      return decoded;
    } catch (error) {
      throw new GraphQLError("Invalid token / token expired please login", {
        extensions: { code: 401, message: "Token expired login again" },
      });
    }
  }

  async encryptPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }

  async decryptPassword(password: string, hashPassowrd: string) {
    return await bcrypt.compare(password, hashPassowrd);
  }
}

export const hashService = new HashService();
