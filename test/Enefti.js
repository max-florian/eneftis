const { expect } = require("chai");

describe('Eneftis Contract', () => {
    
    //Declaramos el setup porque va a ser un standard para cada test
    const setup = async({ maxSupply = 10000 }) => {
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
})