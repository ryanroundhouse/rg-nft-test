async function main() {
  const RGNFT = await ethers.getContractFactory('RGNFT');

  // Start deployment, returning a promise that resolves to a contract object
  const rgNFT = await RGNFT.deploy();
  await rgNFT.deployed();
  console.log('Contract deployed to address:', rgNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
