const { User } = require("../db/models");
const { verifyToken } = require("../helpers/jwt");
const { resError } = require("../helpers/response");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    // Token tidak ada?
    if (!token) {
      return resError(401, "Kamu harus login terlebih dahulu", res);
    } else {
      const decoded = verifyToken(token);
      if (!decoded) {
        return resError(401, "Invalid Token", res);
      }

      // Data user login ada tidak di data user
      const user = await User.findOne({
        where: {
          user_id: decoded.user_id,
        },
      });

      /*
        User login tidak ada atau 
        data access_token di data user tidak sama dengan refresh token yang ada di cookies
      */
      if (!user || user.access_token !== req.cookies.refresh_token) {
        return resError(401, "Unauthorized", res);
      }

      req.user = decoded;
      next();
    }
  } catch (error) {
    // Menangani kesalahan verifikasi token
    if (error.name === "JsonWebTokenError") {
      return resError(401, "Invalid Token", res);
    } else if (error.name === "TokenExpiredError") {
      return resError(401, "Token Expired", res);
    } else {
      return resError(500, "Interrver error", res);
    }
  }
};
