import {useCallback, useEffect, useState} from "react";
import { useWeb3React } from "@web3-react/core";
import useEneftis from "../useEneftis";

// A partir de esta funcion vamos a traer la info de todos los NFTs existentes

const getEneftiData = async({ eneftis, tokenId }) => {
    const [tokenURI, owner] = await Promise.all([
        eneftis.methods.tokenURI(tokenId).call(),
        eneftis.methods.ownerOf(tokenId).call()
    ]);

    const responseMetadata = await fetch(tokenURI);
    const metadata = await responseMetadata.json();

    return {
        tokenId,
        tokenURI,
        owner,
        ...metadata,
    }
}

const useEneftisData = ({ owner = null } = {}) => {
    const [neftis, setNeftis] = useState([]);
    const { library } = useWeb3React();
    const [loading, setLoading] = useState(true);
    const eneftis = useEneftis();

    const update = useCallback(async() => {
        if (eneftis) {
            setLoading(true);

            let tokenIds;

            if(!library.utils.isAddress(owner)) {
                const totalSupply = await eneftis.methods.totalSupply().call();
                /*
                    tokensId es un nuevo arreglo de tama;o totalSupply y cada uno lo llenamos vacio
                    Luego se va llenando cada espacio vacio con el index secuencial 
                */
                tokenIds = new Array(Number(totalSupply))
                .fill()
                .map((_, index) => index);
            }else{
                const balanceOf = await eneftis.methods.balanceOf(owner).call();

                /**
                    Mapear la lista de tokensId que le pertenecen a la direccion.
                 */
                const tokenIdsOfOwner = new Array(Number(balanceOf))
                .fill()
                .map((_, index) => 
                    eneftis.methods.tokenOfOwnerByIndex(owner, index).call()
                );

                tokenIds = await Promise.all(tokenIdsOfOwner);
            }

            const eneftisPromise = tokenIds.map((tokenId) => getEneftiData({ tokenId, eneftis }))
            const neftis = await Promise.all(eneftisPromise);

            setNeftis(neftis);

            setLoading(false);
        }
    }, [eneftis, owner, library?.utils]);

    useEffect(() => {
        update();
    }, [update]);

    return {
        loading,
        neftis,
        update,
    };

};

// Info de un solo NFT
const useEneftiData = (tokenId = null) => {
    const [nefti, setNefti] = useState({});
    const [loading, setLoading] = useState(true);
    const eneftis = useEneftis();
    const update = useCallback(async() => {
        if (eneftis && tokenId != null) {
            setLoading(true);

            const toSet = await getEneftiData({ tokenId, eneftis });
            setNefti(toSet);

            setLoading(false);
        }
    }, [eneftis, tokenId]);

    useEffect(() => {
        update()
    },[update]);

    return {
        loading,
        nefti,
        update,
    }
}

export { useEneftisData, useEneftiData};

