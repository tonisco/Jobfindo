import React from "react"

const JobListItem = () => {
	return (
		<div className="flex gap-2 cursor-pointer main">
			<img
				src="/images/image.png"
				className="h-20 w-20 object-contain mt-2"
				alt="company logo"
			/>
			<div className="capitalize border-y w-full py-2">
				<h1 className=" font-bold text-sky-800 line decoration-sky-800 decoration-2">
					senior web developer needed
				</h1>
				<h2>Ajob company limited</h2>
				<h3>Lagos</h3>
				<h4 className="text-xs">currently recruiting</h4>
				<h4 className="text-xs normal-case space-x-2 mt-2">
					<span>20hrs ago</span>
					<span className="text-sky-800">11 applicants</span>
				</h4>
			</div>
		</div>
	)
}

export default JobListItem
