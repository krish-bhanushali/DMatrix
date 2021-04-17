import React,{ useRef, useEffect, useState } from "react";
import "./App.scss";

import Header from "./components/Header";
import LoginForm from "./components/Login";
import StudentDash from "./components/StudentDash"
import SchoolDash from "./components/SchoolDash"

import Web3 from 'web3';



import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
 

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
                <Route exact path="/Login" render={(props) => <LoginForm accountObject={web3objectDetails}/>} />
                <Route exact path="/account-info" component={AccountInfo} />
                <Route exact path="/student-dash" component={StudentDash} />
                <Route exact path="/school-dash" component={SchoolDash} />

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
        <h5>
          The <b>DMatrix</b>, is a creative software driven by the power of blockchain to securely store your data
        </h5>
      </div>
    </div>
  );
}
export default App;
