import React, { useState,useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { updateInfo,checkprofile } from '../../actions/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../css/profile.css' 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const initialState={
  newname:'',
  newemail:'',
  newphone:'',
  newzip:'',
  newpassword:'',
};

const Profile = ({truename,email,phone,zip,password,updateInfo,checkprofile}) => {

    const [formData, setFormData] = useState(initialState);
    var emailWarn;
    var phoneWarn;
    var zipWarn,nameWarn
    useEffect(() => {
      emailWarn=document.getElementById("emailWarn");
      phoneWarn=document.getElementById("phoneWarn");
      zipWarn=document.getElementById("zipWarn");
      nameWarn=document.getElementById("nameWarn");

      emailWarn.style.display="none";
      phoneWarn.style.display="none";
      zipWarn.style.display="none";
      nameWarn.style.display="none";
      console.log(window.localStorage.name)
      checkprofile(window.localStorage.name)
        const profileData = { ...initialState };
        profileData[newname]=truename;
        profileData[newemail]=email;
        profileData[newphone]=phone;
        profileData[newzip]=zip;
        setFormData(profileData);

      
    }, []);

    const {
      newname,
      newemail,
      newphone,
      newzip,
      newpassword
    } = formData;    

    const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if(handleValidation()){
      updateInfo(newname,newemail,newphone,newzip,newpassword);
      const profileData = { ...initialState };
      profileData[newname]=truename;
      profileData[newemail]=email;
      profileData[newphone]=phone;
      profileData[newzip]=zip;
      setFormData(profileData);
    }

  };
  console.log(emailWarn)
  const handleValidation=(e)=>{
    let errors={};
    let formIsValid=true;

    var namePat=/^[a-zA-Z]+[a-zA-Z0-9]$/;
    if(newname.length!=0&&!namePat.test(newname)){
      nameWarn.style.display="inline";
      formIsValid=false;
    }
    
    var emailPat=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if(newemail.length!=0&&!emailPat.test(newemail)){
      document.getElementById("emailWarn").style.display="inline";
        formIsValid=false;
    }else{
      document.getElementById("emailWarn").style.display="none";

    }

    var phonePat=/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/
    if(newphone.length!=0&&!phonePat.test(newphone)){
      document.getElementById("phoneWarn").style.display="inline";
        formIsValid=false;
    }else{
      document.getElementById("phoneWarn").style.display="none";
    }

    var zipPat=/^[0-9]{5}$/
    if(newzip.length!=0&&!zipPat.test(newzip)){
      document.getElementById("zipWarn").style.display="inline";
        formIsValid=false;
    }else{
      document.getElementById("zipWarn").style.display="none";

    }



    return formIsValid;




  }



  return(  <section className='whole'>
        <a  style={{float:'left'}} href="../main">  Main Page</a>
        <div className='photo'>
            <div className='imgs'>
                <img className='perimgage' src="https://p.qqan.com/up/2021-2/16137992352635419.jpg"  alt=""></img>
            </div>
            <input type="file" id="myFile" name="filename"/>
{/*             

            <button >Upload new picture</button> */}
        </div>
        





        <div className='curInfo'>
            <h1>Current Info</h1>
            <br/>
            <div className='spans'>Name: {truename}</div>
            <br/>
            <div  className='spans'>Email: {email}</div>
            <br/>
            <div  className='spans'>Phone: {phone}</div>
            <br/>
            <div  className='spans'>zip: {zip}</div>
            <br/>
            <div  className='spans'>password: ******</div>

            {/* upload a new profile picture, opens file picker, but does not perform upload*/}

        </div>

        <div className='logo'>

          <img className='logo' style={{height:"200"}} src="https://revenuearchitects.com/wp-content/uploads/2017/02/Blog_pic-450x255.png"  alt=""></img>
        </div>
        <div className='update'>
        <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
        <span id="nameWarn" style={{color:"red"}}>Please check your name</span>
        <br/>
        <Form.Label style={{float:'left'}} >Name :</Form.Label>
        <Form.Control type="name" placeholder="Enter name"
            name="newname"
            value={newname}
            onChange={onChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <span id="emailWarn" style={{color:"red"}}>Please check your email</span>
          <br/>
        <Form.Label style={{float:'left'}} >Email :</Form.Label>
        <Form.Control  placeholder="Enter email" name="newemail"
            value={newemail}
            onChange={onChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
      <span id="phoneWarn" style={{color:"red"}}>Please check your phone number</span>
        <br/>        
        <Form.Label style={{float:'left'}} >Phone :</Form.Label>
        <Form.Control type="phone" placeholder="Enter phone" name="newphone"
            value={newphone}
            onChange={onChange} />
      </Form.Group>
      <Form.Group className="mb-3">
      <span id="zipWarn" style={{color:"red"}} >Please check your zip number</span>
        <br/>
        <Form.Label style={{float:'left'}} >Zip :</Form.Label>
        <Form.Control type="zip" placeholder="Enter zip" name="newzip"
            value={newzip}
            onChange={onChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{float:'left'}} >Password :</Form.Label>
        <Form.Control type="password" placeholder="Password" name="newpassword"
            value={newpassword}
            onChange={onChange} />
      </Form.Group>
      <Button variant="primary" type="submit">

        Submit
      </Button>
    </Form>
        </div>


    </section>)
  };
  
  Profile.propTypes = {
    updateInfo: PropTypes.func.isRequired,
    checkprofile: PropTypes.func.isRequired,
    truename:PropTypes.string,
    email:PropTypes.string,
    phone:PropTypes.string,
    zip:PropTypes.string
  };
  
  const mapStateToProps = (state) => ({

    truename:state.truename,
    email:state.email,
    phone:state.phone,
    zip:state.zip,

  });
  
  
  export default connect(mapStateToProps,{ updateInfo,checkprofile })(Profile);