export interface Cell {
	id: number;
	value: number;
	updated: boolean;
}

export interface AuthTokens {
	accessToken: string;
	refreshToken: string;
}

export interface AuthContextType {
	isAuthenticated: boolean;
	isLoading: boolean;
	signIn: (login: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
}

export interface CellComponentProps {
	value: number;
	updated: boolean;
}
