import React, { Dispatch, ReactNode } from "react"
import Modals from "react-modal"

Modals.defaultStyles = {}

interface ModalProps {
	children: ReactNode
	isOpen: boolean
	setIsOpen: Dispatch<boolean>
	setSelected?: Dispatch<string>
}

Modals.setAppElement("#root")

const Modal = ({ children, isOpen, setIsOpen, setSelected }: ModalProps) => {
	const close = () => {
		setIsOpen(false)
		if (setSelected) {
			setSelected("")
		}
	}

	return (
		<Modals
			isOpen={isOpen}
			shouldCloseOnOverlayClick={true}
			onRequestClose={close}
			className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200 scale-up "
		>
			{children}
		</Modals>
	)
}

export default Modal
