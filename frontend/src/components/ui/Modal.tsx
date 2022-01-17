import React, { Dispatch, ReactNode } from "react"
import Modals from "react-modal"

Modals.defaultStyles = {}

interface ModalProps {
	children: ReactNode
	isOpen: boolean
	setIsOpen: Dispatch<boolean>
}

Modals.setAppElement("#root")

const Modal = ({ children, isOpen, setIsOpen }: ModalProps) => {
	return (
		<Modals
			isOpen={isOpen}
			shouldCloseOnOverlayClick={true}
			onRequestClose={() => setIsOpen(false)}
			className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200"
		>
			{children}
		</Modals>
	)
}

export default Modal
