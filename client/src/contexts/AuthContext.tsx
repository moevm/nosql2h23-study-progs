import React from "react";
import { useContext } from "react";

interface IAuthContext {
    authed: boolean;
    setAuthed: React.Dispatch<React.SetStateAction<boolean>>;
}


const authContext = React.createContext<IAuthContext | undefined>(undefined);

export function useAuth() {

  const context = useContext(authContext);

    if (!context) {
        throw new Error('useAuth can only be used inside AuthProvider');
    }

    return context;

}

export function AuthProvider({ children }: any) {
  const [authed, setAuthed] = React.useState<boolean>(false);
  

  return <authContext.Provider value={{
    authed: authed,
    setAuthed: setAuthed
  }}>
    {children}
  </authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}