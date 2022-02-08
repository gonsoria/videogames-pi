import React from 'react';
import { Link } from 'react-router-dom';


export default function Card({ id, name, img, genres }) {
    return (
        <div key={id} >
            <div>
                <h1> {name} </h1>
            </div>
            <Link to={`/videogame/${id}`}>
                <img src={img} alt="imagen" width='300px' />
            </Link>
            <div>
                {genres?.map((ge, index) => <h4 key={index}>{ge}</h4>)}
            </div>
        </div >
    )
}; 
