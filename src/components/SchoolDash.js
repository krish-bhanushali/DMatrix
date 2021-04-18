import {Jumbotron, Container,Card, CardColumns, Button, Row,Col, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './schoolDash.css';
import {useDropzone} from 'react-dropzone';
import { useRef, useEffect, useState } from "react";
const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io',  port: 5001,protocol: 'https' });

const SchoolDash = ({accountObject,web3Object,userContract,fileContract,schoolContract}) => {
  let web3 = web3Object;
  const [email,setEmail] = useState('');
  const [fName,setFName] = useState('');
  const [lName,setLName] = useState('');
  const [destination,setDest] = useState('');
  const [studentCount,updateStudentCount] = useState(0);
  const [fileUploadStatus,setUploadStatus] = useState('File Not selected');
  const [studentMap,setStudentMap] = useState({data : [{
    name:"Demo Student",
    studentAccount:"Demo"
  }]});
  const [studentAddressInput,setStudentAddress] = useState('');
  const [studentDescriptionInput,setDescription] = useState('');
  

  useEffect(() => {

    getUserData();
    getSchoolData();

  
},[]);
  
async function handleFileInput(e){
  console.log('here')
   
  const file = e.target.files[0];
  setUploadStatus('Got your file');
  let reader = new window.FileReader();
  reader.readAsArrayBuffer(file)
  setUploadStatus('Reading your file');
  reader.onloadend = function() {
     // Connect to IPFS
    setUploadStatus('Connecting to IPFS');
    const buf = Buffer.from(reader.result) // Convert data into buffer
     ipfs.add(buf, async function(err, result) { // Upload buffer to IPFS
    if(err) {
      console.error(err)
      return
    }
    setUploadStatus('File uploadeded');
    let url = `https://ipfs.io/ipfs/${result[0].hash}`

   // await fileContract.uploadFileFunction(result[0].hash,'your file',myAddress);
   var data = await fileContract.methods.fileTransfer(studentAddressInput,result[0].hash,studentDescriptionInput).send(
        {from:accountObject.web3Account, gas: 300000}
      );
      setUploadStatus('Your account updated, Please Refresj to see the files and select to upload another');
    console.log(result[0].hash);
    console.log('File hash submitted');
    console.log(`Url --> ${url}`)
    // document.getElementById("url").innerHTML= url
    // document.getElementById("url").href= url
    // document.getElementById("output").src = url
    })
  }
}
  async function getUserData() {
    
    console.log(userContract);
    var data = await userContract.methods.getData(accountObject.web3Account).call();
    console.log(data);
    setEmail(data["3"]);
    setFName(data["1"]);
    setLName(data["2"]);
    setDest(data["4"]);
    

  }

  const handleAddressInputEntry = (e) => {
    setStudentAddress(e.target.value);
    console.log(studentAddressInput);

  }
  const handleDescriptionEntry = (e) => {
    setDescription(e.target.value);
    console.log(studentDescriptionInput);

  }

  async function getSchoolData(){
    console.log(schoolContract);
    var data = await schoolContract.methods.studentCount(accountObject.web3Account).call();
    console.log(data);
    updateStudentCount(data);
  }

  async function getStudentList(){
    console.log(schoolContract);
    let oldStudent = studentMap.data;
    var data = await schoolContract.methods.getStudents(accountObject.web3Account).call();
    console.log(data);
    for(var i =0;i<data.length;i++){
      var dataStudentName = await schoolContract.methods.getStudent(data[i]).call();

      oldStudent.push({
        name:dataStudentName,
        studentAccount:data[i]
      })
      console.log(dataStudentName);
    }
    setStudentMap({data:oldStudent});
 

  }


    return ( <div className="schooldashcontainer">
 <Jumbotron fluid className="cont">

  <Container>
    <h1  className="title">School Dashboard</h1>
    <p className="para">
     Account Address: {accountObject.web3Account}

    
    </p>
    <p className="para">
      Email Address : {email}
    </p>
    <p className="para">Hello {destination}!! {fName} {lName}</p>
  </Container>
</Jumbotron>

<Row>
    <Col><h2>
    Your Students:{studentCount}
</h2></Col>
<Col><a onClick={(e)=>getStudentList()} className="button">Refresh</a></Col>
</Row>
<p>

</p>
<p>

</p>

<MapComponent Mapdata={studentMap}/>


<h2 className="title1" style={{marginBottom:'30px'}}>
    Upload Student Credentials:
</h2>
<Form.Group controlId="formGridAddress1">
    <Form.Label>StudentAddress</Form.Label>
    <Form.Control placeholder="Student Address" onChange={(e) => handleAddressInputEntry(e)}/>
  </Form.Group>

  <Form.Group controlId="formGridAddress2">
    <Form.Label>Description</Form.Label>
    <Form.Control placeholder="Description" onChange={(e) => handleDescriptionEntry(e)}/>
  </Form.Group>



  <div className="mb-3">
    <Form.File id="formcheck-api-regular">
      <Form.File.Label>Regular file input</Form.File.Label>
      <Form.File.Input onChange={(e) => handleFileInput(e)}/>
    </Form.File>
  </div>
<p style={{letterSpacing:"1px"}}>Just Select your file and it will be uploaded</p>
<p style={{letterSpacing:"1px"}}>Upload Status:{fileUploadStatus}</p>


<p></p>
<p></p>
<p></p>

<p></p>
<p></p>
<p></p>



    </div> );
}
 
export default SchoolDash;


  const MapComponent = ({Mapdata}) => {
    return ( <CardColumns>
      {
        Mapdata["data"].map(el=>(
          <div className="cardColumnFile" key={el.name}>
      <Card style={{  width: '28rem' , letterSpacing:'1px'  }}>
        <Card.Body>
          <Card.Title style={{textAlign:'center', fontStyle:'italic', color:'lightgrey'}}>{el.name}</Card.Title>
          <Card.Subtitle style={{textAlign:'center', fontStyle:'italic', color:'lightgrey'}}>{el.studentAccount}</Card.Subtitle>
           
              
        </Card.Body>
      </Card>
      
          </div>
        ))
      }
      </CardColumns> );
  }