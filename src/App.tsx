import { useEffect, useState } from 'react';
import type { Cell } from './types';
import CellComponent from './components/Cell';

export default function App() {
	const [rows, setRows] = useState<number>(15);
	const [cols, setCols] = useState<number>(28);
	const [grid, setGrid] = useState<Cell[][]>([]);

	useEffect(() => {
		const newGrid: Cell[][] = [];
		let counter = 1;
		for (let r = 0; r < rows; r++) {
			const row: Cell[] = [];
			for (let c = 0; c < cols; c++) {
				row.push({ id: counter, value: counter, updated: false });
				counter++;
			}
			newGrid.push(row);
		}

		setGrid(newGrid);
	}, [rows, cols]);

	useEffect(() => {
		const interval = setInterval(() => {
			const totalCells = rows * cols;
			const half = Math.floor(totalCells / 2);
			const idsToUpdate = new Set<number>();

			while (idsToUpdate.size < half) {
				const randomId = Math.floor(Math.random() * totalCells) + 1;
				idsToUpdate.add(randomId);
			}

			setGrid((prevGrid) =>
				prevGrid.map((row) =>
					row.map((cell) => {
						if (idsToUpdate.has(cell.id)) {
							return {
								...cell,
								value: Math.floor(Math.random() * 100) + 1,
								updated: true,
							};
						}

						return cell;
					})
				)
			);

			setTimeout(() => {
				setGrid((currentGrid) => currentGrid.map((row) => row.map((cell) => (cell.updated ? { ...cell, updated: false } : cell))));
			}, 500);
		}, 2500);

		return () => clearInterval(interval);
	}, [rows, cols]);

	return (
		<div className='p-4 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors'>
			<h1 className='text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100'>Dynamic Net</h1>

			<div className='flex justify-center gap-4 mb-6'>
				<div className='flex items-center gap-2'>
					<label className='text-gray-700 dark:text-gray-300'>Rows:</label>
					<input
						type='number'
						value={rows}
						onChange={(e) => {
							const value = Math.min(100, Math.max(1, Number(e.target.value)));
							setRows(value);
						}}
						onWheel={(e) => e.currentTarget.blur()}
						className='border rounded-lg px-3 py-1 w-20 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400'
						min={1}
						max={100}
					/>
				</div>

				<div className='flex items-center gap-2'>
					<label className='text-gray-700 dark:text-gray-300'>Cols:</label>
					<input
						type='number'
						value={cols}
						onChange={(e) => {
							const value = Math.min(100, Math.max(1, Number(e.target.value)));
							setCols(value);
						}}
						onWheel={(e) => e.currentTarget.blur()}
						className='border rounded-lg px-3 py-1 w-20 dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400'
						min={1}
						max={100}
					/>
				</div>
			</div>

			<div
				className='grid gap-2 mx-auto'
				style={{
					gridTemplateColumns: `repeat(${cols}, minmax(50px, 1fr))`,
					maxWidth: '100vw',
					overflowX: 'auto',
				}}>
				{grid.flat().map((cell) => (
					<CellComponent
						key={cell.id}
						value={cell.value}
						updated={cell.updated}
					/>
				))}
			</div>
		</div>
	);
}
