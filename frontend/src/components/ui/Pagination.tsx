import React, { useState } from "react"

const Pagination = () => {
	const [current, setCurrent] = useState(3)

	return (
		<div className="pl-6 pr-3 pt-5 flex gap-5 text-lg">
			{[...new Array(5)].map((_, i) => (
				<p
					key={i}
					className={`cursor-pointer transition-all ${
						i + 1 === current && "text-sky-800 border border-sky-800 px-2 bg-gray-100"
					}`}
					onClick={() => setCurrent(i + 1)}
				>
					{i + 1}
				</p>
			))}
		</div>
	)
}

export default Pagination
