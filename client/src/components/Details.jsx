import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideoGameDetail } from '../redux/actions';


export default function Details() {

    const { id } = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideoGameDetail(id))
    }, [dispatch, id])

    const detail = useSelector(state => state.videoGameDetail)

    return (
        <div>
            <h1>{detail.name}</h1>
            <img src={detail.img} alt={`${detail.name} imagen`} width='300px' />
            <div>
                {detail.genres?.map((ge, index) => <h4 key={index}>{ge}</h4>)}
            </div>
            <p>{detail.description}</p>
            <h2>{detail.released} </h2>
            <h2>{detail.rating} </h2>
            <div>
                {detail.platform?.map((ge, index) => <h4 key={index}>{ge}</h4>)}
            </div>
        </div>
    );
}