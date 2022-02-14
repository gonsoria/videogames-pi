import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideoGameDetail, setLoader } from '../redux/actions';
import Loader from './Loader';
import ErrorPage from './ErrorPage'
import styles from './styles/Details.module.css'


export default function Details() {
    const loading = useSelector(state => state.loader)
    const error500 = useSelector(state => state.error500)
    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoader())
        dispatch(getVideoGameDetail(id))
    }, [dispatch, id])

    const detail = useSelector(state => state.videoGameDetail)

    return (
        <div >
            {error500 === false ? loading === true ? <Loader /> : (
                <div>
                    <img className={styles.details_bkg} src={detail.img} alt={`${detail.name} imagen`} />
                    <div className={styles.details_container}>
                        <div className={styles.data1}>
                            <div className={styles.data1_text}>
                                <h1>{detail.name}</h1>
                                <h4>★ {detail.rating} </h4>
                            </div>
                            <div className={styles.img_container}>
                                <img src={detail.img} alt={`${detail.name} imagen`} />
                            </div>
                        </div>
                        <div className={styles.data2}>
                            <h4>Genres</h4>
                            <div className={styles.genres}>
                                {detail.genres?.map((ge, index) => <h5 key={index}>{ge}</h5>)}
                            </div>
                            <h4>Platforms</h4>
                            <div className={styles.platforms}>
                                {detail.platform?.map((ge, index) => <h5 key={index}>{ge}</h5>)}
                            </div>
                            <h4>Released</h4>
                            <h5>{detail.released} </h5>
                            <h4>Description</h4>
                            <div className={styles.p}>
                                <p>{detail.description}</p>
                            </div>
                        </div>
                    </div>
                </div>) : <ErrorPage />
            }
        </div>
    );
}