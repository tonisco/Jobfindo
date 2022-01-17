import React, { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { GoCloudUpload } from "react-icons/go"

const FileInput = () => {
	const onDrop = useCallback((acceptedFiles) => {
		console.log(acceptedFiles)
	}, [])

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		multiple: false,
		accept: ".doc,.docx,.pdf,.txt",
	})

	return (
		<div
			{...getRootProps()}
			className="border-2 border-sky-800 w-full rounded-lg py-8 gap-2 flex flex-col items-center text-sky-800 font-gil-bold"
		>
			<input {...getInputProps()} />
			<GoCloudUpload className="h-24 w-24" />
			<p>Drag and drop your CV here</p>
			<p>or</p>
			<button className="text-white bg-sky-800 px-5 py-2 rounded-lg">Browse files</button>
		</div>
	)
}

export default FileInput
