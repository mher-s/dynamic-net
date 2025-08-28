import type { AuthTokens } from '../types';

export const authApi = {
	signIn: async (login: string, password: string): Promise<AuthTokens> => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (login && password) {
					const tokens: AuthTokens = {
						accessToken: `accessToken_${Date.now()}`,
						refreshToken: `refreshToken_${Date.now()}`,
					};

					resolve(tokens);
				} else {
					reject(new Error('Login and password are required.'));
				}
			}, 500);
		});
	},

	signOut: async (): Promise<{ success: boolean }> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({ success: true });
			}, 300);
		});
	},

	refresh: async (refreshToken: string): Promise<AuthTokens> => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (refreshToken) {
					const newTokens: AuthTokens = {
						accessToken: `accessToken_${Date.now()}`,
						refreshToken: `refreshToken_${Date.now()}`,
					};

					resolve(newTokens);
				} else {
					reject(new Error('No refresh token provided.'));
				}
			}, 400);
		});
	},
};
