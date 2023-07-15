import React, { useState } from 'react';
import axios from 'axios';

function Count(result){
    let trop=0,ring=0,schi=0,game=0;
    result.forEach(element => {
        if(element.class===0){
            trop++;
        }else if(element.class===1){
            ring++;
        }else if(element.class===2){
            schi++;
        }else if(element.class===3){
            game++;
        }
    });
    if(trop===0 && ring===0 && schi===0 && game===0){
        return(<span className='fs-6 fw-light'>No Parasites Found.</span>)
    }
    return (
        <>
        <span style={{color:"rgb(256,0,0)"}}>Trophozoite</span> : {trop} <span style={{color:"rgb(0,0,256)"}}>Ring</span> : {ring} <span style={{color:"rgb(0,256,0)"}}>Schizont</span> : {schi} <span style={{color:"rgb(256,256,0)"}}>Gametocye</span> : {game}
        </>);
}

export default function Yolo(){
    const [file,setFile]=useState(null);
    const [predicting,setOut]=useState(null);
    const [predicted,setPredicted]=useState(null);
    const [result,setResults]=useState(null);
    const [image,setImage]=useState('');
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
            const {data} = await axios.post(process.env.REACT_APP_AWS+'/detect',formData);
            if(data){
                setImage(data.image);
                console.log(data.results);
                setResults(data.results);
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
        <h1 className="m-4 text-center"><span style={{color:"rgb(0,128,256)"}}>Malaria</span> Classification using <span style={{color:"rgb(0,128,256)"}}>Yolov5</span> model</h1>
        <div className="col-9 m-4 p-4 rounded bg-light">
            <p className="fw-bold m-2">Input Image : </p>
            <input className="form-control form-control-sm" type="file" onChange={FileChange}/>
            <div className="d-flex justify-content-end">
                <p id="filered" className="outred fs-6 fw-lighter"></p>
            </div>
            <div className="d-flex justify-content-end m-3">
                {
                    predicting?
                    <button className="btn  disabled">Predicting<div className='ms-2 spinner-border spinner-border-sm' role='status'><span className='visually-hidden'>Loading...</span></div></button>
                    :
                    <button className="btn btn-primary" type="submit">Predict</button>    
                }
            </div>
            <div className="container-fluid text-center">
                    {
            predicted?
            <>
                <img className="w-25" src={"data:image/png;base64,"+image} alt='preview'/>
                <br></br>
                <div className='card w-75 mt-2 container'>
                    <h5 className='card-title fs-3'><span style={{color:"rgb(0,128,256)"}}>Model</span> Output</h5>
                    <div className='card-text'>
                        <div className='grid text-center'>
                            {Count(result)}
                        </div>
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