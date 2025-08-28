import { DynamicNet } from '../components/dynamicNet';
import { ImageGallery } from '../components/imageGallery';
import { useAuth } from '../hooks/useAuth';

export const MainPage = () => {
	const auth = useAuth();
	return (
		<div className='p-4 md:p-8 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors'>
			<header className='flex justify-between items-center mb-8'>
				<button
					onClick={auth.signOut}
					className='px-4 py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700'>
					Logout
				</button>
			</header>
			<main>
				<ImageGallery />
				<DynamicNet />
			</main>
		</div>
	);
};
