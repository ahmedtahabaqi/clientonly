import React from "react";
import Context from "./context.js";
import { Avatar, Table, IconButton,  toaster } from "evergreen-ui";
import Cookies from 'universal-cookie';
import axios from  'axios';
import PDFIcon from '../assets/pdf.svg';
import FileIcon from '../assets/file.svg';
import videoIcon from '../assets/video-file.svg';
const cookies = new Cookies();



class Trash extends React.Component {
  constructor(){
    super();
    this.state={
      TrashFiles:[],
    }


  }


  componentDidMount(){
    fetch(`/api/files/bin/`, {
      credentials: "same-origin",
      headers: {
          'token': cookies.get('token')
      }
  
  })
  .then((response) => {
  
      if (response.status == 200) {
          return response.json()
      }
  
  })
  .then((data) => {
  

  
    this.setState({
      TrashFiles:data,
    })

  })
  }
  DeleteFile(value) {
    var headers = {
      'Content-Type': 'application/json',
      'token': cookies.get('token')
    }
    axios({
        url: `/api/files/bin/` + value,
        method: "delete",
        headers: headers
      }) .then(function (response) {
        if (response.status == 200) {
          toaster.success(
            'file has been Delete Successfully'
          )
        }
      }).catch(function (error) {
        console.log(error.request)
        console.log(error.config);
      });
    this.componentDidMount()

  }
  RecoveryFromTrash(value){
    var headers = {
      'Content-Type': 'application/json',
      'token': cookies.get('token') 
  }


    axios({
            url: `/api/files/bin/`+value,
            method: "POST",
            headers: headers
        })

        .then(function (response) {
            if (response.status == 200) {
                toaster.success(
                    'file has been  Recovery Successfully'
                )
                
                
                setTimeout(function () {
                    // window.location.href = '/'
                }, 500);
            }
        }).catch(function (error) {
          console.log(error.request)

            // if (error.response.data.details[0].message) {
            //     toaster.danger(
            //         error.response.data.details[0].message
            //     )
            // } else if (error.request) {
            //     console.log(error.request);
            // } else {

            //     console.log('Error', error.message);
            // }
            console.log(error.config);
        });
  //       this.componentDidMount()
        console.log(value)
  }

  render() {
    return (
      <Context.Consumer>
        {ctx => {
          return (
            <React.Fragment>
              <div className="trashcontiner">
                <Table>
                  <Table.Head>
                    <Table.TextCell
                      flexBasis={65}
                      flexShrink={0}
                      flexGrow={0}
                    />
                    <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Uploaded At</Table.TextHeaderCell>
                    <Table.TextHeaderCell>File Size</Table.TextHeaderCell>
                    <Table.TextCell
                      flexBasis={110}
                      flexShrink={0}
                      flexGrow={0}
                    />
                  </Table.Head>
                  <Table.Body height={520}>
                    {this.state.TrashFiles.map(file => (
                      <Table.Row
                        key={file._id}
                        // isSelectable
                        // onSelect={() => alert(item.name)}
                      >
                        <Table.TextCell
                          flexBasis={65}
                          flexShrink={0}
                          flexGrow={0}
                        >
                        <img id="img"   src={videoIcon} alt="Paris" style={file.type == 'video' ? { } : {display: 'none' }}/>
                        <img id="img"   src={FileIcon} alt="Paris" style={file.type == 'application/pdf' ||file.type == 'image'||file.type == 'video'? { display: 'none' } : {}}/>
                          <img id="img"   src={PDFIcon} alt="Paris" style={file.type == 'application/pdf' ? {  } : {display: 'none'}}/>
                        <img id="img"   src={file.type == 'image'  ? `http://localhost:5000/`+file.FilePath : PDFIcon}  alt="Paris" style={file.type == 'image' ? {  } : {display: 'none'}}/>
                        </Table.TextCell>
                        <Table.TextCell>{file.name}</Table.TextCell>
                        <Table.TextCell>{file.uptime}</Table.TextCell>
                        <Table.TextCell>{(file.size/1000000).toFixed(3)} MB</Table.TextCell>
                        <Table.TextCell
                          flexBasis={55}
                          flexShrink={0}
                          flexGrow={0}
                        >
                          <IconButton icon="redo" intent="success"                           
                          onClick={()=>{
                          this.RecoveryFromTrash(file._id)
                         }}/>
                        </Table.TextCell>
                        <Table.TextCell
                          flexBasis={55}
                          flexShrink={0}
                          flexGrow={0}
                        >
                          <IconButton icon="trash" intent="danger"                           
                          onClick={()=>{
                          this.DeleteFile(file._id)
                         }}/>
                        </Table.TextCell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </React.Fragment>
          );
        }}
      </Context.Consumer>
    );
  }
}
export default Trash;
