import React, { FC } from "react";
import { ITodo } from "../../api";
import { useState } from "react";
import Modal from "../modal/Modal";
import './TodoItem.css'
import Buttons from "./Buttons";

type IToDoListItem = {
    item: ITodo,
    onItemToggle: (id: number) => Promise<ITodo>,
    onItemDelete: (id: number) => void,
    onItemFavorite: (id: number) => Promise<ITodo>,
}

const TodoItem: FC<IToDoListItem> = ({ item, onItemToggle, onItemDelete, onItemFavorite }) => {

    const [title, setTitle] = useState(item.title);

    const [isModalActive, setModalActive] = useState(false);

    const [isDetailsActive, setDetailsActive] = useState(false);

    const handleDetailsActive = () => {
        setDetailsActive(!isDetailsActive);
    }

    const handleFavoriteToDo = (e: React.MouseEvent) => {
        handleDetailsActive();
        e.stopPropagation();
        onItemFavorite(item.id);
    }

    const handleDoneToDo = (e: React.MouseEvent) => {
        handleDetailsActive();
        e.stopPropagation();
        onItemToggle(item.id);
    }

    const handleCloseModal = () => {
        setModalActive(false);
    }

    const handleToggleModal = () => {
        setModalActive(prevState => !prevState);
    }

    const handleDeleteToDo = (e: React.MouseEvent) => {
        e.stopPropagation();
        onItemDelete(item.id);
    }

    const handleCloseMenu = (e: React.MouseEvent) => {
        setDetailsActive(false);
        e.stopPropagation();
    }

    return (
        <>
                <div className="listItem__wrapper">
                    <span onClick={handleDetailsActive} className="todo_item_btns--title">...</span>
                    <div
                        onClick={(e: React.MouseEvent) => handleCloseMenu(e)}
                        className={"listItem" + (item.done ? 'done' : '')}>
                        <div>
                            <div>
                                <h2 className="listItem__title">{item.title} </h2>
                            </div>
                            <div className="todo_item_btns">
                                {isDetailsActive
                                    ?
                                    <Buttons
                                        handleFavoriteToDo={handleFavoriteToDo}
                                        handleDoneToDo={handleDoneToDo}
                                        handleToggleModal={handleToggleModal}
                                        item={item} />
                                    : ''}
                            </div>
                        </div>
                        {isModalActive && (<Modal
                            active={isModalActive}
                            setActive={setModalActive}
                            handleToggleModal={handleToggleModal}>
                            <div className="deleteMenu">
                                <h3 className="deleteMenu__title">Вы действительно хотите удалить эту задачу?</h3>
                                <div className="deleteMenu__title--todo">{title}</div>
                                <div className="deleteMenu_btns">
                                    <button className="deleteMenu__button deleteMenu__button--cancel"
                                        onClick={handleCloseModal}>Отмена
                                    </button>
                                    <button className="deleteMenu__button deleteMenu__button--ok"
                                        onClick={(e: React.MouseEvent) => { handleDeleteToDo(e) }}>Да, удалить
                                    </button>
                                </div>
                            </div>
                        </Modal>)}
                    </div>
                </div>
        </>
    );
}

export default TodoItem;