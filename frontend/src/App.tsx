import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Account from './components/Account';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialTodos: Todo[] = [
  {
    text: 'Task1',
    complete: false,
  },
  {
    text: 'Task2',
    complete: true,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo = (selectedTodo: Todo) => {
    const newTodos = todos.map(todo => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const addTodo = (text: string) => {
    setTodos([...todos, {text: text, complete: false}]);
  }
  return (
    <>
      <Account />
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </>
  )
}

export default App;
