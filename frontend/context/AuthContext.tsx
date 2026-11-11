"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getSession, signIn, signOut } from "@/utils/api";
import { AuthContextProps } from "@/types";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

/* Whether the visitor is signed in as admin. The session itself lives in an
 * httpOnly cookie the page cannot read, so this asks the server once on load.
 * It only decides which buttons to show — the real check happens in the
 * /api routes, so flipping this in devtools gains nothing. */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getSession()
      .then(setIsAdmin)
      .catch(() => setIsAdmin(false))
      .finally(() => setChecked(true));
  }, []);

  const login = useCallback(async (password: string) => {
    setIsAdmin(await signIn(password));
  }, []);

  const logout = useCallback(async () => {
    await signOut();
    setIsAdmin(false);
  }, []);

  /* Called when a write comes back 401 — the cookie expired mid-session. */
  const markSignedOut = useCallback(() => setIsAdmin(false), []);

  return (
    <AuthContext.Provider
      value={{ isAdmin, checked, login, logout, markSignedOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
