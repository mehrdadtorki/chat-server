const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userDataAccessLayer = {
  userRegistration: async (data) => {
    const { username, email, password } = data;

    if (!username || !email || !password) {
      return new Error("Missing required values: username, email, or password");
    }

    try {
      const exsistedUsername = await new Promise((resolve, reject) => {
        db.get(
          "SELECT * FROM users WHERE username = ?",
          [username],
          (err, row) => {
            if (err) reject(err);
            resolve(row);
          }
        );
      });
      if (exsistedUsername) {
        throw new Error("The user with this username is already exsist");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await new Promise((resolve, reject) => {
        db.run(
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
          [username, email, hashedPassword],
          (err) => {
            if (err) reject(err);
            resolve(row);
          }
        );
      });

      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  userLogin: async (data) => {
    const { username, password } = data;

    if (!username || !password) {
      throw new Error("Missing required fields: username and password");
    }

    try {
      const foundUser = await new Promise((resolve, reject) => {
        db.get(
          "SELECT * FROM users WHERE username = ?",
          [username],
          (err, row) => {
            if (err) return reject(err);
            resolve(row);
          }
        );
      });

      if (!foundUser) {
        throw new Error("User not found");
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        foundUser.password
      );

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      // Generate JWT token
      const token = jwt.sign(
        { id: foundUser.id, username: username },
        "SECRET_KEY",
        {
          expiresIn: "1d",
        }
      );
      return {
        token,
        user: {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
          profileImage: foundUser.profileImage,
        },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = userDataAccessLayer;
