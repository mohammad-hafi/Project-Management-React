import { createContext, useState, useContext, type ReactNode } from "react";
import { login as loginRequest } from "../api/auth.api";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "./tokenStorage";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(getAccessToken),
  );

  async function login(email: string, password: string) {
    const response = await loginRequest({ email, password });

    setAccessToken(response.accessToken);

    setIsAuthenticated(true);
  }

  function logout() {
    removeAccessToken();
    setIsAuthenticated(false);
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
