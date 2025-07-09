import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "your-default-secret-key";

// Generate a JWT token for secure communication
export const generateToken = (serviceName: string): string => {
  const payload = { service: serviceName, timestamp: new Date() };

  // Token expires in 1 hour
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  return token;
};

// Verify JWT token to authenticate service
export const verifyToken = (
  token: string
): { service: string; timestamp: string } | null => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as {
      service: string;
      timestamp: string;
    };
    return decoded;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Invalid Token:", error.message);
    } else {
      console.error("Unknown error during token verification.");
    }
    return null;
  }
};
