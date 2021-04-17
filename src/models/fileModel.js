import { DNEXUS_FILECONTRACT_ABI } from '../assets/fileContract';

export class FileContract{
	constructor(web3object){
        this.web3object = web3object;
        this.fileContractAbi = DNEXUS_FILECONTRACT_ABI;
        this.deployedAddress = '';
        // eslint-disable-next-line no-unused-expressions
        this.fileContract;
    }

	async initializeContract(deployedAddress){
        this.deployedAddress = deployedAddress;
        this.fileContract = await new this.web3object.eth.Contract(this.fileContractAbi,this.deployedAddress);
        console.log(this.fileContract);

    }

	async uploadFileFunction(fileHash,fileDescription,accountsForFee) {
		var result = await this.fileContract.methods.uploadFile(fileHash,fileDescription).send(
			{from: accountsForFee, gas: 300000}
		);
		console.log(result);
		console.log('File uploaded Successfully')

	}
	//getFile(address _owneraddress, uint _filenumber)
	async getFileFunction(addressOwner,fileNumber) {
		try{
        var result = await this.fileContract.methods.getFile(addressOwner,fileNumber).call();
		console.log(result);
        return result;
        }
         catch(e)
        {
         return '';
        }
	}

}
