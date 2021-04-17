import {Form,Col,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useEffect, useState } from "react";


const LoginForm = () => {
    
    const [isStudent,setIsStudent] = useState(false);
    const onSubmit = () => {

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
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>
 
     
    </Form.Row>
  
    <Form.Row>
    <Col>
      <Form.Control placeholder="First name" />
    </Col>
    <Col>
      <Form.Control placeholder="Last name" />
    </Col>
  </Form.Row>
   <p>

   </p>


   <Form.Group controlId="formGridAddress1">
    <Form.Label>Account Address</Form.Label>
    <Form.Control placeholder="Your Matrix Address" />
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
    <Form.Control placeholder="Your School Address" />
  </Form.Group>
  

  
    <Button  variant="primary" type="submit">
      Submit
    </Button>
  </Form>
    </div> );

}
 
export default LoginForm;