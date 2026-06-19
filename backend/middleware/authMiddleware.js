const JWT = require("jsonwebtoken");
const { promisify } = require("util");

const verifyJWT = promisify(JWT.verify);

module.exports = async (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check if header exists
    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "No authorization header provided",
      });
    }

    // Split and validate format
    const parts = authHeader.trim().split(/\s+/);

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).send({
        success: false,
        message: "Invalid token format. Use: Bearer <token>",
      });
    }

    const token = parts[1];

    // Check if token exists
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token not provided",
      });
    }

    // Check JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in .env");

      return res.status(500).send({
        success: false,
        message: "Server configuration error",
      });
    }

    // Verify token
    const decoded = await verifyJWT(token, process.env.JWT_SECRET);

    // Store user id in request
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).send({
        success: false,
        message: "Token has expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).send({
        success: false,
        message: "Invalid token.",
      });
    }

    return res.status(401).send({
      success: false,
      message: error.message,
    });
  }
};