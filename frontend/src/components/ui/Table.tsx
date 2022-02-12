import React from "react"
import { useTable } from "react-table"
import { ApplicationTypes, JobType } from "../types"

export interface columnsType {
	job_details: string
	applicants: number
	date_modified: string
	id: number
}

interface TableProps {
	data: JobType[] | ApplicationTypes[]
	columns: any
}

const Table = ({ columns, data }: TableProps) => {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<
		JobType | ApplicationTypes
	>({
		columns,
		data,
	})

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
						<tr {...row.getRowProps()} className="space-x-1">
							{row.cells.map((cell) => (
								<td
									{...cell.getCellProps()}
									className="text-xs sm:text-base max-w-[5.1rem] sm:max-w-full border"
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
