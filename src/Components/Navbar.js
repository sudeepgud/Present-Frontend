import { useEffect, useState } from 'react';
import {Link,Outlet} from 'react-router-dom';
export default function Navbar(){
    const [isUser,setUser] = useState(false);
    function LogOut(e){
        localStorage.removeItem('jwt');
        setUser(false);
        window.location.reload(true);
    }
    useEffect(()=>{
        if(localStorage.getItem('jwt')!=null){
            setUser(true);
        }
    },[])
    return(<>
        <nav className='navbar navbar-expand-md bg-success shadow'>
            <div className='navbar-brand ps-4'>
                <Link className='nav-link link-light fs-3' to=''>Projects</Link>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#NavDrop'>
                    <span className='navbar-toggler-icon'></span>    
                </button>    
            </div>
            <div className='collapse navbar-collapse justify-content-end pe-4' id='#NavDrop'>
                {
                    isUser?
                    <ul className='navbar-nav'>
                        <li className='me-4 nav-item'>
                            <Link className='btn btn-dark' to='/prevcnn'>Previous Results</Link>
                        </li>
                        <li className='me-4 nav-item'>
                            <button className='btn btn-dark' onClick={e=>LogOut(e)}>Log Out</button>
                        </li>
                    </ul>
                    :
                    <ul className='navbar-nav'>
                        <li className='me-4 nav-item'>
                            <Link className='btn btn-dark fs-6' to='/login'>Login</Link>
                        </li>
                        <li className='me-4 nav-item'>
                            <Link className='btn btn-dark fs-6' to='/signup'>Sign Up</Link>
                        </li>
                    </ul>
            }
            </div>
        </nav>
        <Outlet/> 
    </>);
}