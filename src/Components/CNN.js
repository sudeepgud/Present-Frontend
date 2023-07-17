import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function CNN(){
    const Navigate = useNavigate();
    const [file,setFile]=useState(null);
    const [predicting,setOut]=useState(null);
    const [predicted,setPredicted]=useState(null);
    const [prediction,setOutput]=useState(null);
    const [image,setImage]=useState('');
    const [correct,setCorrect]=useState(false);
    const [wrong,setWrong]=useState(false);
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
    const handleCheckBox=(event)=>{
        if(event.target.id==="Yes"){
            setCorrect(event.target.checked);
            setWrong(!event.target.checked);
        }else{
            setCorrect(!event.target.checked);
            setWrong(event.target.checked);
        }
    }
    const uploadLabel = async(event)=>{
        event.preventDefault();
        const sendImage = {
            image: image,
            prediction: prediction,
            label: correct
        }
        const {data} = await axios.post(process.env.REACT_APP_BACKEND_URL+'/uploadlabel',sendImage);
        if(data.status === "ok"){
            Navigate('/cnn');
        }
    }
    const handleFormSubmit=async(event)=>{
        event.preventDefault();
        document.getElementById('filered').innerHTML="";
        setOut(true);
        if(file){
            const formData = new FormData();
            formData.append("image",file);
            const {data} = await axios.post(process.env.REACT_APP_AWS+'/predict',formData);
            if(data){
                setOutput(data.prediction);
                setPredicted(true);
            }else{
                setPredicted(false);
            }
        }
        else{
            document.getElementById('filered').innerHTML="File Could not be Found.";
        }
        setOut(false);
    }
    return (
    <div className="container-fluid log-welcome">
        <form className="row justify-content-center" onSubmit={(e)=>handleFormSubmit(e)}>
        <h1 className="m-4 text-center"><span style={{color:"rgb(255, 0, 128)"}}>Malaria</span> Prediction</h1>
        <div className="col-9 m-4 p-4 rounded bg-light">
            <p className="fw-bold m-2">Input Scan Image : </p>
            <input className="form-control form-control-sm" type="file" onChange={FileChange}/>
            <div className="d-flex justify-content-end">
                <p id="filered" className="outred fs-6 fw-lighter"></p>
            </div>
            <div className="d-flex justify-content-end m-3">
                {
                    predicting?
                    <button className="btn log-button disabled">Predicting<div className='ms-2 spinner-border spinner-border-sm' role='status'><span className='visually-hidden'>Loading...</span></div></button>
                    :
                    <button className="btn btn-primary" type="submit">Predict</button>    
                }
            </div>
            <div className="container-fluid text-center">
                    {
            predicted?
            <>
                <img className="w-25" src={image} alt='preview'/>
                <br></br>
                <h3>
                <span className="fw-bold">Prediction : </span>
                    {prediction === "Uninfected"?
                        <span className="text-success">Uninfected</span>
                        :<span className="text-danger">Parasitized</span>
                    }
                </h3>
                <div className="rounded border border-dark log-welcome">
                    <h3 className="fs-2">&nbsp;Is the Prediction Right?</h3>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="Yes"checked={correct} onChange={handleCheckBox}/>
                        <label className="form-check-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="No" checked={wrong}  onChange={handleCheckBox}/>
                        <label className="form-check-label">No</label>
                    </div>
                    <div className="d-flex m-3 justify-content-center">
                        <button className="btn btn-primary" onClick={(e)=>uploadLabel(e)}>Submit</button>
                    </div>
                </div>
            </>
            :
                <></>
            }</div>
        </div>
        </form>
    </div>
    );
}