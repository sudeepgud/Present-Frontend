import {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Login(){
    const Navigate = useNavigate();
    const [log,setLog] = useState({
        email:"",
        pass:""
    });
    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const {data} = await axios.post(process.env.REACT_APP_BACKEND_URL+'/login',{...log})
            if(data.email){
                document.getElementById('emailred').innerHTML = data.email;
            }
            if(data.pass){
                document.getElementById('passred').innerHTML = data.pass;
            }
            if(data.status === "Login"){
                let {token} = data;
                localStorage.setItem('jwt',token);
                Navigate('/');
                window.location.reload(false);
            }
        }catch(err){
            console.log(err);
        }
    }
    return( 
    <>
    <div className="container-fluid">
        <div className="row justify-content-evenly log-welcome rounded">
            <div className="col-4">
                <div className="m-4">
                    <h1>Welcome to <span style={{color:"rgb(0, 128, 0)"}}>Our Site</span></h1>
                    <center>
                        <p className="fs-5 fw-light">Login to Access our Services</p>
                    </center>
                </div>
            </div>
            <form className="col-4 m-4 rounded border bg-light" onSubmit={(e)=>handleSubmit(e)}>
                <div className="p-1 m-2 pt-4">
                <div className="mb-1 row">
                    <label className="col-sm-3 col-form-label fw-bold">Email : </label>
                    <div className="col-md-9">
                    <input type="email" className="form-control" id="Username" placeholder="Enter E-mail..." onChange={(e)=>setLog({...log,email:e.target.value})}/>
                    </div>
                    <p id="text-danger" className="outred fs-6 fw-lighter"></p>
                </div>
                <div className="row">
                    <label className="col-sm-3 col-form-label fw-bold">Password : </label>
                    <div className="col-md-9">
                    <input type="password" className="form-control" id="Password" placeholder="Enter password..." onChange={(e)=>setLog({...log,pass:e.target.value})}/>
                    </div>
                </div>
                <p id="passred" className="outred fs-6 fw-lighter"></p>
                <div className="d-flex justify-content-end"> 
                    <p className="h6 fw-lighter">Don't have an Account?<Link className="text-success link fw-lighter link-underline link-underline-opacity-0" to="/signup"> Sign Up</Link></p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-success col-3 mt-1" type="submit">Login</button>
                </div>
                </div>
            </form>
        </div>
    </div>
    </>);
}