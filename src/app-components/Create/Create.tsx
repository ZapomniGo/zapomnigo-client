import instance from '../../app-utils/axios';
import React from 'react';
export const Create = () =>{
    React.useEffect(()=>{
        instance.get('/health').then((res)=>{
            console.log(res.data);
        })
    },[])
    return (
        <div>
            <h1>Create Section</h1>
        </div>
    )
}