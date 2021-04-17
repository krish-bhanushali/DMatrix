import {Jumbotron, Container,Card, CardColumns, Button, Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useDropzone} from 'react-dropzone';




const StudentDash = () => {
    return ( <div className="studentdashcontainer">
        <Jumbotron fluid>
  <Container>
    <h1>Student Dashboard</h1>
    <p>
     Account Info:
    
    </p>
    <p>
    School Info:
    </p>
  </Container>
</Jumbotron>



<Row>
    <Col><h2>
    Your Files:
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
    <Card.Title>File Name</Card.Title>
    
   
    <Card.Link href="#">Open File</Card.Link>
    
  </Card.Body>
</Card>

<Card style={{ width: '18rem' , letterSpacing:'1px' }}>
  <Card.Body>
    <Card.Title>File Name</Card.Title>
    
   
    <Card.Link href="#">Open File</Card.Link>
    
  </Card.Body>
</Card>

<Card style={{ width: '18rem' , letterSpacing:'1px' }}>
  <Card.Body>
    <Card.Title>File Name</Card.Title>
    
   
    <Card.Link href="#">Open File</Card.Link>
    
  </Card.Body>
</Card>

<Card style={{ width: '18rem' , letterSpacing:'1px' }}>
  <Card.Body>
    <Card.Title>File Name</Card.Title>
    
   
    <Card.Link href="#">Open File</Card.Link>
    
  </Card.Body>
</Card>

<Card style={{ width: '18rem' , letterSpacing:'1px' }}>
  <Card.Body>
    <Card.Title>File Name</Card.Title>
    
   
    <Card.Link href="#">Open File</Card.Link>
    
  </Card.Body>
</Card>

</CardColumns>



<p>

</p>
<p>

</p>

<h2>
    Upload your Credentials:
</h2>

<Basic />

<Col><Button variant="outline-dark">Upload</Button></Col>

<p></p>
<p></p>
<p></p>
    </div> );
}
 
export default StudentDash;

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
  