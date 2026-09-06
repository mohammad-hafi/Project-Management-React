import { useState, type ReactNode } from "react";
import { AuthContext } from "./authContextValue";
import { login as loginRequest } from "../api/auth.api";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "./tokenStorage";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(getAccessToken()),
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
