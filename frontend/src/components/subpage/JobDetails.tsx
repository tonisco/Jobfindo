import React from "react"
import { BsBriefcase } from "react-icons/bs"
import { FaRegBuilding } from "react-icons/fa"

const JobDetails = () => {
	return (
		<div className="bg-white capitalize px-3 py-6 space-y-4 max-h-[88.5vh] w-[60%] overflow-y-scroll text-gray-900">
			<div className="mb-3 space-y-2">
				<h1 className="text-xl font-bold">senior web developer needed</h1>
				<h3 className="">Ajob company limited - Lagos (remote)</h3>
			</div>
			<div className="text-sm space-y-3">
				<div className="normal-case text-sm">
					<span>5 days -</span>
					<span className="text-sky-800"> 12 applicants</span>
				</div>
				<div className="flex gap-2 items-center">
					<BsBriefcase /> <p>full time - mid-Senior level</p>
				</div>
				<div className="flex gap-2 items-center">
					<FaRegBuilding />
					<p>20 - 30 employees</p>
				</div>
				<p>currently recruiting</p>
			</div>
			<div className="flex gap-4">
				<button className="capitalize bg-sky-800 hover:bg-sky-900 py-1 px-3 rounded-lg text-white shadow-md">
					apply
				</button>
				<button className="capitalize hover:bg-sky-100 border border-sky-800 text-sky-800 py-1 px-3 rounded-lg shadow-md">
					save
				</button>
			</div>
			<div className="py-2 space-y-2 normal-case tracking-wide flex flex-col gap-2">
				<p>
					We're currently hiring a Sr FullStack Java Developer to work for one of our
					clients. A fast-growing online pharmacy startup located in Metro Vancouver,
					British Columbia, Canada.
				</p>
				<p>START REMOTELY AND THEN RELOCATE!</p>
				<div className="">
					<p>What skills are we looking for, in this opportunity?</p>
					<ul className="list-disc list-inside space-y-1">
						<li>Must-have skills: Sql 4 Year(s) | Java 4 Year(s) | Spring 2 Year(s)</li>
						<li>Language required: English</li>
					</ul>
				</div>
				<div className="">
					<p className="font-bold">Qualifications (Must-Haves):</p>
					<ul className="list-disc list-inside space-y-1">
						<li>
							Bachelor in Computer Science, Engineering stream or relevant equivalent
							experience.
						</li>
						<li>
							Intermediate knowledge of object-oriented design, data structures,
							algorithms, and SQL.
						</li>
						<li>
							Deep understanding of writing modular, well-documented, testable,
							maintainable code.
						</li>
						<li>Understand and analyze data and progress effectively.</li>
						<li>
							They are motivated to drive tasks to completion and take ownership of
							projects.
						</li>
						<li>Ability to work in a fast-paced and agile development environment.</li>
						<li>
							Genuinely excited about working in a growth-stage startup, learning, and
							solving problems without getting constrained by current knowledge or
							experience.
						</li>
						<li>4 to 7 years of relevant experience.</li>
					</ul>
					Considered an asset:
					<ul>
						<li>Full-stack experience.</li>
						<li>Experience programming in Java and with the Play/Spring framework.</li>
						<li>
							Experience building operationally critical services, especially in
							eCommerce.
						</li>
					</ul>
				</div>
				<div className="space-y-3 mt-4">
					<h1 className="font-bold text-xl">About the Company</h1>
					<div className="flex gap-3 items-center text-lg capitalize">
						<img
							className="h-20 w-20 object-contain"
							src="/images/image.png"
							alt="company logo"
						/>
						<h3 className="font-bold">Ajob company limited</h3>
					</div>
					<div className="space-y-2 text-sm">
						<h4>Staff and Recruiting - 5-10 emoloyees</h4>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet aspernatur
							assumenda ex at, sunt eius quos nulla quae ipsa repudiandae, quod
							mollitia corrupti vero temporibus. Vel, facere. Dolorum vel
							exercitationem modi omnis minima assumenda atque. Dolore quas optio hic
							eos voluptate autem reiciendis neque temporibus tenetur, aspernatur
							minima aliquam, quidem exercitationem? Facilis iusto recusandae
							reprehenderit? Nihil aliquid consectetur reiciendis enim ullam deleniti
							ipsum sunt provident.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default JobDetails
