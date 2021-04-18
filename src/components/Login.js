import {Form,Col,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useEffect, useState } from "react";
import {DNEXUS_USERCONTRACT_ABI} from '../repository/userContract';
import {DNEXUS_USERCONTRACT_DEPLOY_ADDRESS} from '../repository/address';
import {UserContract} from '../models/userModel.js';
import { Link } from "react-router-dom";
import Web3 from 'web3';
let userContract = new UserContract(window.web3);


const LoginForm = ({accountObject,web3Object,schoolContract}) => {

  //Pass this in the start
  let web3 = web3Object;
    const [isStudent,setIsStudent] = useState(false);
    const [isSubmit,setIsSubmit] = useState(false);
    const [email,setEmail] = useState('');
    const [fName,setFName] = useState('');
    const [lName,setLName] = useState('');
    const [schoolAddress,setSchoolAddress] = useState('');
    const [userContract,setUserContract] = useState();
    const [statusRegistration,setStatus] = useState('');

   useEffect(() => {
   
    setUserContract(new web3.eth.Contract(DNEXUS_USERCONTRACT_ABI, DNEXUS_USERCONTRACT_DEPLOY_ADDRESS));
    console.log('contract initialized');

   },[]);


    async function onSubmitNew () {
     
    //  await userContract.createUserFunction('0xA56B3A277c2697a412bfd00f67431f1237a0Fa41','0xB077956Fb4e86D6435c2E465E709917495bf9B9C','Krish Bhanushali',accountObject.web3Account);
    //  await userContract.methods.createUser('0xA56B3A277c2697a412bfd00f67431f1237a0Fa41','0xeC0a8133FaE850910B3bA1C277CCe6088E325cF2','Krish Bhanushali','e','ee','@mail','Student').send({from: accountObject.web3Account, gas: 300000});
     await createUser();
      console.log('done');
    }
      
    async function createUser(){
      
      if(isStudent === true){
        try{
          console.log(schoolAddress);
          await schoolContract.methods.addStudent(schoolAddress,accountObject.web3Account,fName,fName,lName,email,'Student').send({from: accountObject.web3Account, gas: 300000});
          await userContract.methods.createUser(schoolAddress,accountObject.web3Account,fName,fName,lName,email,'School').send({from: accountObject.web3Account, gas: 300000});
          console.log('done Student');
          setStatus('Registration Complete');
          setIsSubmit(true);
        }catch(e){
          console.log(e);
          setStatus('User Exists or Registration error');
        }
      }else{
       try{
        setSchoolAddress(accountObject.web3Account);
        
        await userContract.methods.createUser(accountObject.web3Account,accountObject.web3Account,fName,fName,lName,email,'School').send({from: accountObject.web3Account, gas: 300000});
        console.log('School');
        setIsSubmit(true);
       }catch(e){
        console.log(e);
        setStatus('User Exists or Registration error');
       }
      }
       
      

    }

    async function getUserData() {
      var data = await userContract.methods.getData('0xeC0a8133FaE850910B3bA1C277CCe6088E325cF2').call();
      console.log(data["0"]);
    }

    const handleEmailEntry = (e) => {
      setEmail(e.target.value);
      console.log(email);

    }
    const handleFnameEntry = (e) => {
      setFName(e.target.value);
      console.log(fName);

    }
    const handleLnameEntry = (e) => {
      setLName(e.target.value);
      console.log(lName);

    }

    const handleSchoolEntry = (e) => {
      if(isStudent === true){
        setSchoolAddress(e.target.value);
      }

      console.log(schoolAddress);

    }

    const onDropDownSelect = (e) => {
        console.log(e.target.value);
        if(e.target.value === 'Student'){
            setIsStudent(true)
        }
        else {
            setIsStudent(false)
        }
    }

    return ( 
    <div className="loginContainer">
    <Form>
    <Form.Row>
      <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => handleEmailEntry(e)} />
      </Form.Group>
 
     
    </Form.Row>
  
    <Form.Row>
    <Col>
      <Form.Control placeholder="First name" onChange={(e) => handleFnameEntry(e)}/>
    </Col>
    <Col>
      <Form.Control placeholder="Last name" onChange={(e) => handleLnameEntry(e)}/>
    </Col>
  </Form.Row>
   <p>

   </p>


   <Form.Group controlId="formGridAddress1" >
    <Form.Label>Account Address</Form.Label>
    <Form.Control placeholder={accountObject.web3Account} disabled/>
  </Form.Group>
  <p>

  </p>
  
  
    <Form.Row>
 
  
      <Form.Group as={Col} controlId="formGridState" >
        <Form.Label>Designation</Form.Label>
        <Form.Control as="select" defaultValue="School" onChange={(e) => onDropDownSelect(e)}>
         <option value="School">School</option>
          <option value="Student">Student</option>
          
        </Form.Control>
      </Form.Group>
  
      
    </Form.Row>

    <Form.Group controlId="formGridAddress1" hidden={!isStudent}>
    <Form.Label>School Address</Form.Label>
    <Form.Control placeholder="Your School Address" onChange={(e) => handleSchoolEntry(e)}/>
  </Form.Group>
  

  
  <a onClick={()=>onSubmitNew()} > Submit</a>
  <p>

  </p>
  {isStudent ? <Link to='/student-dash' >Continue</Link> : <Link to='/school-dash' >Continue</Link> }
  
  <p>{statusRegistration}</p>
  </Form>
    </div> );

}
 
export default LoginForm;