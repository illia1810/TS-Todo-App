import React, { FC } from 'react'
import { ITodo } from '../../api'

type IButtons = {
    handleFavoriteToDo: (e:React.MouseEvent) => void,
    handleDoneToDo: (e:React.MouseEvent) => void,
    handleToggleModal: () => void, 
    item: ITodo,
}

const Buttons:FC<IButtons> = ({handleFavoriteToDo,handleDoneToDo,handleToggleModal,item}) => {
    return (
        <div>
            <button
                className="listItem__menu--button"
                onClick={(e: React.MouseEvent) => handleFavoriteToDo(e)}>
                {item.favorite ? 'Убрать из избранного ' : 'В избранное'}
            </button>
            <button
                className="listItem__menu--button"
                onClick={(e: React.MouseEvent) => handleDoneToDo(e)}>
                {item.done ? 'Вернуть в работу' : 'Выполнено'}
            </button>
            <button
                className="listItem__menu--button"
                onClick={handleToggleModal}> Удалить
            </button>
        </div>
    )
}

export default Buttons
