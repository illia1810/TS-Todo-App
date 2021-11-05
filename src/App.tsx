import { useEffect } from 'react';
import './App.css'

import List from './components/list/List';
import NewTodo from './components/newTodo/NewTodo';
import FilterTodo from './components/filterTodo/FilterTodo';
import { fetchTodos } from './store/actions/todos';
import { useDispatch } from 'react-redux';

function App() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTodos());
    }, []);

    return (
        <>
            <div className="container">
                <NewTodo />
                <FilterTodo />
                <List />
            </div>
        </>
    );
}

export default App;