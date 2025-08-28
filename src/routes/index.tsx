import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { MainPage } from './main';
import SignInPage from './signIn';

export const AppRouter = () => {
	const { isAuthenticated, isLoading } = useAuth();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setRoute] = useState<string>(window.location.pathname);

	useEffect(() => {
		const handlePopState = () => setRoute(window.location.pathname);
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	useEffect(() => {
		if (!isLoading) {
			const currentPath = window.location.pathname;
			if (isAuthenticated && currentPath !== '/') {
				window.history.pushState({}, '', '/');
				setRoute('/');
			} else if (!isAuthenticated && currentPath !== '/signin') {
				window.history.pushState({}, '', '/signin');
				setRoute('/signin');
			}
		}
	}, [isAuthenticated, isLoading]);

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
				<p className='text-xl text-gray-800 dark:text-gray-200'>Loading...</p>
			</div>
		);
	}

	return isAuthenticated ? <MainPage /> : <SignInPage />;
};
