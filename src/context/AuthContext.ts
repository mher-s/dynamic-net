import { useState, useEffect, createContext, useCallback, createElement, type ReactNode } from 'react';
import type { AuthContextType } from '../types';
import { authApi } from '../api/index';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem('accessToken'));
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setRefreshToken] = useState<string | null>(() => localStorage.getItem('refreshToken'));
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const handleSetTokens = (access: string | null, refresh: string | null) => {
		setAccessToken(access);
		setRefreshToken(refresh);
		if (access && refresh) {
			localStorage.setItem('accessToken', access);
			localStorage.setItem('refreshToken', refresh);
		} else {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
		}
	};

	const refreshTokens = useCallback(async () => {
		const storedRefreshToken = localStorage.getItem('refreshToken');
		if (!storedRefreshToken) {
			setIsLoading(false);
			return;
		}

		try {
			const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await authApi.refresh(storedRefreshToken);
			handleSetTokens(newAccessToken, newRefreshToken);
		} catch (error) {
			console.error('Session expired. Please sign in again.', error);
			handleSetTokens(null, null);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		refreshTokens();
	}, [refreshTokens]);

	const signIn = async (login: string, password: string) => {
		const { accessToken, refreshToken } = await authApi.signIn(login, password);
		handleSetTokens(accessToken, refreshToken);
	};

	const signOut = async () => {
		const currentRefreshToken = localStorage.getItem('refreshToken');
		if (currentRefreshToken) {
			await authApi.signOut();
		}
		handleSetTokens(null, null);
	};

	const value: AuthContextType = {
		isAuthenticated: !!accessToken,
		isLoading,
		signIn,
		signOut,
	};

	return createElement(AuthContext.Provider, { value }, children);
};

export { AuthContext };
