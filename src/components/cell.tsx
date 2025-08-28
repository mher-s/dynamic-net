import { memo } from 'react';

interface CellComponentProps {
	value: number;
	updated: boolean;
}

export const CellComponent = memo(({ value, updated }: CellComponentProps) => {
	const bgColor = updated ? 'bg-yellow-400 dark:bg-yellow-600' : 'bg-blue-200 dark:bg-gray-700';
	const textColor = updated ? 'text-black' : 'text-gray-800 dark:text-gray-200';

	return (
		<div
			className={`flex items-center justify-center h-16 rounded-md transition-all duration-500 ease-in-out transform hover:scale-105 ${bgColor} ${textColor}`}
			style={{ minWidth: '50px' }}>
			<span className='font-mono text-sm font-semibold'>{value}</span>
		</div>
	);
});
