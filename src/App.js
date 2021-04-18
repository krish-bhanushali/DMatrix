import React,{ useRef, useEffect, useState } from "react";
import "./App.scss";

import Header from "./components/Header";
import LoginForm from "./components/Login";
import StudentDash from "./components/StudentDash"
import SchoolDash from "./components/SchoolDash"

import {DNEXUS_USERCONTRACT_DEPLOY_ADDRESS,DNEXUS_FILECONTRACT_DEPLOY_ADDRESS,DNEXUS_SCHOOLCONTRACT_DEPLOY_ADDRESS} from './repository/address';
import {DNEXUS_FILECONTRACT_ABI} from './repository/fileContract';
import {DNEXUS_SCHOOLCONTRACT_ABI} from './repository/schoolContract';
import {DNEXUS_USERCONTRACT_ABI} from './repository/userContract';
import blockChainLogo from './images/dLogo.png';
import {Row,Col} from 'react-bootstrap';

import Web3 from 'web3';



import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
 let web3 = new Web3("ws://localhost:7545");
 const [userContract,setUserContract] = useState();
 const [fileContract,setFileContract] = useState();
 const [schoolContract,setSchoolContract] = useState();

 const [web3objectDetails,setWeb3Object] = useState({
   web3Account : "",
   web3AccountNetworkId: ""
 });

 useEffect(() =>  {
   
 loadWeb3();
 },[]);

 async function loadWeb3 (){
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
  
  await loadBlockchainData() 
  let userContract = new web3.eth.Contract(DNEXUS_USERCONTRACT_ABI, DNEXUS_USERCONTRACT_DEPLOY_ADDRESS);
  setUserContract(userContract);
  console.log(userContract);

  let fileContract = new web3.eth.Contract(DNEXUS_FILECONTRACT_ABI, DNEXUS_FILECONTRACT_DEPLOY_ADDRESS);
  setFileContract(fileContract);
  console.log(fileContract);

  let schoolContract = new web3.eth.Contract(DNEXUS_SCHOOLCONTRACT_ABI, DNEXUS_SCHOOLCONTRACT_DEPLOY_ADDRESS);
  setSchoolContract(schoolContract);
  console.log(schoolContract);
  console.log('file and user contract and school contract')



 }
  
 async function loadBlockchainData() {
  const web3 = window.web3;
  // Load account
  const accounts = await web3.eth.getAccounts();
  console.log(accounts[0]);
  const networkId = await web3.eth.net.getId();
  console.log(networkId);
  setWeb3Object({
    web3Account: accounts[0],
    web3AccountNetworkId : networkId
  })

 
 }


  return (
    <Router>
      <div className="App">
        <Header accountObject={web3objectDetails}/>
        <div className="container">
          <div className="wrapper">
            <div className="home">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/opportunities" component={Opportunities} />
                <Route exact path="/solutions" component={Solutions} />
                <Route exact path="/contact-us" component={Contact} />
                <Route exact path="/Login" render={(props) => <LoginForm accountObject={web3objectDetails} web3Object ={web3} schoolContract={schoolContract}/>} />
                <Route exact path="/account-info" component={AccountInfo} />
                <Route exact path="/student-dash" render={(props) => <StudentDash accountObject={web3objectDetails} web3Object ={web3} userContract={userContract} fileContract={fileContract}/>} />
                <Route exact path="/school-dash"  render={(props) => <SchoolDash accountObject={web3objectDetails} web3Object ={web3} userContract={userContract} fileContract={fileContract} schoolContract={schoolContract}/>} />

              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

function Opportunities() {
  return <p>Discover our numerous opportunities</p>;
}

function AccountInfo() {
  return <p>Info Of Your Account</p>;
}

function Solutions() {
  return <p>Solutions that help you.</p>;
}

function Contact() {
  return <p>Feel free to reach us.</p>;
}

function Home() {
  return (
    <div className="container">
      <div className="wrapper">
     
       
         
          <h5>The <b>DMatrix</b>, is a creative software driven by the power of blockchain to securely store your data
       
       <div className="dLogo">
       <img src={blockChainLogo} width="400px" alt=""></img>
       </div>
       </h5>
        
       
       
      </div>
    </div>
  );
}
export default App;
