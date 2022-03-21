import {
  Flex,
  Button,
  Tag,
  TagLabel,
  Badge,
  TagCloseButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { connector } from "../../../config/web3";
import { useCallback, useEffect, useState } from "react";
import useTruncatedAddress from "../../../hooks/useTruncatedAddress";

// Obtiene la data de nuestro wallet.
const WalletData = () => {
  const [balance, setBalance] = useState(0);
  const { active, activate, deactivate, account, error, library } =
    useWeb3React();

  // Verificar si la red es soportada. En este caso si es la de prueba de Rinkeby.
  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  // Conectar la wallet a la app. Crear la instancia de Web3
  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem("previouslyConnected", "true");
  }, [activate]);

  // Desconectar la wallet de la app
  const disconnect = () => {
    deactivate();
    localStorage.removeItem("previouslyConnected");
  };

  // Obtener el balance de la cuenta
  const getBalance = useCallback(async () => {
    const toSet = await library.eth.getBalance(account);
    setBalance((toSet / 1e18).toFixed(2)); // Que guarde solo 2 decimales
  }, [library?.eth, account]);

  // Si la wallet esta conectada que obtenga el balance de la cuenta.
  useEffect(() => {
    if (active) getBalance();
  }, [active, getBalance]);

  // Un efecto para definir si la walllet ya estaba conectada previamente con la app
  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect();
  }, [connect]);

  const truncatedAddress = useTruncatedAddress(account);

  return (
    <Flex alignItems={"center"}>
      {active ? (
        <Tag colorScheme="blue" borderRadius="full">
          <TagLabel>
            <Link to={`/myeneftis?address=${account}`}>{truncatedAddress}</Link>
          </TagLabel>
          <Badge
            d={{
              base: "none",
              md: "block",
            }}
            variant="solid"
            fontSize="0.8rem"
            ml={1}
          >
            ~{balance} Ξ
          </Badge>
          <TagCloseButton onClick={disconnect} />
        </Tag>
      ) : (
        <Button
          variant={"solid"}
          colorScheme={"blue"}
          size={"sm"}
          leftIcon={<AddIcon />}
          onClick={connect}
          disabled={isUnsupportedChain}
        >
          {isUnsupportedChain ? "Red no soportada" : "Conectar wallet"}
        </Button>
      )}
    </Flex>
  );
};

export default WalletData;
