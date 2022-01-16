import React, { useMemo } from "react"
import { Cell, Column, usePagination, useTable } from "react-table"
import { datas } from "../testdata"

export interface columnsType {
	job_details: string
	applicants: number
	date_modified: string
	id: number
}

const Table = () => {
	const columns = useMemo<Column<columnsType>[]>(
		() => [
			{
				Header: "Job Details",
				accessor: "job_details" as keyof columnsType,
			},
			{
				Header: "Applicants",
				accessor: "applicants" as keyof columnsType,
			},
			{
				Header: "Date Modified",
				accessor: "date_modified" as keyof columnsType,
			},
			{
				accessor: "edit" as keyof columnsType,
				Cell: (row: Cell<columnsType>) => (
					<div
						onClick={() => console.log(row.row.original.id)}
						className="text-xs sm:text-base px-1 sm:px-3 py-1 my-1 bg-sky-800 text-white cursor-pointer"
					>
						DETAILS
					</div>
				),
			},
		],
		[]
	)

	const data = useMemo<columnsType[]>(() => datas, [])

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<
		columnsType
	>({ columns, data }, usePagination)

	return (
		<table {...getTableProps()} className="w-full mt-6">
			<thead className="bg-rose-500 text-white w-full text-sm md:text-base lg:text-lg text-center">
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((item) => (
							<th {...item.getHeaderProps()} className="border">
								{item.render("Header")}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()} className="w-full text-center space-y-4">
				{rows.map((row) => {
					prepareRow(row)
					return (
						<tr {...row.getRowProps()} className="truncate space-x-1">
							{row.cells.map((cell) => (
								<td
									{...cell.getCellProps()}
									className="text-xs sm:text-base truncate max-w-[5.1rem] sm:max-w-full border"
								>
									{cell.render("Cell")}
								</td>
							))}
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

export default Table
