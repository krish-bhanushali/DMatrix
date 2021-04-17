import Web3 from 'web3';


let web3 = Web3();



export class Web3Repo {
    constructor(){
        this.web3 = web3;
        this.address = '';

    }

    async loadWeb3(){
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
          }
          else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
          }
          else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
          }
    }

    getCurrentProvider() {
        return this.web3.currentProvider;
    }

    async getAddressOfAccount(){
        const accounts = await this.web3.eth.getAccounts();
        this.address = accounts[0];
        return this.address;
    }

}










// Export web3 object instance
