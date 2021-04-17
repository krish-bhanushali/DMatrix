pragma solidity >=0.7.0 <0.8.0;

contract FileContract{
    
    struct File{
        //uint Filecount;
        string hash;
        string description;
        address owner;
    }
    
    event FileCreated(
        uint Filecount,
        string hash,
        string description,
        address owner
        );
        
    //store files
    //uint fileCount = 0;
    //mapping(address => File) public files;
    mapping(address => uint) public fileCount;
    mapping(address => mapping(uint => File)) files;
    
    //create files
    function uploadFile(string memory _fileHash, string memory _description) public{
        
        // make sure the file hash exists
        require(bytes(_fileHash).length > 0);
        
        //make sure file description exists
        require(bytes(_description).length > 0);
        
        //make sure uploader address exists
        require(msg.sender != address(0x0));
        
        //increment Filecounter
        //fileCount ++;
        
        //Add files to contract
        files[msg.sender][fileCount[msg.sender]++] = File( _fileHash, _description, msg.sender);
        
        //Trigger an event that file has been uploaded
        emit FileCreated(fileCount[msg.sender], _fileHash, _description, msg.sender);
    }
    
    function getFile(address _owneraddress, uint _filenumber) external view returns(string memory){
        string storage getFileHash = files[_owneraddress][_filenumber].hash;
        return getFileHash;
    }
}