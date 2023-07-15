import {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function SignUp(){
    const Navigate = useNavigate();
    const [OTP,enterOTP] = useState(false);
    const [verify,setOTP] = useState('');
    const [verified,setVerified] = useState(false);
    const [sign,setDetails] = useState({
      name:"",
      email:"",
      pass:"",
    });
    const generate = (err)=>{
      console.log(err);
      if(err ==="Email is Required"){
        document.getElementById('emailred').innerHTML = err;
      }
    }
    const handleSubmit = async(event)=>{
      event.preventDefault();
      document.getElementById('userred').innerHTML ="";
      document.getElementById('emailred').innerHTML ="";
      if(verified){
        const {data} = await axios.post('http://localhost:3001/create',{...sign});
        if(data.status === "Registered"){
          Navigate('/login');
        }
      }else{
        if(OTP){
          document.getElementById('otpred').innerHTML="";
          console.log({...sign,otp:verify});
          const {data} = await axios.post('http://localhost:3001/verifyotp',{...sign,otp:verify});
          if(data.status==="Invalid OTP"){
            setVerified(false);
            document.getElementById('otpred').innerHTML = "Invalid OTP";
          }
          else if(data.status==="Verified"){
            setVerified(true);
            document.getElementById('verify').innerHTML = "Verified";
            document.getElementById('verify').classList.add("disabled");
          }
        }else{
          try{
            let goahead = true;
            if(sign.email === ""){
              document.getElementById('emailred').innerHTML = "Email is Required";
              goahead=false;
            }
            if(sign.name === ""){
              document.getElementById('userred').innerHTML = "Username is Required";
              goahead=false;
            }
            if(goahead){
              const {data}= await axios.post("http://localhost:3001/signup",{...sign});
              if(data){
                if(data.errors){
                  const {email} = data.errors;
                  if(email) generate(email);
                }
              }
              if(data){
                document.getElementById('otpgen').innerHTML="Generating<div class='ms-2 spinner-border spinner-border-sm' role='status'><span class='visually-hidden'>Loading...</span></div>";
                if(data.status === "ok"){
                  const {data} = await axios.post("http://localhost:3001/otp",{...sign});
                  if(data.status === "OTP Generated"){
                    enterOTP(true);
                    document.getElementById('otpred').innerHTML = "";
                  }
                  else if(data.error === "OTP already sent..."){
                    enterOTP(true);
                    document.getElementById('otpgen').innerHTML="Generate OTP";
                  }
                  else if(data.error === "Failed to Generate OTP"){
                    enterOTP(false);
                    document.getElementById('otpgen').innerHTML="Generate OTP";
                  }
                }
              }
            }
          }catch(err){
            console.log(err);
          }
        }
      }
    }
    return (
    <>
    <div className="container-fluid ps-4 pe-4 pb-4 log-welcome">
        <center>
            <h1 className="p-4"><span style={{color:"rgb(0,128,0)"}}>Sign Up</span> for Free</h1>
            <p className="fw-light">Enter the Following Details to Create an Account</p>
        </center>
        <center>
            <form className="col-md-5 card rounded border p-4" onSubmit={(e)=>{handleSubmit(e)}}>
                <label className="fw-bold mt-2">Enter Username :</label>
                <input type="text" className="form-control" name="name" placeholder="Enter Username..." onChange={(e)=>setDetails({...sign,name:e.target.value})}/>
                <p id="userred" className="text-danger d-flex fs-6 fw-light m-0"></p>
                <label className="fw-bold">Enter Email :</label>
                <input type="email" className="form-control" name="email" placeholder="Enter E-mail..." onChange={(e)=>setDetails({...sign,email:e.target.value})}/>
                <p id="emailred" className="text-danger d-flex fs-6 fw-light m-0"></p>
                <div className="d-flex justify-content-end pb-2">
                    <Link className="text-success link-underline link-underline-opacity-0 fw-lighter" to="/login">Already have an Account?</Link>
                </div>
                {
                  OTP?
                  <div className="card rounded border p-4">
                    <label className="fw-bold pb-2">Verify OTP :</label>
                    <input type="text" className="form-control" name="otp" placeholder="Enter 6-digit OTP" onChange={(e)=>{setOTP(e.target.value)}}/>
                  <div className="d-flex justify-content-end p-3">
                    <p className="fw-light" id="otpred"></p>
                    <button id="verify" className="btn btn-success fw-bold col-3" type="submit">Verify</button>
                  </div>
                  </div>
                  :
                  <div className="d-flex justify-content-end">
                    <button id="otpgen" className="btn btn-success bg-gradient" type="submit">Generate OTP</button>
                  </div>
                }
                {
                  verified?
                  <>
                  <label className="mt-2 fw-bold">Enter Password:</label>
                  <input type="password" className="form-control" name="name" placeholder="Enter Password..." onChange={(e)=>setDetails({...sign,pass:e.target.value})}/>
                  <button className="mt-3 btn btn-success bg-gradient" type="submit">Create Account</button>
                  </>
                :<></>
                }
            </form>
        </center>
    </div>
    </>
    );
}