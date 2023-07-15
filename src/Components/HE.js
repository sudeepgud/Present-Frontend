import React, { useState } from 'react';
import axios from 'axios';

export default function HE(){
    const [file,setFile]=useState(null);
    const [predicting,setOut]=useState(null);
    const [predicted,setPredicted]=useState(null);
    const [image,setImage]=useState('');
    const [original,setOriginal] = useState('');
    const FileChange=(e)=>{
        setOut(false);
        setPredicted(false);
        const reader = new FileReader();
        const selectedFile = e.target.files[0];
        reader.onloadend=()=>{
            setFile(selectedFile);
            setImage(reader.result);
        };
        if(selectedFile){
            reader.readAsDataURL(selectedFile);
        }
    };
    const handleFormSubmit=async(event)=>{
        event.preventDefault();
        document.getElementById('filered').innerHTML="";
        setOut(true);
        if(file){
            const formData = new FormData();
            formData.append("image",file);
            const {data} = await axios.post(process.env.REACT_APP_AWS_API+'/ihc_patch',formData);
            if(data){
                setImage(data.image);
                setOriginal(data.original);
                setOut(false);
                setPredicted(true);
            }
        }
        else{
            document.getElementById('filered').innerHTML="File Could not be Found.";
        }
        setOut(false);
    }
    return (
    <div className="container-fluid ">
        <form className="row justify-content-center" onSubmit={(e)=>handleFormSubmit(e)}>
        <h1 className="m-4 text-center"><span className='text-danger'>IHC</span> Patch Creation</h1>
        <div className="col-9 m-4 p-4 rounded bg-light">
            <p className="fw-bold m-2">Input H&E Patch Image : </p>
            <input className="form-control form-control-sm" type="file" onChange={FileChange}/>
            <div className="d-flex justify-content-end">
                <p id="filered" className="outred fs-6 fw-lighter"></p>
            </div>
            <div className="d-flex justify-content-end m-3">
                {
                    predicting?
                    <button className="btn  disabled">Generating<div className='ms-2 spinner-border spinner-border-sm' role='status'><span className='visually-hidden'>Loading...</span></div></button>
                    :
                    <button className="btn btn-danger" type="submit">Generate</button>    
                }
            </div>
            <div className="container-fluid text-center">
                    {
            predicted?
            <>
                <div className="row">
                    <div className='col-5'>
                        <h5>Original Image :</h5>
                        <img className="w-75" src={"data:image/png;base64,"+original} alt='preview'/>
                    </div>
                    <div className="col-5">
                        <h5>Generated Image :</h5>
                        <img className="w-75" src={"data:image/png;base64,"+image} alt='preview'/>
                    </div>
                    
                </div>
                
                <br></br>
            </>
            :
                <></>
            }</div>
        </div>
        </form>
    </div>
    );
}