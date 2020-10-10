const assert =  require('assert')
const ganache =  require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const { interface , bytecode } = require('../compile')

let accounts;
let inbox ;
let _message
let INIT_MSG  = "Hi ! there ,"
beforeEach(async () =>{
    //get list of all accounts
    accounts = await web3.eth.getAccounts();
            
    //use one of those accounts to deploy

    //the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data : bytecode , arguments : [INIT_MSG] })
        .send({from : accounts[0] , gas:'1000000'})
})


describe('Inbox' , ()=>{
    it('deploys a contract' ,()=>{
        assert.ok(inbox.options.address)
    })

    it('Get message', async ()=>{
        _message =  await inbox.methods.message().call();
        assert.equal(_message , INIT_MSG)
    })

    it('send message' , async ()=>{
        let sendMessage = "bye bro !"
        await inbox.methods.setMessage(sendMessage).send({from : accounts[0]})
        const message = await inbox.methods.message().call()
        assert.equal(message , sendMessage)


    })
})





