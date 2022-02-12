import React from "react"

const Spinner = () => {
	return (
		<div className="flex justify-center items-center h-full w-full">
			<div className="lds-ring">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default Spinner
