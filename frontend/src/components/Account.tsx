import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../connector";

interface Props {
}

export const Account: React.FC<Props> = () => {
  const { chainId, account, activate, deactivate, active } = useWeb3React();
  const onClickActivate = async () => {
    await activate(injectedConnector);
  }

  const onClickDeactivate = () => {
    // TODO
  }

  return (
    <div>
      <div> Chain Id: {chainId} </div>
      <div> Account: {account} </div>
      {active ? (<div>Connected</div>) : (<button onClick={onClickActivate}> Connect </button>)}
    </div>
  )
}

export default Account;
