import { memo } from 'react';

type CellProps = {
	value: number;
	updated: boolean;
};

const Cell = memo(({ value, updated }: CellProps) => {
	const bgColor = updated ? 'bg-green-300 dark:bg-green-700' : 'bg-white dark:bg-gray-800';
	const textColor = updated ? 'text-green-800 dark:text-green-100' : 'text-gray-700 dark:text-gray-300';

	return (
		<div className={`flex items-center justify-center h-12 rounded-lg shadow-md transition-colors duration-300 ease-linear ${bgColor}`}>
			<span className={`font-mono text-lg font-semibold ${textColor}`}>{value}</span>
		</div>
	);
});

const CellComponent = memo(Cell);
export default CellComponent;
