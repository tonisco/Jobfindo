import React, { Dispatch, FC, useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { AiOutlineFileWord, AiOutlineFilePdf, AiOutlineFileText } from "react-icons/ai"
import { GoCloudUpload } from "react-icons/go"

interface FileInputProps {
	setFile: Dispatch<File>
	file: File | undefined
}

const FileInput: FC<FileInputProps> = ({ setFile, file }) => {
	const [fileType, setFileType] = useState("")
	const [fileName, setFileName] = useState("")

	const onDrop = useCallback(
		(acceptedFiles) => {
			setFile(acceptedFiles[0])
			const filename = acceptedFiles[0].name
			setFileName(filename)
			const arrayName = filename.split(".")
			setFileType(arrayName[arrayName.length - 1])
		},
		[setFile]
	)

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
			{!file ? (
				<GoCloudUpload className="h-24 w-24" />
			) : fileType === "txt" ? (
				<AiOutlineFileText className="h-24 w-24" />
			) : fileType === "pdf" ? (
				<AiOutlineFilePdf className="h-24 w-24" />
			) : (
				<AiOutlineFileWord className="h-24 w-24" />
			)}
			{fileName ? <p>{fileName}</p> : <p>Drag and drop your CV here</p>}
			<p>or</p>
			<p className="text-white bg-sky-800 px-5 py-2 rounded-lg cursor-pointer">
				{file ? "Change file" : "Browse files"}
			</p>
		</div>
	)
}

export default FileInput
