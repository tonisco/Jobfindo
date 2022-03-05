import React, { FC, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

interface PaginationProps {
	pages: number
}

const Pagination: FC<PaginationProps> = ({ pages }) => {
	const [current, setCurrent] = useState(1)
	const [searchParams, setSearchParams] = useSearchParams()

	useEffect(() => {
		const currPage = searchParams.get("page")
		if (currPage) {
			setCurrent(+currPage)
		}
	}, [searchParams])

	const changePage = (i: number) => {
		const all = Object.fromEntries(new URLSearchParams(searchParams))
		setCurrent(i)
		setSearchParams({ ...all, page: `${i}` })
	}
	return (
		<div className="pl-6 pr-3 pt-5 flex gap-5 text-lg">
			{[...new Array(pages)].map((_, i) => (
				<p
					key={i}
					className={`cursor-pointer transition-all ${
						i + 1 === current &&
						"text-sky-800 border border-sky-800 rounded px-2 bg-gray-100"
					}`}
					onClick={() => changePage(i + 1)}
				>
					{i + 1}
				</p>
			))}
		</div>
	)
}

export default Pagination
