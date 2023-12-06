import React, { useState, useEffect } from "react";
import { useContext } from "react";
import IUserProfile from "../interfaces/IUserProfile.interface";
import { AuthorizationAPIs } from "../api/auth.api";

interface IAuthContext {
	isAuthed: boolean;
	id: string | undefined;
	setId: React.Dispatch<React.SetStateAction<string | undefined>>;
	profile: IUserProfile;
	setProfile: React.Dispatch<React.SetStateAction<IUserProfile>>;
}

const authContext = React.createContext<IAuthContext | undefined>(undefined);

export function useAuth() {
	const context = useContext(authContext);

	if (!context) {
		throw new Error("useAuth can only be used inside AuthProvider");
	}

	return context;
}

export function AuthProvider({ children }: any) {
	const [id, setId] = useState<string | undefined>(
		window.localStorage.getItem("id") || undefined
	);

	const [isAuthenticated, setIsAuthenticated] = useState(!!id);
	const [profile, setProfile] = useState<IUserProfile>({} as IUserProfile);

	useEffect(() => {
		if (id) {
            AuthorizationAPIs.getProfile()
                .then((res: { data: IUserProfile; status: number }) => {
                    if (res.status === 200 || res.status === 204) {
                        setProfile(res.data);
                        setIsAuthenticated(true);
                        window.localStorage.setItem('id', id);
                    } else {
                        setIsAuthenticated(false);
                        window.localStorage.removeItem('id');
                        setId(undefined);
                    }
                })
                .catch((error) => {
                    console.error(error);

                    setId(undefined);
                    if (error.response?.status === 401) {
                        setId(undefined);
                    }
                });
        } else {
            setIsAuthenticated(false);
        }
	}, [id]);


	return (
		<authContext.Provider
			value={{
				isAuthed: isAuthenticated,
				setId: setId,
				id: id,
				profile,
				setProfile,
			}}
		>
			{children}
		</authContext.Provider>
	);
}

export default function AuthConsumer() {
	return React.useContext(authContext);
}
