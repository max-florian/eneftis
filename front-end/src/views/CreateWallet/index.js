import {
    VStack,
    Text,
    Image,
    Link
  } from "@chakra-ui/react";

  import img1 from "../../assets/images/CreateWallet/1.png";
  import img2 from "../../assets/images/CreateWallet/2.png";
  import img3 from "../../assets/images/CreateWallet/3.png";
  import img4 from "../../assets/images/CreateWallet/4.png";
  import img5 from "../../assets/images/CreateWallet/5.png";
  import img6 from "../../assets/images/CreateWallet/6.png";
  import img7 from "../../assets/images/CreateWallet/7.png";
  import img8 from "../../assets/images/CreateWallet/8.png";
  import img9 from "../../assets/images/CreateWallet/9.png";
  import img10 from "../../assets/images/CreateWallet/10.png";
  import img11 from "../../assets/images/CreateWallet/11.png";
  import img12 from "../../assets/images/CreateWallet/12.png";
  import img13 from "../../assets/images/CreateWallet/13.png";
  import img14 from "../../assets/images/CreateWallet/14.png";

  function CreateWallet() {
    return(
        <VStack
            align={"center"}
            spacing={5}
            mt={2}
            ml={"7%"}
            mr={"7%"}
        >
            <Text fontSize='5xl'>Crea tu propia Wallet de Prueba</Text>
            <Image 
                src="https://lh3.googleusercontent.com/7vD9R9Ok0n0zphJmpICs6qw_V85k0ddrPHYpxtPhNZKmggCbq6tivTy3S0GRV2ewvMjyQ-snlcCe5t07vpxN0sHfVw=w640-h400-e365-rj-sc0x00ffffff" 
                htmlWidth="100%"
                htmlHeight="auto"
            />
            
            <Text fontSize='lg' align='justify'>
                Para utilizar la aplicación es necesario crear una billetera de ether en Metamask que se pueda usar
                en la red de prueba de Rinkeby. Así mismo es necesario que esta cuente con cierta cantidad de Ether para
                poder realizar el minteo de los NFTs, por lo que en este articulo se detallará como realizar todo esto.
            </Text>

            <Text fontSize='4xl'>1. Instalar Metamask</Text>
            <Text fontSize='lg'>
                Ingresar a <Link href='https://metamask.io' color={"cyan.200"} isExternal>metamask.io</Link> y descargar la versión de Metamask compatible con tu sistema operativo.
            </Text>
            <Image 
                src={img1}
                htmlWidth="100%"
                htmlHeight="auto"
            />
            <Text fontSize='lg'>
                En el caso de los navegadores basados en Chromium, solo es necesario agregar la extensión por medio de la Chrome Web Store.
            </Text>
            <Image 
                src={img2}
                htmlWidth="100%"
                htmlHeight="auto"
            />
            <Text fontSize='lg'>
                Listo! Comenzarás con el proceso para crear una cuenta en Metamask.
            </Text>
            <Image 
                src={img3}
                htmlWidth="100%"
                htmlHeight="auto"
            />

            <Text fontSize='4xl'>2. Crear y Configurar una Cuenta en Metamask</Text>
            <Text fontSize='lg'>
                Luego que hayamos instalado Metamask deberemos crear una nueva cuenta o "cartera". Por lo
                que seleccionamos la opción de la derecha.
            </Text>
            <Image 
                src={img4}
                htmlWidth="100%"
                htmlHeight="auto"
            />
            <Text fontSize='lg'>
                Configuramos la cuenta como nos lo pide a continuación y listo! Ya tendriamos configurada
                nuestra cuenta de Metamask!
            </Text>
            <Image 
                src={img5}
                htmlWidth="100%"
                htmlHeight="auto"
            />
            <Image 
                src={img6}
                htmlWidth="100%"
                htmlHeight="auto"
            />
            <Text fontSize='lg'>
                Vemos que por defecto nos crea una wallet llamada "Account 1". En este caso se usará esa precisamente, 
                pero puedes crear las que quieras.
            </Text>
            <Image 
                src={img7}
                htmlWidth="100%"
                htmlHeight="auto"
            />
            <Text fontSize='lg'>
                Clickeamos en "Red principal de Ethereum" y podremos observar las redes que tenemos disponibles actualmente.
                Dentro de esta opción debemos dirigirnos a "show/hide test networks".
            </Text>
            <Image 
                src={img8}
                htmlWidth="100%"
                htmlHeight="auto"
            />
            <Text fontSize='lg'>
                Nos desplegará un menú donde activaremos la opción para mostrar las diferentes redes de prueba compatibles
                con Metamask.
            </Text>
            <Image 
                src={img9}
                htmlWidth="100%"
                htmlHeight="auto"
            />
            <Text fontSize='lg'>
                Ya nos apararecen las distintas redes de prueba. En nuestro caso seleccionaremos la de Rinkeby. 
                Y listo! Ya tendremos configurada nuestra wallet para usar la aplicación.
            </Text>
            <Image 
                src={img10}
                htmlWidth="100%"
                htmlHeight="auto"
            />
            

            <Text fontSize='4xl'>3. Conseguir Ethers Gratis</Text>
            <Text fontSize='lg'>
                Al tener configurada nuestra wallet podemos observar que no tenemos ningún ether para poder realizar transacciones
                en la red de prueba de Rinkeby, por lo que deberemos conseguir unos. Para esto necesitaremos la dirección de la wallet
                que acabamos de configurar, lo cual se hace haciendo click en el nombre de la wallet "Account 1".
            </Text>
            <Image 
                src={img11}
                htmlWidth="100%"
                htmlHeight="auto"
            />
            <Text fontSize='lg'>
                Teniendo copiada la dirección de nuestro wallet nos dirigiremos a <Link href='https://rinkebyfaucet.com/' color={"cyan.200"} isExternal>rinkebyfaucet.com</Link>.
                Aquí unicamente deberemos pegar la dirección de nuestra wallet y darle click en "Send Me ETH" para recibir 0.1 ETH, lo cual es
                suficiente para interactuar con la aplicación. Luego de unos minutos aparecerá la dirección de la transacción en la red de prueba 
                de Rinkeby.
            </Text>
            <Image 
                src={img12}
                htmlWidth="100%"
                htmlHeight="auto"
            />
            <Image 
                src={img13}
                htmlWidth="100%"
                htmlHeight="auto"
            />
            <Text fontSize='lg'>
                Y por último, veremos que ya se nos acreditaron los ETHs a nuestra wallet. Listo! Ya puedes interactuar con esta y otras
                aplicaciones en la red de prueba de Rinkeby!
            </Text>
            <Image 
                src={img14}
                htmlWidth="100%"
                htmlHeight="auto"
            />

        </VStack>
    );
  };
  
  export default CreateWallet;