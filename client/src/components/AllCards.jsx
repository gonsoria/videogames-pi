import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card'
import Pagination from './Pagination';
import { getVideoGames } from '../redux/actions'
import styles from './styles/AllCards.module.css'
import Loader from './Loader';
import notfound from '../assets/notfound.png'

export default function AllCards() {
    const myState = useSelector(state => state.videoGames)
    const loading = useSelector(state => state.loader)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideoGames())
    }, [dispatch])


    //Pagination math
    const [currentPage, setCurrentPage] = useState(1);

    const cardsPerPage = 15
    const lastCardIndex = currentPage * cardsPerPage
    const firstCardIndex = lastCardIndex - cardsPerPage

    const currentCards = myState.slice(firstCardIndex, lastCardIndex)

    //change page
    const selectPage = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className={styles.container}>
            <Pagination
                cardsPerPage={cardsPerPage}
                totalCards={myState.length}
                selectPage={selectPage}
                activePage={currentPage}
            />
            <div className={styles.cards_container}>
                {
                    loading === true ? <Loader /> : (
                        currentCards.length < 1 ?
                            <div>
                                <img src={notfound} alt='game not found' height='300px' />
                                <h2 className={styles.notFound}>
                                    NO GAMES FOUND
                                </h2>
                            </div> : currentCards.map(vg =>
                                <div key={vg.id} >
                                    <Card
                                        id={vg.id}
                                        name={vg.name}
                                        img={vg.img}
                                        genres={vg.genres}
                                        rating={vg.rating}
                                    />
                                </div>)
                    )
                }
            </div>
        </div>
    );
}


