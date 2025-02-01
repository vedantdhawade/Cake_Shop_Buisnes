import jwt from "jsonwebtoken";

const AuthMiddleware = async (request, response, next) => {
  try {
    // Extract token from cookies or Authorization header
    const token =
      request.cookies?.accessToken ||
      request.headers?.authorization?.split(" ")[1];

    if (!token) {
      return response.status(401).json({
        success: false,
        message: "Token is required for authentication",
        error: true,
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWTKEY);
    if (!decoded) {
      return response.status(401).json({
        success: false,
        message: "Invalid or expired token",
        error: true,
      });
    }

    // Attach user ID to request object
    request.userId = decoded.id;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return response.status(401).json({
        success: false,
        message: "Token has expired",
        error: true,
      });
    } else if (error.name === "JsonWebTokenError") {
      return response.status(401).json({
        success: false,
        message: "Invalid token",
        error: true,
      });
    }

    // General error handling
    console.error("Authentication Error:", error);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: true,
    });
  }
};

export default AuthMiddleware;
