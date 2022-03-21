require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const DESTINATION_KEY = process.env.DESTINATION_KEY;

const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(API_URL);

const contract = require('../artifacts/contracts/RGNFT-paid.sol/RGNFTpaid.json');
const contractAddress = '0xa514653b3e2260a98Db0abb0ccaB8FE2Ce711859';
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(DESTINATION_KEY, tokenURI).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY + '1');
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              'The hash of your transaction is: ',
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              'Something went wrong when submitting your transaction:',
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(' Promise failed:', err);
    });
}

mintNFT(
  'https://gateway.pinata.cloud/ipfs/QmPg4WyJkrQPFVvfpAJq97Kb3zVhry6Cg3Dtaq5pj8N63b'
);
