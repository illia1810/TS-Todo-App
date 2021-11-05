import { FC } from 'react';
import TodoItem from '../todoItem/TodoItem';
import { connect } from 'react-redux';
import { deleteTodo, toggleTodoFavorite, toggleTodo, updateTodo } from '../../store/actions/todos';
import { ITodo } from '../../api';
import { IAllToDos } from '../../store/reducers/todos';
import { IFilterTodo } from '../../store/reducers/todosFilter';

type IToDoList = {
    todos: Array<ITodo>,
    onItemToggle: (id: number) => Promise<ITodo>,
    onItemFavorite: (id: number) => Promise<ITodo>,
    onItemDelete: (id: number) => void,
}

const List: FC<IToDoList> = ({ todos, onItemToggle, onItemFavorite, onItemDelete }) => {

    return (
        <div className="list">
            {todos.map((item) => (
                <TodoItem
                    key={item.id}
                    item={item}
                    onItemToggle={onItemToggle}
                    onItemFavorite={onItemFavorite}
                    onItemDelete={onItemDelete}
                />
            ))}
        </div>
    );
}
function mapStateToProps({ todos, todosFilter }: { todos: IAllToDos, todosFilter: IFilterTodo }) {
    let items = todos.items;

    if (todosFilter.value !== 'all') {
        items = items.filter((item) => {
            return (
                (todosFilter.value === 'todo' && !item.done) ||
                (todosFilter.value === 'done' && item.done) ||
                (todosFilter.value === 'favorite' && item.favorite && !item.done)
            );
        });
    }
    return {
        todos: items,
    };
}

const mapDispatchToProps = {
    onItemDelete: deleteTodo,
    onItemFavorite: toggleTodoFavorite,
    onItemToggle: toggleTodo,
    onUpdate: updateTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);