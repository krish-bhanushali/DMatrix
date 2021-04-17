import React from "react";
import "./App.scss";

import Header from "./components/Header";
import LoginForm from "./components/Login";
import StudentDash from "./components/StudentDash"
import SchoolDash from "./components/SchoolDash"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <div className="wrapper">
            <div className="home">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/opportunities" component={Opportunities} />
                <Route exact path="/solutions" component={Solutions} />
                <Route exact path="/contact-us" component={Contact} />
                <Route exact path="/Login" component={LoginForm} />
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
