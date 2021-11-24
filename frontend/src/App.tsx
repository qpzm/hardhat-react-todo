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
    const transaction = await contract.create(text);
    console.log(transaction);
    // const receipt = await wait(transaction);
    // console.log(receipt);
    // TODO ether js 에서 트랜잭션 완료 이벤트를 구독해서 트랜잭션이 완료되었을 때만 추가하도록 수정
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
