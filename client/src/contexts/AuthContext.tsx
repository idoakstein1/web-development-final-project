import { createContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { User } from '../types';

type AuthContextType = {
    user: Omit<User, 'password'>;
    setUser: (user: Omit<User, 'password'>) => void;
    accessToken: string;
    setAccessToken: (accessToken: string) => void;
    refreshToken: string;
    setRefreshToken: (refreshToken: string) => void;
    isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useLocalStorage<Omit<User, 'password'> | null>('user', null);
    const [accessToken, setAccessToken] = useLocalStorage<string | null>('accessToken', null);
    const [refreshToken, setRefreshToken] = useLocalStorage<string | null>('refreshToken', null);

    return (
        <AuthContext.Provider
            value={{
                user: user || ({} as User),
                setUser,
                accessToken: accessToken || '',
                setAccessToken,
                refreshToken: refreshToken || '',
                setRefreshToken,
                isAuthenticated: user !== null,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
