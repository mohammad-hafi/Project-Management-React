import { createContext, useState, useContext, type ReactNode } from "react";
import { login as loginRequest } from "../api/auth.api";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "./tokenStorage";

type AuthContextType = {
  isAuthenticated: boolean;
};
