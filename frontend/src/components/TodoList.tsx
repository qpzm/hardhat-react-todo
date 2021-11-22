import React, { useState } from 'react';
import { TodoListItem } from './TodoListItem';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface Props {
  todos: Todo[];
  toggleTodo: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({ todos, toggleTodo }) => {
  return (
    <ul>
      {
        todos.map((todo) =>
          <TodoListItem key={todo.text} todo={todo} toggleTodo={toggleTodo} />)
      }
    </ul>
  );
}

export default TodoList;
