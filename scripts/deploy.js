const deploy = async () => {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contract with account: ", deployer.address);

    const Enefti = await ethers.getContractFactory("Enefti");

    // El deploy funciona como el constructor del contrato
    const deployed = await Enefti.deploy();

    console.log("Enefti is deployed at: ", deployed.address);
};

deploy()
.then(() => process.exit(0))
.catch((error) => {
    console.log(error);
    process.exit(1);
});