import { ITodo } from '../../api';
import { getTodosApi, deleteTodoApi, createTodoApi, updateTodoApi } from '../../api'
import {  Dispatch } from "redux";
import { RootState } from '../index';

export const ACTION_SET_ITEMS = 'ACTIONS_SET_ITEMS';
export const fetchTodos = () => (dispatch: Dispatch): void => {
    getTodosApi()
        .then((data) =>
            dispatch({
                type: ACTION_SET_ITEMS,
                payload: data,
            })
        );
};

export const ACTION_DELETE = 'ACTION_DELETE';
export const deleteTodo = (id: number) => (dispatch: Dispatch): void => {
    deleteTodoApi(id)
        .then(() => dispatch({
            type: ACTION_DELETE,
            payload: id,
        }));
};

export const ACTION_SET_ITEM = 'ACTION_SET_ITEM';
export const toggleTodo = (
    id: number
) => (dispatch: Dispatch, state: () => RootState): Promise<ITodo> => {

    const { todos } = state();
    const { items } = todos
    const item = items.find((item: ITodo) => item.id === id);
    const newItem = { ...item, done: !item.done };

    return updateTodoApi(id, newItem)
        .then((data) => {
            dispatch({
                type: ACTION_SET_ITEM,
                payload: newItem,
            });
            return data
        });
};

export const updateTodo = (
    id: number, title: string
) => (dispatch: Dispatch, state: () => RootState): Promise<ITodo> => {

    const { todos } = state();
    const { items } = todos
    const item = items.find((item: ITodo) => item.id === id);
    const newItem = { ...item, title: title };

    return updateTodoApi(id, newItem)
        .then((data) => {
            dispatch({
                type: ACTION_SET_ITEM,
                payload: data,
            });
            return data
        });
};

export const toggleTodoFavorite = (
    id: number
) => (dispatch: Dispatch, state: () => RootState): Promise<ITodo> => {

    const { todos } = state();
    const { items } = todos
    const item = items.find((item: ITodo) => item.id === id);
    const newItem = { ...item, favorite: !item.favorite };

    return updateTodoApi(id, newItem)
        .then((data) => {
            dispatch({
                type: ACTION_SET_ITEM,
                payload: data,
            });
            return data
        });
};

export const ACTION_CREATE_ITEM = 'ACTION_CREATE_ITEM';
export const createTodo = (
    title: string
) => (dispatch: Dispatch): Promise<ITodo> => {

    return createTodoApi(title)
        .then((data) => {
            dispatch({
                type: ACTION_CREATE_ITEM,
                payload: data,
            });
            return data
        });
};
