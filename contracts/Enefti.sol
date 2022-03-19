// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Base64.sol";


contract Enefti is ERC721 {
    
    using Counters for Counters.Counter;

    // Contador de tipo Counter
    Counters.Counter private _idCounter;
    uint256 public maxSupply;

    constructor(uint256 _maxSupply) ERC721("Enefti", "ENFT") {
        maxSupply = _maxSupply;
    }

    function mint() public {
        // Limitar el supply total de eneftis dentro del contrato.
        uint256 current = _idCounter.current();
        require(current < maxSupply, "No Eneftis left xdn't");
        _safeMint(msg.sender, current);
        _idCounter.increment();
    }

    // Función que se usa para indicar de donde vienen los nfts (nft base)
    function _baseURI() internal pure override returns(string memory){
        return "https://link base de donde sacamos las imgs de los NFTS";
    }

    function imageByURL(string memory imageid) public pure returns(string memory) {
        string memory baseURI = _baseURI();
        string memory id = imageid;

        return string(abi.encodePacked(baseURI,id));
    }

    // Función que devuelve el string del json del NFT
    function tokenURI (uint256 tokenId) 
        public 
        view 
        override 
        returns(string memory) 
    {
        require(
            _exists(tokenId),
            "ERC721 Metadata: URI query for nonexistent token"
        );

        string memory image = imageByURL(string(abi.encodePacked("inicio del nombre del NFT",tokenId)));

        string memory jsonURI = Base64.encode(
            abi.encodePacked(
                '{ "name": "Enefti #',
                tokenId,
                '", "description": "Eneftis are randomized Avatars stored on chain to try developing a DApp", "image": "',
                image,
                '"}'
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", jsonURI));
    }

    // Override required
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721/**, ERC721Enumerable*/) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721/**, ERC721Enumerable*/)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

/**
    Metadata del ERC721
    El ERC721 Metadata es una extensión al estándar ERC721 para NFT que añade estas 3 funciones:
    - name: El nombre del token
    - symbol: El simbolo con el que se identifica en el mercado.
    - tokenURI: Una URL que debe regresar un archivo JSON con las propiedades
                del NFT.
 */