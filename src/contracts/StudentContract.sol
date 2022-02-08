pragma solidity >=0.7.0 <0.8.0;
import './FileContract.sol';
import './UserContract.sol';

contract StudentContract is UserContract{
    
    FileContract public filecontract;
    
    constructor(address _fileaddress) public{
        filecontract = FileContract(_fileaddress);
    }
    
    //function callgetFile(address _owneraddress) public view returns(string memory){
    //    return filecontract.getFile(_owneraddress);
    //}
    
    //filecount remaining (under a student's ownership)
}