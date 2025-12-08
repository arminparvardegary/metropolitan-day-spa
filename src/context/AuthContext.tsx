"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  signup: (name: string, email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin account
const ADMIN_EMAIL = "moeinbox55@gmail.com";
const ADMIN_PASSWORD = "12q12w12eQ@";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("spa_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    // Check admin account
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser: User = {
        email: ADMIN_EMAIL,
        name: "Admin",
        isAdmin: true,
      };
      setUser(adminUser);
      localStorage.setItem("spa_user", JSON.stringify(adminUser));
      return { success: true, message: "Welcome back, Admin!" };
    }

    // Check regular users
    const users = JSON.parse(localStorage.getItem("spa_users") || "[]");
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (foundUser) {
      const loggedInUser: User = {
        email: foundUser.email,
        name: foundUser.name,
        isAdmin: false,
      };
      setUser(loggedInUser);
      localStorage.setItem("spa_user", JSON.stringify(loggedInUser));
      return { success: true, message: `Welcome back, ${foundUser.name}!` };
    }

    return { success: false, message: "Invalid email or password" };
  };

  const signup = (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("spa_users") || "[]");
    
    // Check if email already exists
    if (users.some((u: any) => u.email === email)) {
      return { success: false, message: "Email already registered" };
    }

    // Add new user
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("spa_users", JSON.stringify(users));

    // Auto login
    const loggedInUser: User = {
      email,
      name,
      isAdmin: false,
    };
    setUser(loggedInUser);
    localStorage.setItem("spa_user", JSON.stringify(loggedInUser));

    return { success: true, message: "Account created successfully!" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("spa_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

