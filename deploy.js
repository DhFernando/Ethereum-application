const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3')

const { interface , bytecode } = require('./compile')

const provider = new HDWalletProvider(
    'book elite flame birth jealous panda dolphin clutch purity carbon wear dawn',
    'https://rinkeby.infura.io/v3/24632a499b634c5ca0618039379ef5bb'
)

const web3 = new Web3(provider)
let INIT_MSG  = "Hi ! there ,"
const deploy =  async () =>{

    const accounts = await web3.eth.getAccounts();

    console.log(`Attempting to deploy from account : ${accounts[0]}`)

    //the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data : bytecode , arguments : [INIT_MSG] })
        .send({from : accounts[0] , gas:'1000000'})

    console.log(`Contract deployed to  : ${inbox.options.address}`)
}
deploy()




