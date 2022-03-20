import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
    Grid,
    InputGroup,
    InputLeftElement,
    Input,
    InputRightElement,
    Button,
    FormHelperText,
    FormControl
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Loading from "../../components/loading";
import EneftiCard from "../../components/enefti-card";
import RequestAccess from "../../components/request-access";
import { useEneftisData } from "../../hooks/useEneftisData";

const Eneftis = () => {
    const { active, library } = useWeb3React();
    const [ submitted, setSubmitted ]  = useState(true);
    const [validAddress, setValidAddress] = useState(true);
    const { search } = useLocation();
    const [address, setAddress] = useState(
        new URLSearchParams(search).get("address")
    );
    const { neftis, loading } = useEneftisData({
        owner: submitted && validAddress ? address : null,
    });
    const navigate = useNavigate();
    const handleAddressChange = ({ target: { value } }) => {
        setAddress(value);
        setSubmitted(false);
        setValidAddress(false);
    };

    // Desplegar los eneftis de una direccion y ya no todos los existentes.
    const submit = (event) => {
        event.preventDefault();
    
        if (address) {
          const isValid = library.utils.isAddress(address);
          setValidAddress(isValid);
          setSubmitted(true);
          if (isValid) navigate(`/myeneftis?address=${address}`);
        } else { // Si no es valida la direccion muestra los propios.
          navigate("/myeneftis");
        }
    };

    if (!active) return <RequestAccess/>;

    return (
        <>
          <form onSubmit={submit}>
            <FormControl>
              <InputGroup mb={3}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  isInvalid={false}
                  value={address ?? ""}
                  onChange={handleAddressChange}
                  placeholder="Buscar por dirección"
                />
                <InputRightElement width="5.5rem">
                  <Button type="submit" h="1.75rem" size="sm">
                    Buscar
                  </Button>
                </InputRightElement>
              </InputGroup>
              {submitted && !validAddress && (
                <FormHelperText>Dirección inválida</FormHelperText>
              )}
            </FormControl>
          </form>
          {loading ? (
            <Loading />
          ) : (
            <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
              {neftis.map(({ name, image, tokenId }) => (
                <Link key={tokenId} to={`/myeneftis/${tokenId}`}>
                  <EneftiCard image={image} name={name} />
                </Link>
              ))}
            </Grid>
          )}
        </>
      );
}

export default Eneftis;