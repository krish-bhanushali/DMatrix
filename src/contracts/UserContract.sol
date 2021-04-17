pragma solidity >=0.7.0 <0.8.0;

contract UserContract{

    struct User{
        // uint256 id;
        address school;

        string name;
        string firstname;
        string lastname;
        string email;
        //other stuff
        bool set; // This boolean is used to differentiate between unset and zero struct values
        //Designation Remaining
    }

    mapping(address => User) public users;

    function createUser(address _schoolAddress, address _userAddress, string memory _userName, string memory _firstname, string memory _lastname, string memory _email) public {
    User storage user = users[_userAddress];
    // Check that the user did not already exist:
    require(!user.set);
    //Store the user
    users[_userAddress] = User({
        school: _schoolAddress,
        // id: _userId,
        name: _userName,
        firstname: _firstname,
        lastname: _lastname,
        email: _email,
        set: true
    });
    }

    //mapping(uint256 => bytes32) public userDataHashes; // to store user userDataHashes

    // function storeUserDataHash(uint256 _userId, bytes32 _dataHash) public {
    // userDataHashes[_userId] = _dataHash;
    // }

    function getuserDataName(address _userAddress) external view returns (string memory) {
        string storage getUserName = users[_userAddress].name;
        return getUserName;
    }

}