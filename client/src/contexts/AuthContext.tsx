import { createContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { User } from '../types';

type AuthContextType = {
    user: Omit<User, 'password'> | null;
    setUser: (user: Omit<User, 'password'> | null) => void;
    accessToken: string | null;
    setAccessToken: (accessToken: string | null) => void;
    refreshToken: string | null;
    setRefreshToken: (refreshToken: string | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useLocalStorage<Omit<User, 'password'> | null>('user', null);
    const [accessToken, setAccessToken] = useLocalStorage<string | null>('accessToken', null);
    const [refreshToken, setRefreshToken] = useLocalStorage<string | null>('refreshToken', null);

    return (
        <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken, refreshToken, setRefreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};
