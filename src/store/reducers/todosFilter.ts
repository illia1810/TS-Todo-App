import { ACTION_SET_TODOS_FILTER } from '../actions/todosFilter';

export type IFilterTodo = {
    value: string,
}

const originalState: IFilterTodo= {
    value: 'all',
};

export default function (state = originalState, { type, payload }: {type: string, payload: any }) {
    switch (type) {
        case ACTION_SET_TODOS_FILTER:
            return { value: payload };
        default:
            return state;
    }
}