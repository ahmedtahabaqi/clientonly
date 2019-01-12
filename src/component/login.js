import React from 'react'
import styled from 'styled-components'
import Context from './context'
import { Button, CornerDialog,toaster ,TextInput} from 'evergreen-ui';
import login from '../assets/img/login.png';
import loginlogo from '../assets/img/loginlogo.svg';
import axios from  'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

let Background=styled.img`
width:65%;
height:100%;
left:0px;
bottom:0px;
right:0px;
position:absolute;
padding:0px;
margin:0px;
margin-left:35%;
z-index:1; 
`






let Container=styled.div`
padding:0px 13.5%;
margin-top:6em;


`

let Form=styled.div`

position:absolute;width:auto;
max-width:650px;
height:100%;
background-color:white;
top:0px;
left:0px;
bottom:0px;
z-index:10;

background-color: #8aafed;
`



let TextCon=styled.div`
width:100%;
text-align:center;
padding-bottom:4em 
`
let Text=styled.span`
font-family: 'Noto Sans', sans-serif;
font-size:35px;
color:#ffff;
`
let ButtonCon=styled.div`
width:100%;
display:flex;
align-items:center;
justify-content:center
`

let RegistCon=styled.div`
width:100%;
text-align:center;
padding-bottom:4em;
font-family: 'Noto Sans', sans-serif;
display:flex;
padding-top:5em
`
let RegistTxt=styled.div`
font-size:20px;
color:#ffff 
margin-left: 67px;
`
let RegistWrd=styled.span`
font-weight:bolder;
cursor:pointer;
padding-left:8px;
color:#3496d7;
font-size: 20px;
color: #000;

`
let Logo=styled.img`
width: 458px;
margin-top: -57px;
margin-left: 30px;
`


class Login extends React.Component {
    constructor() {
        super()
        this.state ={
            Email:"",
            Password:"",
            redirectToReferrer: true
        }
    }
    onChangeEmail(value){
        this.setState({
          Email: value
        })
      }
      onChangePassword(value){
        this.setState({
          Password: value
        })
      }
 


    render() {
        return (
            <Context.Consumer>
                {(ctx) => {
                    return <div>

<Background src={login}/> 

    <Form >
        <Container>
            <TextCon>
            <Logo  src={loginlogo} />
                <Text>LOGIN</Text>
            </TextCon>
           
                
                <TextInput height={50} width={500} marginBottom={30} type="email" value={this.state.Email} onChange={(event)=>{
                               this.onChangeEmail(event.target.value)
                            }} placeholder="  Email"/>
         
          
                
                <TextInput height={50} width={500} marginBottom={30}  type="password" value={this.state.Password} onChange={(event)=>{
                               this.onChangePassword(event.target.value)
                            }} placeholder="  Password"/>
          
            <ButtonCon>
              
                <Button appearance="primary" intent="primary" iconBefore="confirm" height={50} onClick={(event) =>
                     { 

                        axios.post('/api/user/login', {
                                 email:this.state.Email,
                           password:this.state.Password
                          })
                          .then(function (response) {
                              
                               
                             
  cookies.set('token', response.data, { path: '/', expires: new Date(Date.now()+604800000)});                              
                            
                            window.location.href='/' 
                          })
                          .catch(function (error) {
                            if (error.response) {
                            
                                toaster.danger(
                                    'please check your email address and password and try again '
                                  )
                           
                              
                            } 
                          });
                         }
                        }>LOGIN</Button>
            </ButtonCon>
            <RegistCon >
                <RegistTxt >You don't have account? <RegistWrd onClick={()=>{
                                           window.location.href='/register' 
                                    }}>Register</RegistWrd></RegistTxt>
            </RegistCon>
        </Container>
    </Form>
                        </div>
                }}
            </Context.Consumer>
        )
    }
}

export default Login;