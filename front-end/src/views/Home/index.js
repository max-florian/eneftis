import {
  Stack,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  Badge,
  useToast,
  useColorModeValue,
  useColorMode
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useWeb3React } from '@web3-react/core';
import React, { useState, useCallback, useEffect } from 'react';
import useEneftis from '../../hooks/useEneftis';


function Home() {
  const [ isMinting, setIsMinting ] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [currentEneftis, setCurrentEneftis] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const { colorMode, toggleColorMode } = useColorMode();

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
        bg={useColorModeValue("white", "gray.800")}
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
                bg: "blue.400",
                zIndex: -1,
              }}
            >
              Eneftis
            </Text>
            <br />
            <Text as={"span"} color={"blue.400"}>
              Tu introducción al mundo de los NFTs a un precio accesible
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Eneftis es una colección de "dibujos" realizados por mi por lo que son únicos e irrepetibles.
            Está de más decir que dada mi poca habilidad para dibujar te aseguras al 100% que no están generados por
            computadora. El fin de este proyecto es acercar al usuario al mundo de los NFTs sin afectar en lo absoluto a su economía.
          </Text>
          <Text color={"blue.500"}>
            Los Eneftis salen al mercado de forma secuencial por lo que el Enefti que se muestra en la previsualización es 
            el que se encuentra actualmente disponible a la venta y unicamente este se podrá comprar. Luego de que este
            sea minteado por su nuevo dueño saldrá otro a la venta que cualquier usuario podrá adquirir.
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
              colorScheme={"blue"}
              bg={"blue.400"}
              _hover={{ bg: "blue.500" }}
              disabled={!eneftis}
              onClick={mint}
              isLoading={isMinting}
            >
              Obtén tu Enefti
            </Button>
            <Button 
              rounded={"full"} 
              size={"lg"} 
              fontWeight={"normal"} 
              px={6}
              onClick={()=>{navigate("/myeneftis")}}
            >
              Galería
            </Button>
            <Button onClick={toggleColorMode}>
              Toggle {colorMode === 'Dark' ? 'Light' : 'Dark'}
            </Button>
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
          <Image 
            src={active ? imageSrc : "https://avataaars.io/"} 
            width={"450"}
            height={"450"}  
            marginBottom="5"
          />
          {active ? (
            <>
              <Flex mt={2}>
                <Badge>
                  Next ID:
                  <Badge ml={1} colorScheme="blue">
                    1
                  </Badge>
                </Badge>
                <Badge ml={2}>
                  Address:
                  <Badge ml={1} colorScheme="blue">
                    0x0000...0000
                  </Badge>
                </Badge>
              </Flex>
              <Text 
                color={"blue.600"}
                mt={4}
                >
                Eneftis minteados : {currentEneftis}
              </Text>
              <Button
                onClick={getEneftisData}
                mt={4}
                size="xs"
                colorScheme="blue"
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