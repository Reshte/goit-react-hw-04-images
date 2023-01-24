import { Overlay, ModalWindow } from './Molad.styled'
import { createPortal } from 'react-dom'
import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
const modalRoot=document.querySelector('#modal-root')

export function Modal({ OnClose, children }) {
   
    useEffect(() => {
        const handelKeyDown = e => {
            if (e.code === 'Escape') { OnClose() }
    }
        window.addEventListener('keydown', handelKeyDown)
        return () => {
        window.removeEventListener("keydown", handelKeyDown)}
            }, [OnClose])
    
   
    
    const  handeOverlayClick = e => {
        if (e.target === e.currentTarget) {
             OnClose()
        }
    }
    return createPortal (
        <Overlay onClick={handeOverlayClick}>
            <ModalWindow>
                {children}
            </ModalWindow>
        </Overlay>, modalRoot
    )

}

Modal.propTypes = {
        OnClose: PropTypes.func.isRequired,
    }

