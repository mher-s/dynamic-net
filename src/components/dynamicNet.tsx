import { useEffect, useState, type ChangeEvent } from 'react';
import { CellComponent } from './cell';
import type { Cell } from '../types';

export const DynamicNet = () => {
	const [rows, setRows] = useState<number>(10);
	const [cols, setCols] = useState<number>(15);
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
			if (totalCells === 0) return;

			const half = Math.floor(totalCells / 2);
			const idsToUpdate = new Set<number>();

			while (idsToUpdate.size < half) {
				const randomId = Math.floor(Math.random() * totalCells) + 1;
				idsToUpdate.add(randomId);
			}

			setGrid((prevGrid) => prevGrid.map((row) => row.map((cell) => (idsToUpdate.has(cell.id) ? { ...cell, value: Math.floor(Math.random() * 100) + 1, updated: true } : { ...cell, updated: false }))));

			setTimeout(() => {
				setGrid((currentGrid) => currentGrid.map((row) => row.map((cell) => (cell.updated ? { ...cell, updated: false } : cell))));
			}, 700);
		}, 2500);

		return () => clearInterval(interval);
	}, [rows, cols]);

	return (
		<div className='p-4 mt-8'>
			<h1 className='text-2xl md:text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100'>Dynamic Net</h1>
			<div className='flex justify-center flex-wrap gap-4 mb-6'>
				<div className='flex items-center gap-2'>
					<label className='text-gray-700 dark:text-gray-300'>Rows:</label>
					<input
						type='number'
						value={rows}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setRows(Math.min(50, Math.max(1, Number(e.target.value))))}
						className='border rounded-lg px-3 py-1 w-24 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400'
						min={1}
						max={50}
					/>
				</div>
				<div className='flex items-center gap-2'>
					<label className='text-gray-700 dark:text-gray-300'>Cols:</label>
					<input
						type='number'
						value={cols}
						onChange={(e: ChangeEvent<HTMLInputElement>) => setCols(Math.min(50, Math.max(1, Number(e.target.value))))}
						className='border rounded-lg px-3 py-1 w-24 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-400'
						min={1}
						max={50}
					/>
				</div>
			</div>
			<div className='overflow-x-auto p-2'>
				<div
					className='grid gap-2 mx-auto'
					style={{
						gridTemplateColumns: `repeat(${cols}, minmax(50px, 1fr))`,
						minWidth: `${cols * 58}px`,
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
		</div>
	);
};
