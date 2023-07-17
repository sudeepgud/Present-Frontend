import {Link} from 'react-router-dom';
export default function Home(){
    return(
    <div className='container-fluid'>
        <div className='row'>
            <div className='col card m-4'>
                <div className='card-body p-4'>
                    <img className="card-img-top" style={{borderStyle:"solid",borderWidth:"1px"}} src="00010_test_1+.png" alt="HE-IHC"/>
                    <h4 className='card-title'>H&E to IHC Patch Creation</h4>
                    <span className='ms-4'>Input an H&E patch image, Our Model will generate a Corresponding IHC for it.</span>
                    <div className='d-flex me-4 justify-content-end'>
                        <Link className='col-2 btn btn-danger' to='/hepatch'>Try it</Link>
                    </div>
                </div>
            </div>
            <div className='col card m-4'>
                <div className='card-body p-4'>
                    <img className='card-img-top' style={{borderStyle:"solid",borderWidth:"1px"}} src="00005_test_1+.png" alt="IHC-HE"/>
                    <h4 className='card-title'>IHC to H&E Patch Creation</h4>
                    <span className='ms-4'>Input an IHC patch image, Our Model will generate a Corresponding H&E for it.</span>
                    <div className='d-flex me-4 justify-content-end'>
                        <Link className='col-2 btn btn-danger' to='/ihcpatch'>Try it</Link>
                    </div>
                </div>
            </div>
        </div>
        <div className='row'>
            <div className='col card m-4'>
                <div className='card-body p-4'>
                    <img className='card-img-top' style={{borderStyle:"solid",borderWidth:"1px"}} src="yolo.png" alt="Malaria"/>
                    <h4 className='card-title'>Malaria Yolov5 Detection</h4>
                    <span className='ms-4'>Input an Image containing Blood cells, Our Model will find Parasites present in it.</span>
                    <div className='d-flex me-4 justify-content-end'>
                        <Link className='col-2 btn btn-primary' to='/malaria'>Try it</Link>
                    </div>
                </div>
            </div>
            <div className='col card m-4'>
                <div className='card-body p-4'>
                    <div className='d-flex justify-content-center'>
                    <img className='card-img-top ps-4 pe-4 w-75' style={{borderStyle:"solid",borderWidth:"1px"}} src='CNN.jpg' alt="CNN"/>
                    </div>
                    <h4 className='card-title'>Malaria CNN Classification</h4>
                    <span className='ms-4'>Input an Cell Image, Our Model will classify it into either Uninfected or Parasitized</span>
                    <div className='d-flex me-4 justify-content-end'>
                        <Link className='col-2 btn btn-primary' to='/cnn'>Try it</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}