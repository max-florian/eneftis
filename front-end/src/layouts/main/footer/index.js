import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      color={"gray.100"}
    >
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        bgGradient='linear(to-l, #7928CA, #FF0080)'
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>
            Copyright © {new Date().getFullYear()} , Diseños creados por 
            <Link ml={1} href="https://www.twitch.tv/k7droid">
              Max Florian
            </Link>
          </Text>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
