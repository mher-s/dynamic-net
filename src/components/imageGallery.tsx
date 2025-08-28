import { useCallback, useEffect, useState } from 'react';

export const ImageGallery = () => {
	const [imageUrls, setImageUrls] = useState<string[]>([]);
	const imageHost = 'https://dummyimage.com';

	const generateRandomHexColor = (): string =>
		Math.floor(Math.random() * 16777215)
			.toString(16)
			.padStart(6, '0');
	const generateRandomText = (): string => Math.random().toString(36).substring(2, 10);

	const fetchImages = useCallback(async () => {
		const imagePromises = Array.from({ length: 5 }).map(() => {
			const bgColor = generateRandomHexColor();
			const textColor = 'ffffff';
			const text = generateRandomText();
			const url = `${imageHost}/600x400/${bgColor}/${textColor}.png&text=${text}`;

			return Promise.resolve(url);
		});

		try {
			const newImageUrls = await Promise.all(imagePromises);
			setImageUrls(newImageUrls);
		} catch (error) {
			console.error('Failed to generate image URLs', error);
		}
	}, [imageHost]);

	useEffect(() => {
		fetchImages();
		const intervalId = setInterval(fetchImages, 10000);
		return () => clearInterval(intervalId);
	}, [fetchImages]);

	return (
		<div className='p-4 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md'>
			<h2 className='text-xl md:text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100'>Image Gallery</h2>
			<p className='text-center text-sm text-gray-600 dark:text-gray-400 mb-4'>Images refresh every 10 seconds.</p>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
				{imageUrls.map((url, index) => (
					<img
						key={index}
						src={url}
						alt={`Random`}
						className='w-full h-auto object-cover rounded-lg shadow-lg'
						onError={(e) => {
							(e.target as HTMLImageElement).onerror = null;
							(e.target as HTMLImageElement).src = 'https://placehold.co/600x400/ccc/ffffff?text=Error';
						}}
					/>
				))}
			</div>
		</div>
	);
};
