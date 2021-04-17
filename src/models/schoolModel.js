import { DNEXUS_SCHOOLCONTRACT_ABI } from '../assets/schoolContract';

export class SchoolContract {
    

    constructor(web3object){
        this.web3object = web3object;
        this.schoolAbi = DNEXUS_SCHOOLCONTRACT_ABI;
        this.deployedAddress = '';
        // eslint-disable-next-line no-unused-expressions
        this.schoolContract;
    }

   

    async initializeContract(deployedAddress){
        this.deployedAddress = deployedAddress;
        this.schoolContract = await new this.web3object.eth.Contract(this.schoolAbi,this.deployedAddress);
        console.log(this.schoolContract);


    }

    async addStudentFunction(schoolAddress,userAddress,userName,firstName,lastName,email,accountsForFee){
        
        try{
            var token = await this.schoolContract.methods.addStudent(schoolAddress,userAddress,userName,firstName,lastName,email).send({from: accountsForFee, gas: 300000});
            console.log('done');
            console.log(token);
            return token;
        }catch(e){
			console.log(e);
            return 'Student Already Added';
        }
        
    }
 
 
    async hasStudentFunction(studentAddress){
       var result =  await this.schoolContract.methods.hasStudent(studentAddress).call();
       return result;
    }

    async studentCountFunction(schoolAddress,myAddress){
        var result = await this.schoolContract.methods.studentCount(schoolAddress).call();
        console.log(result);
		return result;
    }

    async getStudentsFunction(schoolAddress){
        var result = await this.schoolContract.methods.getStudents(schoolAddress).call();
        console.log(result);
    }

    async getStudentFunction(studentAddress){
        var result = await this.schoolContract.methods.getStudent(studentAddress).call();
        console.log(result);
    }
 
}
