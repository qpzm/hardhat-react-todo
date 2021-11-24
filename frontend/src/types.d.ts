interface Todo {
  text: string;
  completed: boolean;
}

interface TodoResponse {
  text: string;
  completed: boolean;
}

type ToggleTodo = (selectedTodo: Todo) => void;
