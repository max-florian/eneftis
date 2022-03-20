import Web3 from "web3/dist/web3.min";
import { InjectedConnector } from "@web3-react/injected-connector";

/*
    Configuración del Conector:
*/
const connector = new InjectedConnector({
  supportedChainIds: [
    4, // Rinkeby (Porque soportamos smart contracts en esta red)
  ],
});

const getLibrary = (provider) => {
  return new Web3(provider);
};

export { connector, getLibrary };