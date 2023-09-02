import { createContext, useContext, useState } from "react";

interface AuthContextValue {
  session: any;
  setSession: (session: any) => void;
}

export const AuthContext = createContext<AuthContextValue>({
  session: null,
  setSession: () => {}
});

export function useAuth() {
  return useContext(AuthContext);
}

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [session, setSession] = useState<any | null>(null);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};
