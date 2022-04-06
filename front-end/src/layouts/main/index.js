import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NavLink from "./nav-link";
import Footer from "./footer";
import WalletData from "./wallet-data";
import logo from "../../assets/images/logo.png";

const Links = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Mis Eneftis",
    to: "/myeneftis",
  },
  {
    name: "Crear una Wallet de Prueba",
    to: "/createwallet",
  },
];

const MainLayout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex minH="100vh" direction="column">
      <Box
        mx="auto"
        maxW={"7xl"}
        width="100%"
        bg={useColorModeValue("white", "gray.800")}
        px={0}
      >
        <Flex
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          color={"gray.100"}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"none"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            variant='outline'
            colorScheme='blue'
          />
          <HStack spacing={8} alignItems={"center"}>
            <Flex alignItems="center">
            <Image
              boxSize='40px'
              borderRadius="30%"
              objectFit='cover'
              src={logo}
              alt='Eneftis logo'
            />
              <Heading size="md" color="blue.100" mt={0.2} ml={2.5}>
                ENFTS
              </Heading>
            </Flex>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map(({ name, to }) => (
                <NavLink key={name} to={to}>
                  {name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <WalletData />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map(({ name, to }) => (
                <NavLink key={name} to={to}>
                  {name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box mx="auto" flex={1} p={4} maxW={"7xl"} width="100%">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

export default MainLayout;
