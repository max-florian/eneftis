import {
    Stack,
    Text,
    Image
  } from "@chakra-ui/react";
  
  const CreateWallet = () => {
    return(
        <Stack
            align={"center"}
            px={100}
            h={8}
            spacing={5}
        >
            <Text fontSize='5xl'>Crea tu propia Wallet de Prueba</Text>
            <Image 
                src="https://lh3.googleusercontent.com/7vD9R9Ok0n0zphJmpICs6qw_V85k0ddrPHYpxtPhNZKmggCbq6tivTy3S0GRV2ewvMjyQ-snlcCe5t07vpxN0sHfVw=w640-h400-e365-rj-sc0x00ffffff" 
                htmlWidth="100%"
                htmlHeight="auto"
            />
            
            <Text >
                Para utilizar la aplicación es necesario crear una billetera de ether en Metamask que se pueda usar
                en la red de prueba de Rinkeby. Así mismo es necesario que esta cuente con cierta cantidad de Ether para
                poder realizar el minteo de los NFTs, por lo que en este articulo se detallará como realizar todo esto.
            </Text>

            <Text fontSize='4xl'>1. Instalar Metamask</Text>
            <Text>

            </Text>
            <Image 
                src="https://images.hive.blog/DQmNqukuh97JmzvRHdPFX9ogy2s2tgJWRzb62JyrNzqa454/image.png"
                htmlWidth="250px"
                htmlHeight="250px"  /** Hay que cambiarlo */
            />

            <Text fontSize='4xl'>2. Crear una cuenta en Metamask</Text>
            <Text>

            </Text>
            <Image 
                src="https://images.hive.blog/DQmNqukuh97JmzvRHdPFX9ogy2s2tgJWRzb62JyrNzqa454/image.png"
                htmlWidth="250px"
                htmlHeight="250px"  /** Hay que cambiarlo */
            />

            <Text fontSize='4xl'>3. Conseguir Ethers Gratis</Text>
            <Text>

            </Text>
            <Image 
                src="https://images.hive.blog/DQmNqukuh97JmzvRHdPFX9ogy2s2tgJWRzb62JyrNzqa454/image.png"
                htmlWidth="250px"
                htmlHeight="250px"  /** Hay que cambiarlo */
            />

        </Stack>
    );
  };
  
  export default CreateWallet;