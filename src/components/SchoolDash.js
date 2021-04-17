import {Jumbotron, Container,Card, CardColumns, Button, Row,Col, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useDropzone} from 'react-dropzone';



const SchoolDash = () => {
    return ( <div className="schooldashcontainer">
 <Jumbotron fluid>
  <Container>
    <h1>School Dashboard</h1>
    <p>
     Account Info:
    
    </p>

  </Container>
</Jumbotron>

<Row>
    <Col><h2>
    Your Students:
</h2></Col>
    <Col><Button variant="outline-dark">Refresh</Button></Col>
</Row>
<p>

</p>
<p>

</p>

<CardColumns>
<Card style={{ width: '18rem' , letterSpacing:'1px' }}>
  <Card.Body>
    <Card.Title>Student Name</Card.Title>
    
   
    
    
  </Card.Body>
</Card>


</CardColumns>


<h2>
    Upload Student Credentials:
</h2>
<Form.Group controlId="formGridAddress1">
    <Form.Label>StudentAddress</Form.Label>
    <Form.Control placeholder="Student Address" />
  </Form.Group>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Description</Form.Label>
    <Form.Control placeholder="Description" />
  </Form.Group>


<Basic />

<Col><Button variant="outline-dark">Upload</Button></Col>

<p></p>
<p></p>
<p></p>



    </div> );
}
 
export default SchoolDash;


function Basic(props) {
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    
    const files = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
  
    return (
      <section className="container" >
        <div {...getRootProps({className: 'dropzone'})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
        <p></p>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </section>
    );
  }
  