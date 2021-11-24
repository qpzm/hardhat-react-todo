import ropstenVars from "./ropsten";
import hardhatVars from "./hardhat";

interface EnvironmentVariables {
  todoListContractAddress: string
}

const vars: Record<number, EnvironmentVariables> = {
  3: ropstenVars,
  1337: hardhatVars,
}

export default vars;