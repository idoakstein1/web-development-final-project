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
    logOut: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser, removeUser] = useLocalStorage<Omit<User, 'password'> | null>('user', null);
    const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage<string | null>('accessToken', null);
    const [refreshToken, setRefreshToken, removeRefreshToken] = useLocalStorage<string | null>('refreshToken', null);

    const logOut = () => {
        removeUser();
        removeAccessToken();
        removeRefreshToken();
    };

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
                logOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
