require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const DESTINATION_KEY = process.env.DESTINATION_KEY;

const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(API_URL);

const contract = require('../artifacts/contracts/RGNFT.sol/RGNFT.json');
const contractAddress = '0x86ae27ca5f76c525aaed02446c0df907e3468f4c';
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
  'https://gateway.pinata.cloud/ipfs/QmPu3pBP3sz8fG6239ZN88idrQEcn19yzAoaPqvYDyk5kt'
);
