import {
    Stack,
    Heading,
    Text,
    Button,
    Tag,
    useToast,
  } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import RequestAccess from "../../components/request-access";
import EneftiCard from "../../components/enefti-card";
import { useEneftiData } from "../../hooks/useEneftisData";
import { useParams } from "react-router-dom";
import Loading from "../../components/loading";
import { useState } from "react";
import useEneftis from "../../hooks/useEneftis";
  
  const Enefti = () => {
    const { active, account, library } = useWeb3React();
    const { tokenId } = useParams();
    const { loading, nefti, update } = useEneftiData(tokenId);
    const eneftis = useEneftis();
    const toast = useToast();
    const [transfering, setTransfering] = useState();
    const transfer = () => {
        setTransfering(true);
        const address = prompt("Ingresa la dirección: ")
        const isAddress = library.utils.isAddress(address);
        
        // Verificar si la dirección a donde se va a transferir el NFT es valida o no
        if(!isAddress) {
            toast({
                title: "Dirección Invalida",
                description: "La dirección no es una dirección de Ethereum",
                status: "error",
            })
            setTransfering(false)
        }else{
            eneftis.methods
            .safeTransferFrom(nefti.owner, address, nefti.tokenId)
            .send({
                from: account
            })
            .on("transactionHash", (txHash) => {
                toast({
                  title: "Transaction sended!",
                  description: txHash,
                  status: "info"
                })
              })
            .on("receipt", () => {
                setTransfering(false);
                toast({
                  title: "Transaction confirmed!",
                  description: `The enefti now belongs to ${address}`,
                  status: "success"
                })
            })
            .on("error", (error) => {
                setTransfering(false);
                toast({
                  title: "Transaction failed!",
                  description: error.message,
                  status: "error"
                })
                update();
            });
        }
    }

    if (!active) return <RequestAccess />;
  
    if (loading) return <Loading />;
  
    return (
      <Stack
        spacing={{ base: 8, md: 10 }}
        py={{ base: 5 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack>
          <EneftiCard
            mx={{
              base: "auto",
              md: 0,
            }}
            name={nefti.name}
            image={nefti.image}
          />
          <Button 
          disabled={account !== nefti.owner} 
          colorScheme="green"
          onClick={transfer}
          isLoading={transfering}
          >
            {account !== nefti.owner ? "No eres el dueño" : "Transferir"}
          </Button>
        </Stack>
        <Stack width="100%" spacing={5}>
          <Heading>{nefti.name}</Heading>
          <Text fontSize="xl">{nefti.description}</Text>
          <Text fontWeight={600}>
            Owner:
            <Tag ml={2} colorScheme="green">
              {nefti.owner}
            </Tag>
          </Text>
        </Stack>
      </Stack>
    );
  };
  
  export default Enefti;