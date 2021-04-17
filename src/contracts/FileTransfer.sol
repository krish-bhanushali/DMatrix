pragma solidity >=0.7.0 <0.8.0;

contract FileTransfer{

    address public owner = msg.sender;
    //Structure
    mapping (address=>string) public ipfsInbox;
    
    //Events
    event ipfsSent(string _ipfsHash, address payable _address);
    event inboxResponse(string response);
    
    //Modifiers
    modifier notFull (string memory _string) {
    bytes memory stringTest = bytes(_string); 
    require(stringTest.length==0); 
    _;
    }
    modifier restricted() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
    }
    
    // An empty constructor that creates an instance of the contract
    constructor() public{}
    
    //takes in receiver's address and IPFS address. Places the IPFSadress in the receiver's inbox
    function sendIPFS(address payable _address, string memory _ipfsHash) notFull(ipfsInbox[_address]) public{
        ipfsInbox[_address] = _ipfsHash;
        emit ipfsSent(_ipfsHash, _address);
    }
    
    //check your inbox and empties it afterwards
    function checkInbox() public restricted{
        string memory ipfs_hash=ipfsInbox[msg.sender];
        if(bytes(ipfs_hash).length==0){
            emit inboxResponse("Empty Inbox");
        }else{
            ipfsInbox[msg.sender]="";
            emit inboxResponse(ipfs_hash);
        }
    }

    //retrieves hash
    function getHash(address _address) public{
        string memory ipfs_hash=ipfsInbox[_address];
        emit inboxResponse(ipfs_hash);
    }
    
}