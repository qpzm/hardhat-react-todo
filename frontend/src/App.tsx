import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Account from './components/Account';
import TodoListABI from './core/abi/TodoListABI.json'
import EnvironmentVariables from './core/envs';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

const initialTodos: Todo[] = [];

function App() {
  const { account, library, active, chainId } = useWeb3React()
  const signer = library?.getSigner(account).connectUnchecked();
  const [todos, setTodos] = useState(initialTodos);

  const fetchTodo = async () => {
    if (chainId === undefined) {
      return
    }

    const address = EnvironmentVariables[chainId].todoListContractAddress
    const contract = new ethers.Contract(address, TodoListABI, library)
    const length: number = (await contract.getLength()).toNumber();
    const indices = []
    for (let i = 0; i < length; i++) {
      indices.push(i);
    }
    const newTodos = await Promise.all(
      indices.map(x => (contract.get(x)))
    );
    setTodos(newTodos);
  };

  const findIndex = (text: string) => todos.findIndex((item) => (item.text === text))

  const toggleTodo = async (selectedTodo: Todo) => {
    if (chainId === undefined) {
      return
    }
    const address = EnvironmentVariables[chainId].todoListContractAddress
    const contract = new ethers.Contract(address, TodoListABI, signer)
    const tx = await contract.toggleCompleted(findIndex(selectedTodo.text));
    console.log(tx);
    const receipt = await tx.wait();
    console.log(receipt);
    _toggleTodo(selectedTodo);
  };

  const _toggleTodo = (selectedTodo: Todo) => {
    const newTodos = [...todos];
    const i = findIndex(selectedTodo.text);
    newTodos[i] = Object.assign({}, todos[i], {completed: !todos[i].completed})
    setTodos(newTodos);
  };

  const addTodo = async (text: string) => {
    if (chainId === undefined) {
      return
    }
    const address = EnvironmentVariables[chainId].todoListContractAddress
    const contract = new ethers.Contract(address, TodoListABI, signer);
    const tx = await contract.create(text);
    console.log(tx);
    const receipt = await tx.wait();
    console.log(receipt);
    setTodos([...todos, { text: text, completed: false }])
  }

  useEffect(() => {
    const f = async () => {
      if (active) {
        console.log("hi")
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
