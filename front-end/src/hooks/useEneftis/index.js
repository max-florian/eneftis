
import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import EneftisArtifact from "../../config/web3/artifacts/Eneftis";

const { address, abi } = EneftisArtifact;

const useEneftis = () => {
    const { active, library, chainId } = useWeb3React();

    const eneftis = useMemo(() => {
        if (active) return new library.eth.Contract(abi, address[chainId]);
    },[active, chainId, library?.eth?.Contract]);

    return eneftis;
};

export default useEneftis;