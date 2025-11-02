// utils/bcrypt.js
import bcrypt from "bcryptjs"; // or 'bcrypt'

const SALT_ROUNDS = 10;

// 🔹 Hash password
export const hashPassword = async (password) => {
  try {
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    return hashed;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

// 🔹 Compare passwords
export const comparePassword = async (plain, hashed) => {
  try {
    const match = await bcrypt.compare(plain, hashed);
    return match;
  } catch (error) {
    console.error("Error comparing password:", error);
    throw error;
  }
};
