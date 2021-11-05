export type ITodo = {
    title: string,
    done: boolean,
    favorite: boolean,
    id: number,
}

const API_URL = 'https://6175c7dd03178d00173da9e3.mockapi.io/api/v1/todo';

export const getTodosApi = async (): Promise<ITodo[]> => {
    const responce = await fetch(
        API_URL, {
        method: 'GET'
    }
    )
    return responce.json();
}

export const deleteTodoApi = async (id: number): Promise<ITodo> => {
    const responce = await fetch(
        `${API_URL}/${id}`, {
        method: 'DELETE'
    }
    )
    return responce.json()
}

export const createTodoApi = async (title: string): Promise<ITodo> => {
    const responce = await fetch(
        API_URL, {
        method: 'POST',
        body: JSON.stringify({ title: title, done: false, favorite: false }),
        headers: { 'Content-Type': 'application/json', },
    }
    )
    return responce.json()
}

export const updateTodoApi = async (id: number, todo: ITodo): Promise<ITodo> => {
    const responce = await fetch(
        `${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title: todo.title, done: todo.done, favorite: todo.favorite }),
        headers: { 'Content-Type': 'application/json', },
    }
    )
    return responce.json()
}

