import React, { createContext, useState, useContext } from "react";
import { useClient } from "./client";
import * as crypto from "../../utils/crypto";

const defaultUserData = {
  contacts: [],
  chats: {},
  notes: [],
  todos: [],
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const client = useClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!user || !password) return;

    const passwordHash = crypto.hash(password, 0, 3);
    const data = await client.get("auth", { user, passwordHash });

    if (data?.error) {
      confirm(data.error);
      return;
    }

    setIsAuthenticated(data.created);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (!user || !password) return;

    const passwordHash = crypto.hash(password, 0, 3);
    const userData = crypto.encrypt(password, JSON.stringify(defaultUserData));
    const data = await client.get("create-account", { user, passwordHash, userData })

    if (data?.error) {
      confirm(data.error);
      return;
    }

    setIsAuthenticated(data.created);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-lg shadow-md w-80"
        >
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <input
            type="text"
            placeholder="User"
            className="w-full p-2 mb-2 border rounded"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <br />
        <hr />
        <form
          onSubmit={handleCreateAccount}
          className="bg-white p-6 rounded-lg shadow-md w-80"
        >
          <h2 className="text-xl font-semibold mb-4">Create Account</h2>
          <input
            type="text"
            placeholder="User"
            className="w-full p-2 mb-2 border rounded"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, password }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const usePassword = () => useContext(AuthContext).password;
