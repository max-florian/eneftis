import { Link as DefaultLink, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NavLink = ({ children, ...props }) => (
  <DefaultLink
    px={2}
    py={1}
    as={Link}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("purple.500", "purple.800"),
    }}
    {...props}
  >
    {children}
  </DefaultLink>
);

export default NavLink;
