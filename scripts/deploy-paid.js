async function main() {
  const RGNFTpaid = await ethers.getContractFactory('RGNFTpaid');

  // Start deployment, returning a promise that resolves to a contract object
  const rgNFTpaid = await RGNFTpaid.deploy();
  await rgNFTpaid.deployed();
  console.log('Contract deployed to address:', rgNFTpaid.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
