import { Overlay, ModalWindow } from './Molad.styled'
import { createPortal } from 'react-dom'
import { Component } from "react";
import { PropTypes } from 'prop-types';
const modalRoot=document.querySelector('#modal-root')


export class Modal extends Component{
    static propTypes = {
        OnClose: PropTypes.func.isRequired,
    };

    componentDidMount() {
               window.addEventListener('keydown', this.handelKeyDown )
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handelKeyDown)
    }

    handelKeyDown = e => {
                        if (e.code === 'Escape') {
                this.props.OnClose()
            }
        }
     
    handeOverlayClick = e => {
        if (e.target === e.currentTarget) {
             this.props.OnClose()
        }
    }
    
    
    render(){
    return createPortal (
        <Overlay onClick={this.handeOverlayClick}>
            <ModalWindow>
                {this.props.children}
            </ModalWindow>
        </Overlay>, modalRoot
    )
}

}
