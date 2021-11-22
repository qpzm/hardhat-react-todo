import { useState } from 'react';

interface Props {
  addTodo: (text: string) => void;
}

export function TodoForm({ addTodo }: Props): JSX.Element {
  const [title, setTitle] = useState("");
  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(value);
  }
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addTodo(title);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="title" name="text" onChange={handleChange} value={title} autoComplete="off" />
      <input type="submit" value="Add" />
    </form>
  )
}

export default TodoForm;
