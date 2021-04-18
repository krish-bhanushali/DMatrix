/* eslint-disable no-loop-func */
import {Jumbotron, Container,Card, CardColumns, Button, Row,Col,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useDropzone} from 'react-dropzone';
import { useRef, useEffect, useState } from "react";
import {DNEXUS_USERCONTRACT_ABI} from '../repository/userContract';
import {DNEXUS_USERCONTRACT_DEPLOY_ADDRESS} from '../repository/address';
const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io',  port: 5001,protocol: 'https' });

const StudentDash = ({accountObject,web3Object,userContract,fileContract}) => {

  let web3 = web3Object;
  const [email,setEmail] = useState('');
  const [fName,setFName] = useState('');
  const [lName,setLName] = useState('');
  const [destination,setDest] = useState('');
  const [fileMap,setMap] = useState({data : [{
    name:"Secure File (Demo)",
    fileHash:"Demo"
   
  }]});
  const [fileUploadStatus,setUploadStatus] = useState('File Not selected');

  useEffect(() => {

      getUserData();
  
    
  },[]);
  


  async function getUserData() {
    
    console.log(userContract);
    var data = await userContract.methods.getData(accountObject.web3Account).call();
    console.log(data);
    setEmail(data["3"]);
    setFName(data["1"]);
    setLName(data["2"]);
    setDest(data["4"]);
    

  }


  async function getFilesRefresh(){
    console.log(fileContract);
    

   let oldFile = fileMap.data;
  //  var data = await fileContract.methods.getFile(accountObject.web3Account,1).call({from:accountObject.web3Account});
    try{
      for(var i=0;i<10;i++){
        var data = await fileContract.methods.getFile(accountObject.web3Account,i).call();
        console.log('done');
        if(data===null || data===''){
          console.log('NO DATA AT:'+i)
        }
        else{
          console.log(data);
          // let oldfileData = fileMap;
        
          // oldfileData["data"].push({
          //   name:"Secure File:"+i,
          //   fileHash:data
          // })
          oldFile.push({
            name:"Secure File:"+i,
            fileHash:data,
            
          })
           
          

          
        }
        
        setMap({data:oldFile});
       }
    }catch(e){
      console.log(e);
      console.log('no more files');
    }
   
   
  }


  


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
     var data = await fileContract.methods.uploadFile(result[0].hash,'studentFile').send(
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



    return ( <div className="studentdashcontainer">
        <Jumbotron fluid className="cont">
  <Container>
    <h1 className="title">Student Dashboard</h1>
    <p className="para">
     Account Address: {accountObject.web3Account}

    
    </p>
    <p className="para">
      Email Address : {email}
    </p>
    <p className="para">Hello !! {fName} {lName}</p>
  </Container>
</Jumbotron>



<Row>
    <Col><h2>
    Your Files:
</h2></Col>
    {/* // eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <Col><a onClick={(e)=>getFilesRefresh()} className="button">Refresh</a></Col>
</Row>
<p>

</p>
<p>

</p>
<MapComponent Mapdata={fileMap}/>




<p>

</p>
<p>

</p>

<h2 className="title1" style={{marginBottom:'30px'}}>
    Upload your Credentials:
</h2>

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
    </div> );
}
 
export default StudentDash;

  

  const MapComponent = ({Mapdata}) => {
    return ( <CardColumns>
      {
        Mapdata["data"].map(el=>(
          <div className="cardColumnFile" key={el.name}>
      <Card style={{ width: '18rem' , letterSpacing:'1px' }}>
        <Card.Body>
          <Card.Title style={{textAlign:'center', fontStyle:'italic', color:'lightgrey'}}>{el.name}</Card.Title>
        
          <Card.Link href={"https://ipfs.io/ipfs/"+el.fileHash} target="_blank" style={{textAlign:'center', fontStyle:'italic', color:'blue'}}>Open File</Card.Link>
          
        </Card.Body>
      </Card>
      
          </div>
        ))
      }
      </CardColumns> );
  }
   
