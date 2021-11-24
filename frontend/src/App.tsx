import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Account from './components/Account';
import TodoListABI from './core/abi/TodoListABI.json'
import EnvironmentVariables from './core/envs';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ethers, BigNumber } from "ethers";
import { useWeb3React } from "@web3-react/core";

const initialTodos: Todo[] = [];


function App() {
  const { account, library, active } = useWeb3React()
  const signer = library?.getSigner(account).connectUnchecked();
  const [todos, setTodos] = useState(initialTodos);

  const fetchTodo = async () => {
    const contract = new ethers.Contract(EnvironmentVariables.todoListContractAddress, TodoListABI, library)
    const length: number = (await contract.getLength()).toNumber();
    const indices = []
    for (let i=0; i < length; i++) {
      indices.push(i);
    }
    const newTodos = await Promise.all(
      indices.map(x => (contract.get(x)))
    );
    setTodos(newTodos);
  };

  const findIndex = (text: string) => todos.findIndex((item) => (item.text === text))

  const toggleTodo = async (selectedTodo: Todo) => {
    const contract = new ethers.Contract(EnvironmentVariables.todoListContractAddress, TodoListABI, signer)
    await contract.toggleCompleted(findIndex(selectedTodo.text));
  };

  const addTodo = async (text: string) => {
    const contract = new ethers.Contract(EnvironmentVariables.todoListContractAddress, TodoListABI, signer);
    const tx = await contract.create(text);
    console.log(tx);
    const receipt = await tx.wait();
    console.log(receipt);
    setTodos([...todos, { text: text, completed: false }])
  }

  useEffect(() => {
    console.log(active);
    const f = async () => {
      if (active) {
        await fetchTodo()
      }
    }
    f();
  }, [active]);

  return (
    <>
      <Account />
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </>
  )
}

export default App;
