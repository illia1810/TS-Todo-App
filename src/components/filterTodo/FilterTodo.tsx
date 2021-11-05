import { FC } from 'react';
import { connect } from 'react-redux';
import { setTodosFilter } from '../../store/actions/todosFilter';
import { IFilterTodo } from '../../store/reducers/todosFilter';
import './FilterTodo.css';
type ITodoFilter = {
    setTodosFilter: (value: string) => {}
    filter: string
}

const FilterTodo: FC<ITodoFilter> = ({ setTodosFilter, filter }) => {
    return (
        <div className="filter">
            <button
                className={filter === 'done' ? 'button_filter button_filter--active' : 'button_filter'}
                onClick={() => setTodosFilter('done')}
            >
                Выполненные задачи
            </button>
            <button
                className={filter === 'todo' ? 'button_filter button_filter--active' : 'button_filter'}
                onClick={() => setTodosFilter('todo')}
            >
                Задачи в работе
            </button>
            <button
                className={filter === 'favorite' ? 'button_filter button_filter--active' : 'button_filter'}
                onClick={() => setTodosFilter('favorite')}
            >
                Избранные задачи
            </button>
            <button
                className={filter === 'all' ? 'button_filter button_filter--active' : 'button_filter'}
                onClick={() => setTodosFilter('all')}
            >
                Все задачи
            </button>
        </div>
    );
}

function mapStateToProps({ todosFilter }: { todosFilter: IFilterTodo }) {
    return { filter: todosFilter.value };
}

const mapDispatchToProps = {
    setTodosFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterTodo);