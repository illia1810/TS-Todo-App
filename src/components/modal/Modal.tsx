import { FC } from 'react'
import "./modal.css"
import ReactDom from 'react-dom'
import React, { useEffect, useState } from 'react'

const root = document.getElementById('root')!;

type IModal = {
  active: boolean
  setActive: any,
  children: any,
  handleToggleModal: () => void
}
const Modal: FC<IModal> = ({ active, setActive, children, handleToggleModal }) => {

  const [container] = useState(document.createElement('div'))

  useEffect(() => {
    root.appendChild(container)

    return () => {
      root.removeChild(container)
    }
  }, [container, root])

  return ReactDom.createPortal(
    <div className={active ? 'modal active' : 'modal'} onClick={() => { setActive(false) }}>
      <div className="modal__content" onClick={e => e.stopPropagation()}>
        <div className="modal__close">
          <button className="deleteMenu__button deleteMenu__button--close"
            onClick={handleToggleModal}>
              <img className="close_img" src="https://cdn-icons-png.flaticon.com/512/106/106830.png" alt="close" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    container
  )
}
export default Modal;


