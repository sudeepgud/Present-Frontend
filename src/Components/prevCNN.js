import {useState,useEffect } from "react";
import axios from 'axios';

export default function CNNPrev(){
    const [images,setImages] = useState(null);
    const [load,setLoading] = useState(false);
    useEffect(()=>{
        async function getImages(){
            setLoading(true);
            const {data} = await axios.post(process.env.REACT_APP_BACKEND_URL+'/downloadlabel')
            setImages(data.images);
            setLoading(false);
        }
        getImages();
    },[])
    return (
        <>
        {
            <>
                {images!=null?<h1 className="fw-light">Previous Prediction Results</h1>:<center>{load?<div className="spinner-border m-3" role="status"><span className="sr-only"></span></div>:<></>}</center>}
                <table className="table table-hover" id="tab">
                    {images!=null?
                        <thead className="bg-dark text-white sticky-top">
                            <tr>
                            <th>Image</th>
                            <th className="text-center">Prediction</th>
                            <th className="text-center">Label</th>
                            </tr>
                        </thead>
                        :
                        <></>
                }
                <tbody>
                    {
                        images!=null?
                        images.map((row)=>
                            <tr key={row._id}>
                                <td><img className="img-thumbnail" src={row.image} alt="input"/></td>
                                <td className="text-center">{row.prediction}</td>
                                <td className="text-center">{row.label?<p className="text-success">Correct</p>:<p className="text-danger">Wrong</p>}</td>
                            </tr>
                        ):null
                    }
                </tbody>
            </table>
            </>
        }
        </>
    );
}