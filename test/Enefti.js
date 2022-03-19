const { expect } = require("chai");

describe('Eneftis Contract', () => {
    
    //Declaramos el setup porque va a ser un standard para cada test
    const setup = async({ maxSupply = 10000 } = {}) => {
        const [owner] = await ethers.getSigners();
        const Enefti = await ethers.getContractFactory("Enefti");
        const deployed = await Enefti.deploy(maxSupply);

        return {
            owner,
            deployed
        };
    };

    describe('Deployment', () => {

        // Test para verificar que se settea bien el maxSupply a la hora de hacer el deploy del contrato.
        it ('Sets max supply to passed param', async() => {
            const maxSupply = 4000;
            const { deployed } = await setup({ maxSupply });
            const returnedMaxSupply = await deployed.maxSupply();

            expect(maxSupply).to.equal(returnedMaxSupply);
        });
    });

    describe('Minting', () => {
        it('Mints a new token and assigns it to a new owner', async() => {
            const { owner, deployed } = await setup({});

            await deployed.mint();

            const ownerOfMinted = await deployed.ownerOf(0);
            expect(ownerOfMinted).to.equal(owner.address);
        });

        it('Has a minting limit', async() => {
            const maxSupply = 2;
            const { deployed } = await setup({ maxSupply });
            
            // Mintiar todos
            await Promise.all ([
                await deployed.mint(),
                await deployed.mint()
            ])
            

            // Corroborar el último mint
            await expect(deployed.mint()).to.be.revertedWith("No Eneftis left xdn't");
        });
    });

    // Test para verificar que el tokenURI generado tenga todos los parametros necesarios.
    describe("tokenURI", () => {
        it("returns valid metadata", async () => {
          const { deployed } = await setup({});
  
          await deployed.mint();
  
          const tokenURI = await deployed.tokenURI(0);
          const stringifiedTokenURI = await tokenURI.toString();
          const [, base64JSON] = stringifiedTokenURI.split(
            "data:application/json;base64,"
          );
          const stringifiedMetadata = await Buffer.from(
            base64JSON,
            "base64"
          ).toString("ascii");
  
          const metadata = JSON.parse(stringifiedMetadata);
  
          expect(metadata).to.have.all.keys("name", "description", "image");
        });
    });
})