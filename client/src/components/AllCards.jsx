import React from 'react';
import { useSelector } from 'react-redux';
import Card from './Card'

export default function AllCards() {

    const myState = useSelector(state => state.videoGames)

    return (
        <div>
            {myState?.map(vg =>
                <div key={vg.id}>
                    <Card
                        id={vg.id}
                        name={vg.name}
                        img={vg.img}
                        genres={vg.genres}
                    />
                </div>
            )}
        </div>
    );
}
