import { useState, type FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function SignInPage() {
	const [login, setLogin] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
	const auth = useAuth();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');

		if (!login || !password) {
			setError('Login and password are required!');
			return;
		}

		setIsSigningIn(true);

		try {
			await auth.signIn(login, password);
		} catch (err) {
			setError('Something went wrong recheck your details');
			console.error(err);
		} finally {
			setIsSigningIn(false);
		}
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
			<div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800'>
				<h1 className='text-2xl font-bold text-center text-gray-900 dark:text-white'>Auth</h1>
				<form
					onSubmit={handleSubmit}
					className='space-y-6'>
					<div>
						<label className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'>Login</label>
						<input
							type='text'
							value={login}
							onChange={(e) => setLogin(e.target.value)}
							className='w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500'
							placeholder='Please enter your login'
						/>
					</div>
					<div>
						<label className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'>Password</label>
						<input
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500'
							placeholder='Please enter password'
						/>
					</div>
					{error && <p className='text-sm text-red-500 text-center'>{error}</p>}
					<button
						type='submit'
						disabled={isSigningIn}
						className='w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed'>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
