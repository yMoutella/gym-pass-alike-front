import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type AuthUser = {
  name?: string;
  email?: string;
  plan?: string;
  [key: string]: any;
} | null;

export type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  user: AuthUser;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const restoreAuth = async () => {
      try {
        const stored = await AsyncStorage.getItem("userToken");
        if (stored) {
          setToken(stored);
          try {
            const decoded: any = jwtDecode(stored);
            setUser({
              name: decoded?.name ?? "User",
              email: decoded?.email,
              plan: decoded?.plan ?? "FREE",
              ...decoded,
            });
          } catch {
            // invalid token decode, clear
            setUser(null);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    restoreAuth();
  }, []);

  const signIn = async (newToken: string) => {
    await AsyncStorage.setItem("userToken", newToken);
    setToken(newToken);
    try {
      const decoded: any = jwtDecode(newToken);
      setUser({
        name: decoded?.name ?? "User",
        email: decoded?.email,
        plan: decoded?.plan ?? "Basic Plan",
        ...decoded,
      });
    } catch {
      setUser(null);
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("userToken");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated: !!token,
      isLoading,
      token,
      user,
      signIn,
      signOut,
    }),
    [token, isLoading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
