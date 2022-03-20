import {
  Stack,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Badge,
  useToast
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useWeb3React } from '@web3-react/core';
import React, { useState, useCallback, useEffect } from 'react';
import useEneftis from '../../hooks/useEneftis';


function Home() {
  const [ isMinting, setIsMinting ] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [currentEneftis, setCurrentEneftis] = useState("");

  const toast = useToast();

  const { active, account } = useWeb3React();
  const eneftis = useEneftis();

  const getEneftisData = useCallback(async () => {
    if (eneftis) {
      // Se llama a las funciones del contrato
      /**
       * El método 'totalSupply' es parte del standard ERC721 y retorna la cantidad de tokens almacenados por el contrato
       */
      const totalSupply = await eneftis.methods.totalSupply().call(); // Id actual autogenerado en el contrato.
      const image = await eneftis.methods.imageByURL(totalSupply).call(); 
      setCurrentEneftis(totalSupply);
      setImageSrc(image);
    }
  }, [eneftis]);

  useEffect(() => {
    getEneftisData();
  }, [getEneftisData]);

  // Logica de creacion del NFT
  const mint = () => {
    // Al hacer una transaccion con un fee asociado se usa "send"
    setIsMinting(true);
    eneftis.methods
    .mint()
    .send({
      from: account,
      //value: 1e18 //Si se quisiera cobrar por el mint
    }).on("transactionHash", (txHash) => {
      toast({
        title: "Transaction sended!",
        description: txHash,
        status: "info"
      })
    })
    .on("receipt", () => {
      setIsMinting(false);
      toast({
        title: "Transaction confirmed!",
        description: "Congratulations!",
        status: "success"
      })
    })
    .on("error", (error) => {
      setIsMinting(false);
      toast({
        title: "Transaction failed!",
        description: error.message,
        status: "error"
      })
    });

  }

  // const [maxSupply, setMaxSupply] = useState();

  // const getMaxSupply = useCallback(async () => {
  //   if (eneftis) {
  //     const result = await eneftis.methods.maxSupply().call();
  //     setMaxSupply(result);
  //   }
  // }, [eneftis]);

  // useEffect(() => {
  //   getMaxSupply();
  // }, [getMaxSupply]);

    return (
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "green.400",
                zIndex: -1,
              }}
            >
              Un Platzi Punk
            </Text>
            <br />
            <Text as={"span"} color={"green.400"}>
              nunca para de aprender
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Platzi Punks es una colección de Avatares randomizados cuya metadata
            es almacenada on-chain. Poseen características únicas y sólo hay 10000
            en existencia.
          </Text>
          <Text color={"green.500"}>
            Cada Platzi Punk se genera de forma secuencial basado en tu address,
            usa el previsualizador para averiguar cuál sería tu Platzi Punk si
            minteas en este momento
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"green"}
              bg={"green.400"}
              _hover={{ bg: "green.500" }}
              disabled={!eneftis}
              onClick={mint}
              isLoading={isMinting}
            >
              Obtén tu enefti
            </Button>
            <Link to="/myeneftis">
              <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
                Galería
              </Button>
            </Link>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          direction="column"
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Image src={active ? imageSrc : "https://avataaars.io/"} />
          {active ? (
            <>
              <Flex mt={2}>
                <Badge>
                  Next ID:
                  <Badge ml={1} colorScheme="green">
                    1
                  </Badge>
                </Badge>
                <Badge ml={2}>
                  Address:
                  <Badge ml={1} colorScheme="green">
                    0x0000...0000
                  </Badge>
                </Badge>
              </Flex>
              <Text 
                color={"green.600"}
                mt={4}
                >
                Eneftis minteados : {currentEneftis}
              </Text>
              <Button
                onClick={getEneftisData}
                mt={4}
                size="xs"
                colorScheme="green"
              >
                Actualizar
              </Button>
            </>
          ) : (
            <Badge mt={2}>Wallet desconectado</Badge>
          )}
        </Flex>
      </Stack>
  );
};

export default Home;