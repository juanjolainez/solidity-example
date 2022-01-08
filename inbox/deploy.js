const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  "Add 12 words mnemonic",
  "Add Infura API auth from https://infura.io/dashboard"
);

const webInstance = new Web3(provider);

const deploy = async () => {
  const accounts = await webInstance.eth.getAccounts();
  console.log("Attempting to deploy from account " + accounts[0]);

  const result = await new webInstance.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hello there'] })
    .send({ from: accounts[0], gas: "1000000" });

  console.log(result.options.address);

  provider.engine.stop();

};

deploy();
