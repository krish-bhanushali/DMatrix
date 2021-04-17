import { DNEXUS_USERCONTRACT_ABI } from '../repository/userContract';

export class UserContract {

    constructor(web3object){
        this.web3object = web3object;
        this.userAbi = DNEXUS_USERCONTRACT_ABI;
        this.deployedAddress = '';
        // eslint-disable-next-line no-unused-expressions
        this.userContract;
    }

    
    async initializeContract(deployedAddress){
        this.deployedAddress = deployedAddress;
        this.userContract = await new this.web3object.eth.Contract(this.userAbi,this.deployedAddress);
        console.log(this.userContract);
    }

    
    async getuserDataNameFunction(userAddress){
        var result = await this.userContract.methods.getuserDataName(userAddress).call();
        console.log(result);
        return result;
    }

    async createUserFunction(schoolAddress,userAddress,userName,firstname,lastname,email,accountsForFee){
       try {
        var result = await this.userContract.methods.createUser(schoolAddress,userAddress,userName,firstname,lastname,email).send({from: accountsForFee, gas: 300000});
        console.log(result);
        return 'User Successful';

       }catch(e){
        return 'User Already Existed';
       }
       
       

    }
}

