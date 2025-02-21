import { areSetAndTheSameType as rset } from "are-set";
import { createServer } from "wsnet-server";

// Create an in-memory store for users
const users = new Map(); // Store user data with username as key

// Helper function to hash passwords (simple for demo purposes)
const hashPassword = (password) => {
  // Simple hash for demo (replace with a proper hashing mechanism in production)
  return password.split('').reverse().join('');
};

// Create the WebSocket server on port 28028
createServer({ port: 28028 }, async (client) => {
  let isAuth = false;

  // Handle incoming "auth" requests (login or create account)
  client.onGet("auth", (data) => {
    // Validate data format
    if (!rset(data, [["user", "string"], ["password", "string"]])) {
      return { error: "Invalid data format" };
    }

    const { user, password } = data;
    const hashedPassword = hashPassword(password);

    // Check if the user is trying to log in
    if (users.has(user)) {
      // User exists, check if passwords match
      const storedPassword = users.get(user);
      if (storedPassword === hashedPassword) {
        isAuth = true;
        return { message: "Login successful" };
      } else {
        return { error: "Incorrect password" };
      }
    } else {
      // User does not exist, offer to create an account
      return { message: "User not found. Would you like to create an account?" };
    }
  });

  // Handle "create account" request
  client.onGet("createAccount", (data) => {
    // Validate data format
    if (!rset(data, [["user", "string"], ["password", "string"]])) {
      return { error: "Invalid data format" };
    }

    const { user, password } = data;

    // Check if the user already exists
    if (users.has(user)) {
      return { error: "Username already exists" };
    }

    // Store the new user and their hashed password
    users.set(user, hashPassword(password));

    return { message: "Account created successfully!" };
  });

  // Optional: Handle logout logic
  client.onGet("logout", () => {
    if (isAuth) {
      isAuth = false;
      return { message: "Logged out successfully" };
    } else {
      return { error: "No active session found" };
    }
  });
});
